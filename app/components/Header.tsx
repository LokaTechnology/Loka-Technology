"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="header-edge">
        {/* Brand */}
        <Link href="/" className="brand">
          Loka Technology
        </Link>

        {/* Navigation Links */}
        <div className="topbar-actions">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/product" className="nav-link">Product</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/work" className="nav-link">How It Works</Link>
          <Link href="/use-cases" className="nav-link">Use Cases</Link>
          <Link href="/why-loka" className="nav-link">Why Loka</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <div className="nav-divider"></div>
          <Link href="/login" className="btn btn-outline">Sign in</Link>
          <Link href="/register" className="btn btn-primary">Create account</Link>
          <Link href="/book" className="btn btn-primary">Request a Pilot</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}