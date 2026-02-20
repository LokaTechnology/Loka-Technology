// src/app/api/locker/open/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compareSync } from "bcryptjs";
import { z } from "zod";

const bookingClient = (prisma as unknown as {
    booking?: {
        findFirst: (args: unknown) => Promise<any>;
        update: (args: unknown) => Promise<unknown>;
    };
}).booking;

const bodySchema = z.object({
    lockerId: z.string(),
    pin: z.string().length(6),
});

export async function POST(req: NextRequest) {
    try {
        const { lockerId, pin } = bodySchema.parse(await req.json());

        if (!bookingClient) {
            return NextResponse.json({ ok: false, error: "Booking storage is not configured" }, { status: 500 });
        }

        const booking = await bookingClient.findFirst({
            where: { lockerId, pinExpires: { gt: new Date() } },
            orderBy: { createdAt: "desc" },
        });
        if (!booking?.pinHash) return NextResponse.json({ ok: false });

        const ok = compareSync(pin, booking.pinHash);
        if (!ok) return NextResponse.json({ ok: false });

        // single-use: clear hash
        await bookingClient.update({
            where: { id: booking.id },
            data: { pinHash: null, pinExpires: null },
        });

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false });
    }
}