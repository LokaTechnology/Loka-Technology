"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
    const router = useRouter();
    const token = useSearchParams().get("token") || "";
    const [pw, setPw] = useState("");
    const [pw2, setPw2] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [ok, setOk] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        if (pw.length < 6) return setErr("Password must be at least 6 characters.");
        if (pw !== pw2) return setErr("Passwords do not match.");

        const res = await fetch("/api/auth/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password: pw }),
        });
        const data = await res.json();
        if (!res.ok) return setErr(data?.error || "Reset failed");
        setOk(true);
        setTimeout(() => router.push("/login?reset=1"), 800);
    }

    if (!token) {
        return <div className="section"><div className="container"><div className="card">Invalid link.</div></div></div>;
    }

    return (
        <section className="section">
            <div className="container">
                <div className="card form-card">
                    <h1>Set a new password</h1>
                    {ok ? <p>Password updated. Redirecting to sign in…</p> : (
                        <form onSubmit={submit} className="grid gap-3">
                            <label className="label">New password</label>
                            <input className="form-input" type="password" value={pw} onChange={e=>setPw(e.target.value)} required />
                            <label className="label">Confirm password</label>
                            <input className="form-input" type="password" value={pw2} onChange={e=>setPw2(e.target.value)} required />
                            {err && <p className="error">{err}</p>}
                            <button className="btn btn-primary" type="submit">Update password</button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
