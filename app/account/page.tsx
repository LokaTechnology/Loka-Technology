
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "./profile-form"; // (client component below)
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return (
            <section className="section">
                <div className="container">
                    <div className="card">
                        Please <Link href="/login" className="underlinedText">sign in</Link>.
                    </div>
                </div>
            </section>
        );
    }

    const id = (session.user as any).id as string | undefined;
    const email = session.user.email ?? undefined;

    const user = await prisma.user.findFirst({
        where: id ? { id } : email ? { email } : { id: "__none__" },
        include: { profile: true, accounts: true },
    });

    if (!user) {
        return (
            <section className="section">
                <div className="container">
                    <div className="card">We couldn’t load your account.</div>
                </div>
            </section>
        );
    }

    const hasGoogle = user.accounts.some(a => a.provider === "google");

    return (
        <section className="section">
            <div className="container" style={{ display: "grid", gap: 16 }}>
                <div className="card" style={{ display:"grid", gap:12 }}>
                    <header style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <h1 style={{ margin:0 }}>My Account</h1>
                        <form action="/api/auth/signout" method="post">
                            <button className="btn btn-outline">Sign out</button>
                        </form>
                    </header>

                    <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                        <img
                            src={user.image ?? "/avatar-placeholder.png"}
                            alt="Profile"
                            width={64}
                            height={64}
                            style={{ borderRadius: "9999px", border: "1px solid var(--line)" }}
                        />
                        <div>
                            <strong>{user.name ?? "—"}</strong>
                            <div className="text-muted">{user.email ?? "—"}</div>
                            <div className="text-muted" style={{ fontSize: 13 }}>
                                Google: {hasGoogle ? "Connected" : "Not connected"}
                            </div>
                        </div>
                    </div>
                </div>
                        {/* LEFT — Profile */}
                        <ProfileForm
                            initial={{
                                name: user.name ?? "",
                                email: user.email ?? "",
                                image: user.image ?? "",
                                bio: user.profile?.bio ?? "",
                                location: user.profile?.location ?? "",
                                website: user.profile?.website ?? "",
                                phone: (user.profile as any)?.phone ?? "",
                            }}
                        />
                        {/* RIGHT — Billing + summary */}
                        <aside className="stack-col">
                            <div className="card" style={{ display:"grid", gap:10 }}>
                                <h2 style={{ marginTop:0 }}>Payments</h2>
                                <p className="subtle" style={{ marginTop:-6 }}>
                                    Update cards, view invoices, or cancel subscriptions.
                                </p>
                                <form action="/api/account/billing-portal" method="POST">
                                    <button className="btn btn-primary" type="submit">Manage payment methods</button>
                                </form>
                            </div>
                            
                </aside>
          </div>
 </section>

  );
}
