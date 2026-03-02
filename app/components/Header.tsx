"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="header-edge">
        <Link href="/" className="brand">
          Loka Technology
        </Link>

        <div className="topbar-actions">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/product" className="nav-link">Product</Link>
          <Link href="/use-cases" className="nav-link">Use Cases</Link>
          <Link href="/pricing" className="nav-link">Pricing/Pilot</Link>
          <Link href="/why-loka" className="nav-link">Why Loka</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <div className="nav-divider"></div>
          <Link href="/login" className="btn btn-outline">Sign in</Link>
          <Link href="/register" className="btn btn-primary">Create account</Link>
          <Link href="/pricing" className="btn btn-primary">Request a Pilot</Link>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="hamburger"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </nav>

      <div
        className={`menu-backdrop ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`mobile-panel ${menuOpen ? "open" : ""}`}>
        <div className="mobile-panel-inner">

          {/* Theme toggle at the top so its dropdown always has room */}
          <div className="mobile-theme-row">
            <span className="mobile-theme-label">Theme</span>
            <ThemeToggle variant="inline" />
          </div>

          <div className="mobile-divider" />

          <div className="mobile-links">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/product" onClick={() => setMenuOpen(false)}>Product</Link>
            <Link href="/use-cases" onClick={() => setMenuOpen(false)}>Use Cases</Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing/Pilot</Link>
            <Link href="/why-loka" onClick={() => setMenuOpen(false)}>Why Loka</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>

          <div className="mobile-divider" />

          <div className="mobile-auth">
            <Link href="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Sign in</Link>
            <Link href="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Create account</Link>
            <Link href="/pricing" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Request a Pilot</Link>
          </div>
        </div>
      </div>
    </header>
  );
}