
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id as string | undefined;
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { currentPassword, newPassword } = await req.json();
    if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ error: "New password must be at least 6 characters." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { passwordHash: true } });
    const hasPassword = !!user?.passwordHash;

    if (hasPassword) {
        if (!currentPassword) return NextResponse.json({ error: "Current password required." }, { status: 400 });
        const ok = await compare(currentPassword, user!.passwordHash!);
        if (!ok) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const passwordHash = await hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });

    return NextResponse.json({ ok: true });
}
