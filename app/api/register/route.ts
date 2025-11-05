// typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe: Stripe | null =
    stripeKey && stripeKey.startsWith("sk_")
        ? new Stripe(stripeKey, { apiVersion: "2024-06-20" })
        : null;

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

        const passwordHash = await hash(password, 10);

        let stripeCustomerId: string | null = null;
        if (stripe) {
            try {
                const customer = await stripe.customers.create({
                    email,
                    name: name || undefined,
                    metadata: { app: "Loka" },
                });
                stripeCustomerId = customer.id;
            } catch (stripeErr: any) {
                console.warn("Stripe customer creation failed - continuing without payment:", stripeErr?.message || stripeErr);
                stripeCustomerId = null;
            }
        }

        const user = await prisma.user.create({
            data: {
                name: name || null,
                email,
                passwordHash,
                stripeCustomerId,
            },
        });

        return NextResponse.json({ ok: true, userId: user.id, stripeCustomerId: stripeCustomerId || null });
    } catch (e: any) {
        console.error("Register error:", e?.message || e);
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
