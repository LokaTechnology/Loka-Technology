"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [err, setErr] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setErr("Invalid email or password");
    else window.location.href = "/";
  }

  return (
    <div className="container" style={{ maxWidth: 560, padding: "36px 0" }}>
      <h1>Sign in</h1>
      <form onSubmit={onSubmit} className="card" style={{ display:"grid", gap: 14 }}>
        <label className="block">
          <div className="mb-1">Email</div>
          <input className="form-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@asu.edu" />
        </label>
        <label className="block">
          <div className="mb-1">Password</div>
          <input className="form-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        </label>
        {err && <p className="text-muted" style={{ color:"#b3261e" }}>{err}</p>}
        <button className="btn btn-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  );
}
