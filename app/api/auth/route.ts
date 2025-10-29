import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  // If you want adapter features later (accounts, email verify, etc.) keep it.
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },   // ✅ simpler, avoids DB Session table issues
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        const email = (creds?.email || "").toString().trim().toLowerCase();
        const pw = (creds?.password || "").toString();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;
        const ok = await compare(pw, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, email: user.email || undefined, name: user.name || undefined };
      }
    })
  ],
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
