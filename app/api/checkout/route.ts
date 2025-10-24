
// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth"; // <- Lucia helper you created earlier

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// Keep server-side as source of truth for pricing
const UNIT_PRICE_PER_HOUR_CENTS: Record<"small"|"medium"|"large", number> = {
  small: 150,   // $1.50/hr
  medium: 250,  // $2.50/hr
  large: 400,   // $4.00/hr
};

// Map (plan,size) -> Stripe Price ID (create these in Stripe Dashboard)
const PRICE_IDS: Record<string, string> = {
  // Monthly
  "monthly:small": process.env.STRIPE_PRICE_MONTHLY_SMALL ?? "",
  "monthly:medium": process.env.STRIPE_PRICE_MONTHLY_MEDIUM ?? "",
  "monthly:large": process.env.STRIPE_PRICE_MONTHLY_LARGE ?? "",
  // Semester
  "semester:small": process.env.STRIPE_PRICE_SEMESTER_SMALL ?? "",
  "semester:medium": process.env.STRIPE_PRICE_SEMESTER_MEDIUM ?? "",
  "semester:large": process.env.STRIPE_PRICE_SEMESTER_LARGE ?? "",
};

function getPriceId(plan: "monthly"|"semester", size: "small"|"medium"|"large") {
  return PRICE_IDS[`${plan}:${size}`];
}

export async function POST(req: Request) {
  try {
    // 🔒 Require authentication
    const { user } = await getSession();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { plan, size, hours, email } = await req.json();

    // Basic validation
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

    // Ensure we have a Stripe customer for this user
    let dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    let stripeCustomerId = dbUser.stripeCustomerId ?? undefined;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: dbUser.email ?? email ?? undefined,
        name: dbUser.name ?? undefined,
        metadata: { app: "Loka", userId: dbUser.id },
      });
      stripeCustomerId = customer.id;
      await prisma.user.update({
        where: { id: dbUser.id },
        data: { stripeCustomerId },
      });
      // refresh local object
      dbUser = { ...dbUser, stripeCustomerId };
    }

    const success_url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/book/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url  = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/book?canceled=1`;

    // Build the appropriate session
    if (plan === "hourly") {
      const cents = UNIT_PRICE_PER_HOUR_CENTS[size] * Number(hours); // uncapped
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: stripeCustomerId,                 // ✅ attach to logged-in user
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Locker (${size}) — Hourly`,
                description: `${hours} hour${Number(hours) === 1 ? "" : "s"}`,
              },
              unit_amount: cents, // total as one line item
            },
            quantity: 1,
          },
        ],
        success_url,
        cancel_url,
        metadata: {
          plan,
          size,
          hours: String(hours),
          userId: dbUser.id,
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // Subscriptions (Monthly, Semester)
    const priceId = getPriceId(plan, size);
    if (!priceId) {
      return NextResponse.json({ error: `Missing Stripe price for ${plan}/${size}` }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,                   // ✅ attach to logged-in user
      line_items: [{ price: priceId, quantity: 1 }],
      success_url,
      cancel_url,
      metadata: { plan, size, userId: dbUser.id },
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}
