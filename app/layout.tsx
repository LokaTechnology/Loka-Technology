import React from "react";
import Header from "./components/Header";
import "./globals.css";
import Link from "next/link";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export const metadata = {
  title: "Loka Technology",
  description: "Smart lockers for safer, happier campuses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <Header />
        <main className="container" style={{ padding: "36px 0", flex: 1 }}>{children}</main>
        <footer className="site-footer">
          <div className="container" style={{ padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <p style={{ margin: 0 }}>Copyright © {new Date().getFullYear()} Loka Technology Smart Storage Lockers.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <Link href="https://instagram.com/" aria-label="Instagram" className="social-link"><Instagram size={20} /></Link>
              <Link href="https://x.com/" aria-label="X" className="social-link"><Twitter size={20} /></Link>
              <Link href="https://linkedin.com/" aria-label="LinkedIn" className="social-link"><Linkedin size={20} /></Link>
              <Link href="https://tiktok.com/" aria-label="TikTok" className="social-link"><SiTiktok size={20} /></Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
