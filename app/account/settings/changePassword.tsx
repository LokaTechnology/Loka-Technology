
"use client";
import { useState } from "react";

export default function ChangePasswordForm({ hasPassword }: { hasPassword: boolean }) {
    const [currentPassword, setCur] = useState("");
    const [newPassword, setNew] = useState("");
    const [msg, setMsg] = useState<string | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        const r = await fetch("/api/account/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                currentPassword: hasPassword ? currentPassword : undefined,
                newPassword,
            }),
        });
        const data = await r.json();
        setMsg(r.ok ? "Password updated." : data?.error || "Update failed");
    }

    return (
        <form onSubmit={submit} className="card form-card">
            {hasPassword && (
                <>
                    <label className="label">Current password</label>
                    <input className="form-input" type="password" value={currentPassword}
                           onChange={e=>setCur(e.target.value)} required />
                </>
            )}
            <label className="label">New password</label>
            <input className="form-input" type="password" value={newPassword}
                   onChange={e=>setNew(e.target.value)} required />
            <button className="btn btn-primary" type="submit">Save</button>
            {msg && <p className={msg.includes("updated") ? "" : "error"}>{msg}</p>}
        </form>
    );
}
