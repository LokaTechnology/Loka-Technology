"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Menu, X, Instagram, Twitter, Linkedin } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(v => !v);
  const close = useCallback(() => setOpen(false), []);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="site-header">
      <nav className="container header-inner" style={{ padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand */}
        <Link href="/" className="font-bold brand" style={{ textDecoration: "none", color: "#2f4f4f" }}>
          Loka Technology Smart Storage Lockers
        </Link>

        {/* Top-right: primary CTA (optional) + hamburger (always visible) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/book" className="btn btn-primary">Book a Locker</Link>
          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={toggle}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <button
        className={`menu-backdrop ${open ? "show" : ""}`}
        aria-hidden={!open}
        onClick={close}
        tabIndex={-1}
      />

      {/* Slide-down panel */}
      <div id="main-menu" className={`mobile-panel ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="container mobile-panel-inner">
          <nav className="mobile-links" aria-label="Main">
            <Link href="/contact" onClick={close}>Contact Us</Link>
            <Link href="/solutions" onClick={close}>Problem &amp; Solutions</Link>
            <Link href="/payment" onClick={close}>Pricing</Link>
            <Link href="/partner" onClick={close}>Partner With Us</Link>
            <Link href="/" onClick={close}>Support Center</Link>
            <Link href="/book" className="btn btn-primary" onClick={close}>Book a Locker</Link>
          </nav>

          <div className="mobile-divider" />

          <AuthButtonsMobile onDone={close} />

          <div className="mobile-social">
            <Link href="https://instagram.com/YOUR_HANDLE" aria-label="Instagram" className="social-link"><Instagram size={20} /></Link>
            <Link href="https://x.com/YOUR_HANDLE" aria-label="X" className="social-link"><Twitter size={20} /></Link>
            <Link href="https://linkedin.com/company/YOUR_COMPANY" aria-label="LinkedIn" className="social-link"><Linkedin size={20} /></Link>
            <Link href="https://tiktok.com/@YOUR_HANDLE" aria-label="TikTok" className="social-link"><SiTiktok size={20} /></Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* Compact auth block that matches your styles */
function AuthButtonsMobile({ onDone }: { onDone?: () => void }) {
  const { data: session } = useSession();
  const loggedIn = !!session?.user;

  if (!loggedIn) {
    return (
      <div className="mobile-auth">
        <Link href="/login" onClick={onDone}>Sign in</Link>
        <Link href="/register" className="btn btn-primary" onClick={onDone}>Create account</Link>
      </div>
    );
  }

  const name = (session.user?.name || session.user?.email || "").split("@")[0];

  return (
    <div className="mobile-auth">
      <span className="text-muted">Hi, {name}</span>
      <form method="post" action="/api/logout" onSubmit={onDone}>
        <button className="btn btn-outline" type="submit">Sign out</button>
      </form>
    </div>
  );
}
