// components/AuthButtons.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthButtons({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/session")
      .then(r => r.json())
      .then(d => {
        if (!mounted) return;
        setLoggedIn(!!d.loggedIn);
        setName(d.user?.name || d.user?.email || null);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return null;

  if (!loggedIn) {
    return (
      <div className={className} style={{ display:"flex", alignItems:"center", gap: "12px" }}>
        <Link href="/login">Sign in</Link>
        <Link href="/register" className="btn btn-primary">Create account</Link>
      </div>
    );
  }

  return (
    <div className={className} style={{ display:"flex", alignItems:"center", gap: "12px" }}>
      <span className="text-muted">Hi, {(name || "").split("@")[0]}</span>
      <form method="post" action="/api/logout">
        <button className="btn btn-outline" type="submit">Sign out</button>
      </form>
    </div>
  );
}
