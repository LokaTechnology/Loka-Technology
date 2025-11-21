"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        await fetch("/api/auth/forgot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        setSent(true); // always show success
    }

    return (
        <section className="section">
            <div className="container">
                <div className="card form-card">
                    <h1>Forgot password</h1>
                    {sent ? (
                        <p className="text-muted">If an account exists for that email, a reset link is on the way.</p>
                    ) : (
                        <form onSubmit={submit} className="grid gap-3">
                            <label className="label">Email</label>
                            <input className="form-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                            <button className="btn btn-primary" type="submit">Send reset link</button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
