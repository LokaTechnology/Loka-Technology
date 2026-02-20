
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

    const hasGoogle = user.accounts.some((a: { provider: string }) => a.provider === "google");

    return (
        <section className="section">
            <div className="container">
                <div className="account-wrap">
                    {/* Header / hero */}
                    <div className="card account-hero">
                        <header className="account-hero-head">
                            <h1>My Account</h1>
                            <form action="/api/auth/signout" method="post">
                                <button className="btn btn-outline">Sign out</button>
                            </form>
                        </header>

                        {/* your small identity block */}
                        <div className="account-identity">
                            <strong>{user.name ?? "—"}</strong>
                            <div className="text-muted">{user.email ?? "—"}</div>
                            {hasGoogle && (
                                <div className="tiny-note">Google: Connected</div>
                            )}
                        </div>
                    </div>

                    {/* Profile form (unchanged JSX) */}
                    <ProfileForm initial={{
                        name: user.name ?? "",
                        email: user.email ?? "",
                        image: user.image ?? "",
                        bio: user.profile?.bio ?? "",
                        location: user.profile?.location ?? "",
                        website: user.profile?.website ?? "",
                        phone: user.profile?.phone ?? "",
                    }} />

                    {/* Payments section (optional) */}
                    {/* <div className="card account-section">…</div> */}
                </div>
            </div>
        </section>
    );
}
