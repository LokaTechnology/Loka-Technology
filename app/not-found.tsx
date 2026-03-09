import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
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
          background: "#f0f4ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(47, 79, 79, 0.12)",
        }}
      >
        <Search size={40} color="#2f4f4f" strokeWidth={1.75} />
      </div>

      <div style={{ maxWidth: 480 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#2f4f4f",
            letterSpacing: 2,
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 40px)",
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "var(--fg)",
            margin: "0 0 12px",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 17,
            lineHeight: 1.6,
            margin: "0 0 28px",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or may still be under
          construction.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>

      <p style={{ color: "#aaa", fontSize: 13, marginTop: 16 }}>
        Loka Technology &mdash; Smart Storage Lockers
      </p>
    </div>
  );
}
