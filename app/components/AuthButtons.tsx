"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type SessionResp =
  | { loggedIn: false }
  | { loggedIn: true; user: { id?: string; email?: string; name?: string } };

export default function AuthButtonsSoft({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "in" | "out">("idle");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    let abort = false;

    // Try our light /api/session first (your code already has it).
    // If it fails or returns HTML, we ignore and show "Sign in".
    (async () => {
      try {
        const r = await fetch("/api/session", { credentials: "include" });
        const ct = r.headers.get("content-type") || "";
        if (!ct.includes("application/json")) throw new Error("not-json");
        const data = (await r.json()) as SessionResp;
        if (abort) return;
        if (data && "loggedIn" in data && data.loggedIn) {
          setState("in");
          const n = data.user?.name || data.user?.email || "";
          setName(n.split("@")[0] || "");
        } else {
          setState("out");
        }
      } catch {
        // Don’t break the page—just show logged out UI
        if (!abort) setState("out");
      }
    })();

    return () => { abort = true; };
  }, []);

  if (state === "idle") {
    // Render nothing while checking (prevents layout shift)
    return <div className={className} style={{ minWidth: 160 }} />;
  }

  // Signed in (non-blocking sign out uses a simple POST you can wire later)
  return (
    <div className={className} style={{ display:"flex", alignItems:"center", gap: 12 }}>
      <span className="text-muted">Hi, {name}</span>
      <form method="post" action="/api/logout">
        <button className="btn btn-outline" type="submit">Sign out</button>
      </form>
    </div>
  );
}
