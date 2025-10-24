"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setLoading(true);
    const r = await fetch("/api/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name, email, password })
    });
    const data = await r.json();
    setLoading(false);
    if (!r.ok) { setErr(data.error || "Failed to register"); return; }
    // auto sign-in
    await signIn("credentials", { email, password, callbackUrl: "/" });
  }

  return (
    <div className="container" style={{ maxWidth: 560, padding: "36px 0" }}>
      <h1>Create your account</h1>
      <form onSubmit={onSubmit} className="card" style={{ display:"grid", gap: 14 }}>
        <label className="block">
          <div className="mb-1">Name</div>
          <input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <div className="mb-1">Email</div>
          <input className="form-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@asu.edu" />
        </label>
        <label className="block">
          <div className="mb-1">Password</div>
          <input className="form-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        </label>
        {err && <p className="text-muted" style={{ color:"#b3261e" }}>{err}</p>}
        <button className="btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
      </form>
    </div>
  );
}
