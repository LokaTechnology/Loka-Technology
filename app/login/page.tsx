"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { SiGoogle } from "react-icons/si";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password: pw,
      redirect: false,
      // you can pass callbackUrl if you want a specific target
    });

    setLoading(false);
    if (res?.error) setErr("Invalid email or password");
    else window.location.href = "/";
  }

  async function signInGoogle() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 520 }}>
        <header style={{ marginBottom: 16 }}>
          <h1>Sign in</h1>
          <p className="subtle">Welcome back—access your bookings and plans.</p>
        </header>

        <form onSubmit={onSubmit} className="card form-card" style={{ display: "grid", gap: 14 }}>
          {/* Email */}
          <label className="fg">
            <span className="label">Email</span>
            <div className="input-group">
              <Mail className="ig-icon" size={18} />
              <input
                className="form-input ig-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@asu.edu"
                autoComplete="email"
                required
              />
            </div>
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
                onChange={(e) => setPw(e.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="ig-toggle"
                aria-label={showPw ? "Hide password" : "Show password"}
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {/* helpers row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#2f4f4f" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ accentColor: "#2f4f4f" }}
              />
              Remember me
            </label>
            <a className="subtle" href="/reset">Forgot password?</a>
          </div>

          {/* Error */}
          {err && (
            <div className="error" role="alert" style={{ paddingTop: 4 }}>
              {err}
            </div>
          )}

          {/* Submit */}
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? "Signing in…" : <><LogIn size={16} style={{ marginRight: 8 }} /> Sign in</>}
          </button>

          {/* Divider */}
          <div className="divider"><span>or</span></div>

          {/* Social — only works if Google provider is configured */}
          <button
            type="button"
            className="btn btn-outline"
            onClick={signInGoogle}
            disabled={loading}
            aria-label="Sign in with Google"
          >
            <SiGoogle size={18} style={{ marginRight: 8 }} />
            Continue with Google
          </button>

          <p className="tiny-note" style={{ marginTop: 6 }}>
            Don’t have an account? <a href="/register">Create one</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
