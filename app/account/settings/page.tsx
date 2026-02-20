
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ChangePasswordForm from "./changePassword";
import LinkGoogle from "./linkGoogle";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // don't cache this page

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    // If not signed in, bounce to login with a callback back to settings
    if (!session?.user) {
        redirect(`/login?callbackUrl=${encodeURIComponent("/account/settings")}`);
    }

    const userId = (session.user as any).id as string | undefined;
    const email  = session.user.email ?? undefined;

    // Load by id if present, else fallback to email
    const user = await prisma.user.findFirst({
        where: userId ? { id: userId } : email ? { email } : { id: "__none__" },
        include: { profile: true, accounts: true },
    });

    if (!user) {
        return (
            <section className="section">
                <div className="container">
                    <div className="card">We couldn’t load your account. Try signing out and back in.</div>
                </div>
            </section>
        );
    }

    const hasGoogle = user.accounts.some((a: { provider: string }) => a.provider === "google");
    const hasPassword = !!user.passwordHash;

    return (
        <section className="section">
            <div className="container" style={{ display: "grid", gap: 16 }}>
                {/* Profile */}
                <div className="card form-card">
                    <h2>Profile</h2>
                    <form action="/api/account/profile" method="POST" className="grid gap-3">
                        <label className="label">Name</label>
                        <input className="form-input" name="name" defaultValue={user.name ?? ""} />
                        <button className="btn btn-primary" type="submit">Save</button>
                    </form>
                </div>

                {/* Security */}
                <div className="card form-card">
                    <h2>Security</h2>
                    {/* Make sure ChangePasswordForm accepts the 'hasPassword' prop */}
                    <ChangePasswordForm hasPassword={hasPassword} />
                </div>

                {/* Connections */}
                <div className="card form-card">
                    <h2>Connections</h2>
                    <LinkGoogle isConnected={hasGoogle} />
                </div>
            </div>
        </section>
    );
}
