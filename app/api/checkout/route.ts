
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" });

const UNIT_PRICE_PER_HOUR_CENTS = { small: 150, medium: 250, large: 400 } as const;

const PRICE_IDS = {
  "monthly:small": process.env.STRIPE_PRICE_MONTHLY_SMALL ?? "",
  "monthly:medium": process.env.STRIPE_PRICE_MONTHLY_MEDIUM ?? "",
  "monthly:large": process.env.STRIPE_PRICE_MONTHLY_LARGE ?? "",
  "semester:small": process.env.STRIPE_PRICE_SEMESTER_SMALL ?? "",
  "semester:medium": process.env.STRIPE_PRICE_SEMESTER_MEDIUM ?? "",
  "semester:large": process.env.STRIPE_PRICE_SEMESTER_LARGE ?? "",
} as const;

function getPriceId(plan: "monthly"|"semester", size: "small"|"medium"|"large") {
  return PRICE_IDS[`${plan}:${size}` as const];
}

export async function POST(req: Request) {
  try {
    //Require auth via NextAuth
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { plan, size, hours, email } = await req.json();

    if (!["hourly","monthly","semester"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    if (!["small","medium","large"].includes(size)) {
      return NextResponse.json({ error: "Invalid size" }, { status: 400 });
    }
    if (plan === "hourly") {
      const h = Number(hours);
      if (!Number.isFinite(h) || h < 1) {
        return NextResponse.json({ error: "Hours must be a positive integer" }, { status: 400 });
      }
    }

    // Attach Stripe customer to the logged-in user
    let user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let stripeCustomerId = user.stripeCustomerId ?? undefined;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? email ?? undefined,
        name: user.name ?? undefined,
        metadata: { app: "Loka", userId: user.id },
      });
      stripeCustomerId = customer.id;
      user = await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId } });
    }

    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const success_url = `${base}/book/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url  = `${base}/book?canceled=1`;

    if (plan === "hourly") {
      const cents = UNIT_PRICE_PER_HOUR_CENTS[size as keyof typeof UNIT_PRICE_PER_HOUR_CENTS] * Number(hours);
      const sessionCheckout = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: stripeCustomerId,
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: `Locker (${size}) — Hourly`, description: `${hours} hour${Number(hours) === 1 ? "" : "s"}` },
            unit_amount: cents,
          },
          quantity: 1,
        }],
        success_url,
        cancel_url,
        metadata: { plan, size, hours: String(hours), userId: user.id },
      });
      return NextResponse.json({ url: sessionCheckout.url });
    }

    const priceId = getPriceId(plan, size);
    if (!priceId) return NextResponse.json({ error: `Missing Stripe price for ${plan}/${size}` }, { status: 500 });

    const sessionCheckout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url,
      cancel_url,
      metadata: { plan, size, userId: user.id },
    });

    return NextResponse.json({ url: sessionCheckout.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}
