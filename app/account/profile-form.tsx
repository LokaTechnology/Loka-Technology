
"use client";

import { useState } from "react";

type Init = {
    name: string; email: string; image: string;
    bio: string; location: string; website: string; phone?: string;
};

export default function ProfileForm({ initial }: { initial: Init }) {
    const [form, setForm] = useState<Init>(initial);
    const [file, setFile] = useState<File | null>(null);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    const preview = file ? URL.createObjectURL(file) : form.image || "/avatar-placeholder.png";
    const onChange = <K extends keyof Init>(k: K, v: Init[K]) => setForm(s => ({ ...s, [k]: v }));

    async function save(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true); setMsg(null);
        const fd = new FormData();
        for (const [k, v] of Object.entries(form)) if (v != null) fd.set(k, String(v));
        if (file) fd.set("avatar", file);
        const r = await fetch("/api/account/profile", { method: "POST", body: fd });
        const data = await r.json();
        setBusy(false);
        setMsg(r.ok ? "Saved." : (data?.error || "Save failed"));
        if (r.ok) window.location.reload();
    }

    function cancel() {
        setForm(initial); setFile(null); setMsg(null);
    }

    return (
        <form onSubmit={save} className="card form-card profile-card">
            <h2 style={{ marginTop:0 }}>Profile</h2>

            {/* Avatar row */}
            <div className="avatar-row">
                <img src={preview} alt="Avatar" width={64} height={64}
                     style={{ borderRadius:"9999px", border:"1px solid var(--line)" }} />
                <label className="btn btn-outline" style={{ cursor:"pointer" }}>
                    Change photo
                    <input type="file" accept="image/*"
                           onChange={e=>setFile(e.target.files?.[0] ?? null)}
                           style={{ display:"none" }} />
                </label>
            </div>

            {/* Two-column fields on desktop */}
            <div className="fields-grid">
                <label className="block">
                    <div className="label">Name</div>
                    <input className="form-input" value={form.name}
                           onChange={e=>onChange("name", e.target.value)} />
                </label>

                <label className="block">
                    <div className="label">Email</div>
                    <input className="form-input" type="email" value={form.email}
                           onChange={e=>onChange("email", e.target.value)} />
                </label>

                <label className="block">
                    <div className="label">Phone</div>
                    <input className="form-input" value={form.phone ?? ""}
                           onChange={e=>onChange("phone", e.target.value)}
                           placeholder="(optional)" />
                </label>

                <label className="block">
                    <div className="label">Location</div>
                    <input className="form-input" value={form.location}
                           onChange={e=>onChange("location", e.target.value)} />
                </label>

                <label className="block full">
                    <div className="label">Website</div>
                    <input className="form-input" value={form.website}
                           onChange={e=>onChange("website", e.target.value)}
                           placeholder="https://…" />
                </label>

                <label className="block full">
                    <div className="label">Bio</div>
                    <textarea className="form-input" rows={3}
                              value={form.bio}
                              onChange={e=>onChange("bio", e.target.value)} />
                </label>
            </div>

            {msg && <p className={msg === "Saved." ? "" : "error"}>{msg}</p>}

            <div className="action-row">
                <button className="btn btn-primary" type="submit" disabled={busy}>
                    {busy ? "Saving…" : "Save changes"}
                </button>
                <button className="btn btn-outline" type="button" onClick={cancel} disabled={busy}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
