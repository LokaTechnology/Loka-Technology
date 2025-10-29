import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// Read the same env IDs you already use in /api/checkout
const PRICE_IDS = {
  monthly: {
    small: process.env.STRIPE_PRICE_MONTHLY_SMALL ?? "",
    medium: process.env.STRIPE_PRICE_MONTHLY_MEDIUM ?? "",
    large: process.env.STRIPE_PRICE_MONTHLY_LARGE ?? "",
  },
  semester: {
    small: process.env.STRIPE_PRICE_SEMESTER_SMALL ?? "",
    medium: process.env.STRIPE_PRICE_SEMESTER_MEDIUM ?? "",
    large: process.env.STRIPE_PRICE_SEMESTER_LARGE ?? "",
  },
} as const;

export async function GET() {
  try {
    // fetch all price objects we have IDs for
    const ids = [
      PRICE_IDS.monthly.small, PRICE_IDS.monthly.medium, PRICE_IDS.monthly.large,
      PRICE_IDS.semester.small, PRICE_IDS.semester.medium, PRICE_IDS.semester.large,
    ].filter(Boolean);

    const results = await Promise.all(ids.map(id => stripe.prices.retrieve(id)));

    // Build a simple plan->size map with cents + currency + interval
    const out: any = { monthly: {}, semester: {} };

    for (const p of results) {
      const cents = p.unit_amount ?? 0;
      const currency = p.currency;
      const interval = (p.recurring?.interval ?? "month") as "month" | "year" | "week" | "day";
      // Find which key this belongs to by matching env
      const matchKey = (obj: Record<string, Record<string, string>>) => {
        for (const plan of Object.keys(obj)) {
          for (const size of Object.keys((obj as any)[plan])) {
            if ((obj as any)[plan][size] === p.id) return { plan, size };
          }
        }
        return null;
      };
      const mk = matchKey(PRICE_IDS as any);
      if (mk) out[mk.plan][mk.size] = { cents, currency, interval, priceId: p.id };
    }

    return NextResponse.json(out, { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    console.error("[/api/prices]", e);
    return NextResponse.json({ error: "Failed to load prices" }, { status: 500 });
  }
}
