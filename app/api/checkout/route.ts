import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const stripeKey = process.env.STRIPE_SECRET_KEY || "";
if (!stripeKey.startsWith("sk_")) {
    console.warn("[/api/checkout] Missing/invalid STRIPE_SECRET_KEY");
}
const stripe = stripeKey.startsWith("sk_")
    ? new Stripe(stripeKey, { apiVersion: "2024-06-20" })
    : null;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// REQUIRED for hourly flow (metered)
const HOURLY_PRICE_ID = process.env.STRIPE_PRICE_HOURLY_METERED || "";

// OPTIONAL (for when you re-enable subscriptions)
const MONTHLY_PRICE_ID  = process.env.STRIPE_PRICE_MONTHLY_PASS  || "";
const SEMESTER_PRICE_ID = process.env.STRIPE_PRICE_SEMESTER_PASS || "";

type Plan = "hourly" | "monthly" | "semester";
type Size = "small" | "medium" | "large";

export async function POST(req: Request) {
    try {
        if (!stripe) {
            return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
        }

        const { plan, size, email } = (await req.json()) as {
            plan: Plan;
            size: Size;
            email?: string;
        };

        if (!["hourly", "monthly", "semester"].includes(plan)) {
            return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }
        if (!["small", "medium", "large"].includes(size)) {
            return NextResponse.json({ error: "Invalid size" }, { status: 400 });
        }

        // Try to attach to an existing signed-in user, but do NOT require auth.
        const session = await getServerSession(authOptions).catch(() => null);

        // Find/create Stripe customer ONLY if we have a signed-in user in DB
        let customerId: string | undefined;
        if (session?.user?.email) {
            let user = await prisma.user.findUnique({ where: { email: session.user.email } });
            if (user) {
                if (!user.stripeCustomerId) {
                    const cust = await stripe.customers.create({
                        email: user.email ?? email ?? undefined,
                        name: user.name ?? undefined,
                        metadata: { app: "Loka", userId: user.id },
                    });
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { stripeCustomerId: cust.id },
                    });
                }
                customerId = user.stripeCustomerId ?? undefined;
            }
        }

        const success_url = `${SITE_URL}/book?success=1`;
        const cancel_url  = `${SITE_URL}/book?canceled=1`;

        // ---------- HOURLY (metered subscription) ----------
        if (plan === "hourly") {
            if (!HOURLY_PRICE_ID) {
                return NextResponse.json(
                    { error: "Missing STRIPE_PRICE_HOURLY_METERED" },
                    { status: 500 }
                );
            }

            const session = await stripe.checkout.sessions.create({
                mode: "subscription",
                allow_promotion_codes: true,
                customer: customerId,              // attach to signed-in user if available
                customer_email: customerId ? undefined : (email || undefined), // else use email
                line_items: [
                    {
                        price: HOURLY_PRICE_ID,       // metered price ($4 per hour)
                        quantity: 1,
                    },
                ],
                subscription_data: {
                    metadata: { plan: "hourly", size },
                },
                success_url,
                cancel_url,
            });

            return NextResponse.json({ url: session.url });
        }

        // ---------- MONTHLY / SEMESTER (recurring) ----------
        const priceId =
            plan === "monthly"  ? MONTHLY_PRICE_ID  :
                plan === "semester" ? SEMESTER_PRICE_ID : "";

        if (!priceId) {
            return NextResponse.json(
                { error: `Missing Stripe price ID for ${plan}` },
                { status: 500 }
            );
        }

        const session2 = await stripe.checkout.sessions.create({
            mode: "subscription",
            allow_promotion_codes: true,
            customer: customerId,
            customer_email: customerId ? undefined : (email || undefined),
            line_items: [{ price: priceId, quantity: 1 }],
            subscription_data: {
                metadata: { plan, size },
            },
            success_url,
            cancel_url,
        });

        return NextResponse.json({ url: session2.url });
    } catch (err: any) {
        console.error("[/api/checkout] error:", err?.message || err);
        return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
    }
}
