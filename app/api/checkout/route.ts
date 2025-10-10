import { NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe";

export async function POST(req: Request) {
  try {
    const { size, hours, email } = await req.json();
    const priceMap: Record<string, string> = {
      small: process.env.STRIPE_PRICE_SMALL || "price_small_placeholder",
      medium: process.env.STRIPE_PRICE_MEDIUM || "price_medium_placeholder",
      large: process.env.STRIPE_PRICE_LARGE || "price_large_placeholder",
    };
    const price = priceMap[size] || priceMap.small;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: Math.max(1, Number(hours) || 1) }],
      customer_email: email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book?status=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book?status=cancel`,
      metadata: { size, hours: String(hours) }
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Failed to create session" }, { status: 500 });
  }
}
