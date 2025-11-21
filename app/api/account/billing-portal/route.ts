
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeKey.startsWith("sk_") ? new Stripe(stripeKey, { apiVersion: "2024-06-20" }) : null;

export async function POST() {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id as string | undefined;
        if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user?.stripeCustomerId) {
            return NextResponse.json({ error: "No Stripe customer on file." }, { status: 400 });
        }

        const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account`;
        const portal = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: returnUrl,
        });

        // Redirect from a route handler
        return NextResponse.redirect(portal.url, { status: 303 });
    } catch (e: any) {
        console.error("[/api/account/billing-portal]", e);
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
