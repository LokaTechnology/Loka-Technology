
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import path from "node:path";
import { promises as fs } from "node:fs";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id as string | undefined;
        if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

        const data = await req.formData();
        const name = String(data.get("name") ?? "").trim().slice(0, 140);
        const email = String(data.get("email") ?? "").trim().toLowerCase();
        const bio = String(data.get("bio") ?? "").slice(0, 2000);
        const location = String(data.get("location") ?? "").slice(0, 280);
        const website = String(data.get("website") ?? "").slice(0, 512);
        const phone = String(data.get("phone") ?? "").slice(0, 64) || null;


        const avatar = data.get("avatar") as File | null;

        let imageUrl: string | undefined;
        if (avatar && avatar.size > 0) {
            const buf = Buffer.from(await avatar.arrayBuffer());
            const ext = (avatar.type?.includes("png") ? "png" :
                avatar.type?.includes("webp") ? "webp" : "jpg");
            const rel = `/avatars/${userId}.${ext}`;
            const out = path.join(process.cwd(), "public", rel);
            await fs.mkdir(path.dirname(out), { recursive: true });
            await fs.writeFile(out, buf);
            imageUrl = rel;
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name || null,
                email: email || undefined,         // keep old if blank
                ...(imageUrl ? { image: imageUrl } : {}),
                profile: {
                    upsert: {
                        create: { bio, location, website, ...(phone ? { phone } : {}) },
                        update: { bio, location, website, ...(phone !== undefined ? { phone } : {}) },
                    },
                },
            },
            include: { profile: true },
        });

        return NextResponse.json({ ok: true, image: user.image });
    } catch (e: any) {
        console.error("[/api/account/profile]", e);
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
