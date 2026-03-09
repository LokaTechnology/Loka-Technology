"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, HardHat } from "lucide-react";
import { SiGoogle } from "react-icons/si";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [googleMsg, setGoogleMsg] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const oauthError = urlError === "OAuthSignin" || urlError === "OAuthCallback" || urlError === "OAuthCreateAccount" || urlError === "OAuthAccountNotLinked";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password: pw,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) setErr("Invalid email or password");
    else window.location.href = "/";
  }

  async function signInGoogle() {
    setGoogleMsg("Google sign-in is coming soon — we're still configuring it. Use email & password in the meantime.");
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 520 }}>
        <header style={{ marginBottom: 24, textAlign: "center" }}>
          <h1 style={{ margin: "0 0 8px" }}>Welcome Back</h1>
          <p className="subtle">Sign in to access your partner dashboard, deployment resources, and campus collaboration tools.</p>
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
                placeholder="you@university.edu"
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

          {/* Helpers row */}
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
            <Link href="/forgot-password" style={{ fontSize: 13, color: "#1E7D4B", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>

          {/* OAuth coming-soon banner (URL error or button click) */}
          {(googleMsg || oauthError) && (
            <div
              role="status"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                background: "#fffbea",
                border: "1px solid #FFC606",
                borderRadius: 10,
                padding: "12px 14px",
                fontSize: 14,
                color: "#5a3e00",
                marginTop: 4,
              }}
            >
              <HardHat size={18} style={{ flexShrink: 0, marginTop: 1, color: "#b45309" }} />
              <span>
                {googleMsg ||
                  "Google sign-in is not yet available — we're still configuring it. Please use email & password for now."}
              </span>
            </div>
          )}

          {/* Credentials error */}
          {err && (
            <div className="error" role="alert" style={{ paddingTop: 4 }}>
              {err}
            </div>
          )}

          {/* Submit */}
          <button className="btn btn-primary" disabled={loading} type="submit" style={{ marginTop: 8 }}>
            {loading ? "Signing in…" : (
              <>
                <LogIn size={16} style={{ marginRight: 8 }} />
                Sign in
              </>
            )}
          </button>

          {/* Divider */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 12, 
            margin: "8px 0",
            color: "#8a988f",
            fontSize: 13
          }}>
            <div style={{ flex: 1, height: 1, background: "#d3ddd9" }} />
            <span>or</span>
            <div style={{ flex: 1, height: 1, background: "#d3ddd9" }} />
          </div>

          {/* Google Sign In */}
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
        </form>

        {/* Create Account CTA */}
        <div className="card" style={{ 
          marginTop: 20, 
          padding: 20, 
          background: "#f7f8fa",
          border: "1px solid #e5e7eb",
          textAlign: "center"
        }}>
          <p style={{ margin: "0 0 12px", color: "#2f4f4f", fontSize: 15 }}>
            Don't have an account yet?
          </p>
          <Link href="/register" className="btn btn-green" style={{ width: "100%" }}>
            <UserPlus size={16} style={{ marginRight: 8 }} />
            Create account
          </Link>
          <p className="tiny-note" style={{ marginTop: 12 }}>
            Register to explore pilot deployment opportunities and access partnership resources.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="tiny-note" style={{ marginTop: 16, textAlign: "center" }}>
          This site may be protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </section>
  );
}