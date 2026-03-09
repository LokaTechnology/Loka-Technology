import Link from "next/link";
import { HardHat } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

export default function UnderConstruction({
  title = "Coming Soon",
  message = "We're working on something great. Check back soon.",
}: UnderConstructionProps) {
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
          background: "#FFC606",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(255, 198, 6, 0.35)",
        }}
      >
        <HardHat size={40} color="#2f4f4f" strokeWidth={1.75} />
      </div>

      <div style={{ maxWidth: 480 }}>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "var(--fg)",
            margin: "0 0 12px",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 17,
            lineHeight: 1.6,
            margin: "0 0 28px",
          }}
        >
          {message}
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
