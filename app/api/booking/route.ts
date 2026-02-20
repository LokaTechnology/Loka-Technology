
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashSync, compareSync } from "bcryptjs";
import { randomInt } from "crypto";
import { z } from "zod";
import { sendPinEmail } from "@/lib/mail";

const bookingClient = (prisma as unknown as {
    booking?: {
        create: (args: unknown) => Promise<unknown>;
    };
}).booking;

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    lockerId: z.string(),
    starts: z.string().datetime(),
    ends: z.string().datetime(),
});

export async function POST(req: NextRequest) {
    try {
        const json = await req.json();
        const { email, password, lockerId, starts, ends } = bodySchema.parse(json);

        // 1. verify user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash || !compareSync(password, user.passwordHash)) {
            return NextResponse.json({ error: "Invalid login" }, { status: 401 });
        }

        if (!bookingClient) {
            return NextResponse.json({ error: "Booking storage is not configured" }, { status: 500 });
        }

        // 2. create 6-digit PIN
        const pin = randomInt(100_000, 999_999).toString();
        const pinHash = hashSync(pin, 10);
        const pinExpires = new Date(Date.now() + 30 * 60_000); // 30 min

        // 3. store booking
        await bookingClient.create({
            data: {
                userId: user.id,
                lockerId,
                startsAt: new Date(starts),
                endsAt: new Date(ends),
                pinHash,
                pinExpires,
            },
        });

        // 4. e-mail PIN
        await sendPinEmail({ to: email, pin, lockerId });

        return NextResponse.json({ message: "PIN sent" });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}