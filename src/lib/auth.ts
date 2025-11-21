
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Keep adapter so OAuth (Google) creates Account rows, but use JWT sessions.
    adapter: undefined, // <- OPTIONAL: If you are not using email magic or need DB-stored sessions.
    session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },

    providers: [
        Credentials({
            name: "Credentials",
            credentials: { email: {}, password: { type: "password" } },
            async authorize(creds) {
                const email = (creds?.email || "").toString().trim().toLowerCase();
                const pw = (creds?.password || "").toString();

                const user = await prisma.user.findUnique({ where: { email } });
                if (!user?.passwordHash) return null;

                const ok = await compare(pw, user.passwordHash);
                if (!ok) return null;

                return { id: user.id, email: user.email ?? undefined, name: user.name ?? undefined, image: user.image ?? undefined };
            },
        }),

        // For dev convenience, auto-link by email. Remove this option in prod.
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            ...(process.env.NODE_ENV !== "production"
                ? { allowDangerousEmailAccountLinking: true }
                : {}),
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) token.id = (user as any).id;
            // Ensure id is present on reloads
            if (!token.id && token.email) {
                const dbUser = await prisma.user.findUnique({ where: { email: token.email } });
                if (dbUser) token.id = dbUser.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token?.id) (session.user as any).id = token.id as string;
            return session;
        },
    },

    pages: { signIn: "/login" },
};
