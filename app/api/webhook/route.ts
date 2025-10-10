import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") || "";
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const raw = await req.text();
  try {
    const event = stripe.webhooks.constructEvent(raw, sig, endpointSecret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      console.log("Checkout completed:", session.id, session.metadata);
      // TODO: persist to Supabase here
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}
