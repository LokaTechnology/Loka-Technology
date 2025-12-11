import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes, createHash } from "crypto";
import { sendPasswordReset } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const { email } = await req.json().catch(() => ({} as any));
    if (!email) return NextResponse.json({ ok: true }); // do not leak existence

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    // Always respond ok to prevent user enumeration
    if (!user?.id) return NextResponse.json({ ok: true });

    // Invalidate existing tokens for this user (optional)
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    // Create token (store only hash)
    const tokenRaw = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(tokenRaw).digest("hex");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 min

    await prisma.passwordResetToken.create({
        data: { userId: user.id, tokenHash, expiresAt },
    });

    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const resetUrl = `${base}/reset-password?token=${tokenRaw}`;
    await sendPasswordReset(email, resetUrl).catch((e) => {
        console.error("send mail failed:", e);
    });

    return NextResponse.json({ ok: true });
}
