import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id as string | undefined;
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    await prisma.account.deleteMany({ where: { userId, provider: "google" } });
    return NextResponse.json({ ok: true });
}
