// src/app/api/locker/open/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compareSync } from "bcryptjs";
import { z } from "zod";

const bodySchema = z.object({
    lockerId: z.string(),
    pin: z.string().length(6),
});

export async function POST(req: NextRequest) {
    try {
        const { lockerId, pin } = bodySchema.parse(await req.json());

        const booking = await prisma.booking.findFirst({
            where: { lockerId, pinExpires: { gt: new Date() } },
            orderBy: { createdAt: "desc" },
        });
        if (!booking?.pinHash) return NextResponse.json({ ok: false });

        const ok = compareSync(pin, booking.pinHash);
        if (!ok) return NextResponse.json({ ok: false });

        // single-use: clear hash
        await prisma.booking.update({
            where: { id: booking.id },
            data: { pinHash: null, pinExpires: null },
        });

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false });
    }
}