
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";

const authOptions: NextAuthOptions = {
    // Use the adapter if you have Account/Session/VerificationToken tables (NextAuth schema)
    adapter: PrismaAdapter(prisma) as any,

    session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 }, // 30 days

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(creds) {
                const email = (creds?.email || "").toString().trim().toLowerCase();
                const pw = (creds?.password || "").toString();

                // 🔑 Authorize against your User table (passwordHash)
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user?.passwordHash) return null;

                const ok = await compare(pw, user.passwordHash);
                if (!ok) return null;

                return { id: user.id, email: user.email ?? undefined, name: user.name ?? undefined, image: user.image ?? undefined };
            },
        }),

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            ...(process.env.NODE_ENV !== "production"
                ? { allowDangerousEmailAccountLinking: true }
                : {}),
        }),
    ],

    pages: { signIn: "/login" },
    callbacks: {
        // Put DB id on the JWT at sign-in
        async jwt({ token, user }) {
            if (user?.id) token.id = (user as any).id;
            return token;
        },
        // Copy id from token onto session so `session.user.id` exists
        async session({ session, token }) {
            if (session.user && token?.id) {
                (session.user as any).id = token.id as string;
            }
            return session;
        },
    },
};


export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
