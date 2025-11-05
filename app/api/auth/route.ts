import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
    jwt: { maxAge: 60 * 60 * 24 * 30 },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
            async authorize(creds) {
                const email = (creds?.email || "").toString().trim().toLowerCase();
                const pw = (creds?.password || "").toString();

                // Lucia-style: key id is usually "email:<email>"
                const keyId = `email:${email}`;
                const key = await prisma.key.findUnique({ where: { id: keyId }, include: { user: true } });
                if (!key?.hashedPassword || !key.user) return null;

                const ok = await compare(pw, key.hashedPassword);
                if (!ok) return null;

                return { id: key.user.id, email: key.user.email ?? undefined, name: key.user.name ?? undefined };
            }
        })
    ],
    pages: { signIn: "/login" }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
