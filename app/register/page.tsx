"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch("/api/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ name, email, password: pw })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed to register");
      // auto-redirect to login (or auto sign-in if you prefer)
      window.location.href = "/login";
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const pwOk = pw.length >= 6;

  return (
    <section className="section">
      <div className="container auth-wrap">
        {/* Heading */}
        <header className="auth-head">
          <span className="kicker">Welcome to Loka</span>
          <h1>Create your account</h1>
          <p className="subtle" style={{ marginTop: 4 }}>
            A single sign-in for booking lockers and managing your plans.
          </p>
        </header>

        <div className="grid-2">
          {/* Form */}
          <form onSubmit={onSubmit} className="card form-card">
            {/* Name */}
            <label className="fg">
              <span className="label">Name</span>
              <div className="input-group">
                <User className="ig-icon" size={18} />
                <input
                  className="form-input ig-control"
                  value={name}
                  onChange={e=>setName(e.target.value)}
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
              </div>
            </label>

            {/* Email */}
            <label className="fg">
              <span className="label">Email</span>
              <div className="input-group">
                <Mail className="ig-icon" size={18} />
                <input
                  className="form-input ig-control"
                  type="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  placeholder="you@asu.edu"
                  autoComplete="email"
                  required
                />
              </div>
              <p className="hint">We’ll send your receipt and booking confirmations here.</p>
            </label>

            {/* Password */}
            <label className="fg">
              <span className="label">Password</span>
              <div className="input-group">
                <Lock className="ig-icon" size={18} />
                <input
                  className="form-input ig-control"
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={e=>setPw(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="ig-toggle"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  onClick={()=>setShowPw(v=>!v)}
                >
                  {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>

              {/* simple strength hint */}
              <div className="pw-meter" aria-hidden>
                <div className={`pw-bar ${pw.length>=1 ? "on" : ""}`} />
                <div className={`pw-bar ${pw.length>=4 ? "on" : ""}`} />
                <div className={`pw-bar ${pwOk ? "on" : ""}`} />
              </div>
              <p className="hint">{pwOk ? "Looks good." : "Use at least 6 characters."}</p>
            </label>

            {err && <p className="error" role="alert">{err}</p>}

            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </button>

            <p className="tiny-note">
              By creating an account, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
            </p>
          </form>

          {/* Side card (benefits) */}
          <aside className="card benefits-card">
            <h3 style={{ marginTop: 0 }}>Why join?</h3>
            <ul className="feature-list">
              <li>Fast checkout and receipts</li>
              <li>Manage monthly/semester plans</li>
              <li>View past hourly bookings</li>
              <li>Priority support</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
