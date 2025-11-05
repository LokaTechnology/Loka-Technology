// app/components/Header.tsx
"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="site-header">
      <nav className="header-edge">
        <Link href="/" className="font-bold brand" style={{ textDecoration: "none", color: "#2f4f4f" }}>
          Loka Technology Smart Storage Lockers
        </Link>

        {/* RIGHT: only Book + Hamburger */}
        <div className="topbar-actions">
          <Link href="/book" className="btn btn-primary">Book a Locker</Link>
          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={() => setOpen(v => !v)}
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

      {/* Slide-down menu */}
      <div id="main-menu" className={`mobile-panel ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="container mobile-panel-inner">
          <nav className="mobile-links" aria-label="Main">
            <Link href="/solutions" onClick={close}>Solutions</Link>
            <Link href="/payment" onClick={close}>Pricing</Link>
            <Link href="/partner" onClick={close}>Partner With Us</Link>
            <Link href="/support" onClick={close}>Support Center</Link>
            <Link href="/contact" onClick={close}>Contact Us</Link>
            <Link href="/book" className="btn btn-primary" onClick={close}>Book a Locker</Link>

            <div className="mobile-divider" />
            <ThemeToggle />

            {/* Auth ONLY inside the menu */}
            <div className="drawer-auth">
                <Link href="/login" className="btn btn-green-outline" onClick={close}>
              Sign in
            </Link>
          <Link href="/register" className="btn btn-green" onClick={close}>
              Create account
            </Link>
          </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
