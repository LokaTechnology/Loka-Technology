import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";
import { hash } from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const { token, password } = await req.json().catch(() => ({} as any));
    if (!token || !password) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

    if (!record || record.usedAt || record.expiresAt < new Date()) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const newHash = await hash(password, 12);
    await prisma.$transaction([
        prisma.user.update({ where: { id: record.userId }, data: { passwordHash: newHash } }),
        prisma.passwordResetToken.update({ where: { tokenHash }, data: { usedAt: new Date() } }),
    ]);

    return NextResponse.json({ ok: true });
}
