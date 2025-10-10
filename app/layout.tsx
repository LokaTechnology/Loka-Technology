import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Loka Technology",
  description: "Smart lockers for safer, happier campuses."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10">
          <nav className="container py-4 flex items-center justify-between">
            <Link href="/" className="font-bold">Loka Tech</Link>
            <div className="flex items-center gap-4">
              <Link href="/solutions">Solutions</Link>
              <Link href="/payment">Payment & Services</Link>
              <Link href="/partner">Partner With Us</Link>
              <Link href="/book" className="btn btn-primary">Book a Locker</Link>
            </div>
          </nav>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="container py-10 border-t border-white/10 mt-16 text-sm opacity-80">
          <div className="flex items-center justify-between">
            <p>© {new Date().getFullYear()} Loka Technology LLC</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LinkedIn">IN</a>
              <a href="#" aria-label="YouTube">YT</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
