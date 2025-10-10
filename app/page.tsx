// app/page.tsx — Loka Tech Home Page (Next.js App Router + Tailwind)
// Drop this file into your Next.js project at /app/page.tsx
// Replace SOCIAL_URL_* values with your real links.

import Link from "next/link";

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/yourhandle", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm11 1.8a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
    )},
  { name: "LinkedIn", href: "https://linkedin.com/company/yourcompany", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.9-2.2 3.9-2.2 4.2 0 5 2.7 5 6.2V24h-4v-7.1c0-1.7 0-3.8-2.3-3.8-2.3 0-2.6 1.8-2.6 3.7V24h-4V8z"/></svg>
    )},
  { name: "TikTok", href: "https://tiktok.com/@yourhandle", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21 8.4a7.8 7.8 0 01-4.7-1.6v7.2c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7c.4 0 .9 0 1.3.1v3.6c-.4-.1-.9-.2-1.3-.2a3.5 3.5 0 00-3.5 3.5c0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5V1h3.6c.6 2.9 3 5.1 5.9 5.4v2z"/></svg>
    )},
  { name: "YouTube", href: "https://youtube.com/@yourhandle", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/></svg>
    )},
  { name: "X", href: "https://x.com/yourhandle", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.2 2H22l-8.8 10.1L22.5 22h-7l-5.5-6.5L3.8 22H1l9.3-10.7L1 2h7.2l5 6 5-6z"/></svg>
    )},
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Live on campus — pilot ready
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Make campus life lighter.</h1>
          <p className="text-white/80 text-lg max-w-xl">
            Smart, secure lockers with instant code or campus‑ID tap. Clear pricing, flexible plans, and real analytics for administrators.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book" className="btn btn-primary">Book a Locker</Link>
            <Link href="/partner" className="btn btn-outline">Partner With Us</Link>
          </div>
          {/* Social row */}
          <div className="flex items-center gap-4 pt-2">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="group inline-flex items-center gap-2 text-white/80 hover:text-white">
                <span className="p-2 rounded-xl border border-white/10 group-hover:border-white/30">{s.icon}</span>
                <span className="hidden sm:inline text-sm">{s.name}</span>
              </a>
            ))}
          </div>
        </div>
        {/* Right card */}
        <div className="card bg-white/5">
          <h3 className="mb-3">How it works</h3>
          <ol className="list-decimal list-inside space-y-2 text-white/80">
            <li>Reserve a locker online or at the kiosk</li>
            <li>Get a one-time code or tap your campus ID/phone</li>
            <li>Store, extend, and go — receipt sent instantly</li>
          </ol>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-2xl font-semibold">24/7</p>
              <p className="text-xs text-white/70">Monitored access</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-2xl font-semibold"><span className="align-top text-base">$</span> Cap</p>
              <p className="text-xs text-white/70">Daily pricing cap</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-2xl font-semibold">ADA</p>
              <p className="text-xs text-white/70">Accessible bays</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3>Why Universities Care</h3>
          <ul className="list-disc list-inside text-white/80 mt-2 space-y-1">
            <li>Safer halls, fewer theft reports</li>
            <li>Usage analytics, peak hours, uptime</li>
            <li>Turn‑key install, training, support</li>
          </ul>
        </div>
        <div className="card">
          <h3>Why Students Care</h3>
          <ul className="list-disc list-inside text-white/80 mt-2 space-y-1">
            <li>Fast code/ID access — no keys</li>
            <li>Affordable daily & semester plans</li>
            <li>Receipts & reminders built‑in</li>
          </ul>
        </div>
        <div className="card">
          <h3>Payment & Services</h3>
          <p className="text-white/80 mt-2">Simple pricing, Apple/Google Pay, flexible billing for campuses.</p>
          <Link href="/payment" className="underline mt-3 inline-block">See pricing & services →</Link>
        </div>
      </section>

      {/* DATA / PROOF */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2>Data / Proof</h2>
          <Link href="/partner" className="underline">Request a Campus Pilot →</Link>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-4xl font-semibold">87%</p>
            <p className="text-white/70">don’t feel safe leaving belongings unattended*</p>
          </div>
          <div className="card">
            <p className="text-4xl font-semibold">88%</p>
            <p className="text-white/70">would use a smart locker weekly*</p>
          </div>
          <div className="card">
            <p className="text-4xl font-semibold">92%</p>
            <p className="text-white/70">report less anxiety after install*</p>
          </div>
          <div className="card">
            <p className="text-sm text-white/70">*Mock figures — swap with pilot stats once available.</p>
            <Link href="/solutions" className="underline">See more →</Link>
          </div>
        </div>
      </section>

      {/* REVIEWS (static mock) */}
      <section className="space-y-4">
        <h2>What people say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Backpack‑free days at last", "Perfect between classes", "Visible deterrence"].map((title, i) => (
            <div className="card" key={i}>
              <p className="text-amber-300">★★★★★</p>
              <h3 className="mt-1">{title}</h3>
              <p className="text-white/80 mt-2">Booked in under a minute, code arrived instantly. I stash my laptop before intramurals and grab it after — zero hassle.</p>
              <p className="text-xs text-white/60 mt-3">Student • ASU Tempe</p>
            </div>
          ))}
        </div>
        <div className="text-sm text-white/60">Looking for more? <Link href="/solutions" className="underline">See the case for smart lockers</Link>.</div>
      </section>

      {/* PARTNER STRIP */}
      <section className="rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5">
        <div>
          <h3 className="text-2xl">Bring smart, secure storage to your campus</h3>
          <p className="text-white/80">Flexible models: revenue share • subscription • purchase + support • 60–90 day pilot</p>
        </div>
        <div className="flex gap-3">
          <Link href="/partner" className="btn btn-primary">Partner With Us</Link>
          <Link href="/partner#contact" className="btn btn-outline">Request a Quote</Link>
        </div>
      </section>
    </div>
  );
}
