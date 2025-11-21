import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeKey.startsWith("sk_")
    ? new Stripe(stripeKey, { apiVersion: "2024-06-20" })
    : null;

/**
 * We expose ONE price per plan (no sizes). To keep client compatibility,
 * we still return a shape like { monthly: { small:{} ... }, semester: { ... } }
 * but all sizes have the same price.
 */
const FALLBACK = {
    monthly:  4000,  // $40.00
    semester: 12000, // $120.00
};

const SIZES = ["small", "medium", "large"] as const;

export async function GET() {
    try {
        let monthly = FALLBACK.monthly;
        let semester = FALLBACK.semester;

        // Optional recurring price IDs for subscriptions you’ll enable later:
        // STRIPE_PRICE_MONTHLY_PASS and STRIPE_PRICE_SEMESTER_PASS
        const monthlyId  = process.env.STRIPE_PRICE_MONTHLY_PASS  || "";
        const semesterId = process.env.STRIPE_PRICE_SEMESTER_PASS || "";

        if (stripe && monthlyId) {
            const p = await stripe.prices.retrieve(monthlyId);
            if (p?.unit_amount) monthly = p.unit_amount;
        }
        if (stripe && semesterId) {
            const p = await stripe.prices.retrieve(semesterId);
            if (p?.unit_amount) semester = p.unit_amount;
        }

        const out: any = { monthly: {}, semester: {} };
        for (const s of SIZES) {
            out.monthly[s]  = { cents: monthly,  currency: "usd", interval: "month" };
            out.semester[s] = { cents: semester, currency: "usd", interval: "month" };
        }

        // Hourly is metered; client doesn’t need the unit amount here.
        // (UI shows $4/hr explicitly.)
        return NextResponse.json(out, { headers: { "Cache-Control": "no-store" } });
    } catch (e: any) {
        console.error("[/api/prices]", e);
        return NextResponse.json({ error: "Failed to load prices" }, { status: 500 });
    }
}
