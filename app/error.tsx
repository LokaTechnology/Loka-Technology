"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // You can log to an error reporting service here
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
        minHeight: "60vh",
        gap: 24,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#fff3cd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(255, 198, 6, 0.25)",
        }}
      >
        <AlertTriangle size={40} color="#b45309" strokeWidth={1.75} />
      </div>

      <div style={{ maxWidth: 480 }}>
        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 40px)",
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "var(--fg)",
            margin: "0 0 12px",
          }}
        >
          This page is under construction
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 17,
            lineHeight: 1.6,
            margin: "0 0 28px",
          }}
        >
          We&apos;re still building this section. It will be available soon.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={reset} className="btn btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>

      <p style={{ color: "#aaa", fontSize: 13, marginTop: 16 }}>
        Loka Technology &mdash; Smart Storage Lockers
      </p>
    </div>
  );
}
