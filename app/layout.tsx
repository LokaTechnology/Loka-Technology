import "./globals.css";
import Link from "next/link";
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />


export const metadata = {
  title: "Loka Technology",
  description: "Smart lockers for safer, happier campuses."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <nav className="container" style={{padding:"14px 0", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <Link href="/" className="font-bold" style={{textDecoration:"none", color:"#111"}}>Loka Technology Smart Storage Lockers</Link>
            <div style={{display:"flex", alignItems:"center", gap:"18px"}}>
              <Link href ="/">Contact Us</Link>
              <Link href="/solutions">Problem & Solutions</Link>
              <Link href="/payment">Payment & Services</Link>
              <Link href="/partner">Partner With Us</Link>
              <Link href="/book" className="btn btn-primary">Book a Locker</Link>
            </div>
          </nav>
        </header>
        <main className="container" style={{padding:"36px 0"}}>{children}</main>
        <footer className="site-footer">
          <div className="container" style={{padding:"24px 0", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <p>© {new Date().getFullYear()} Loka Technology LLC</p>
            <div style={{display:"flex", gap:14}}>
                <a href="https://instagram.com/lokatechnologyllc" target="_blank">Instagram</a>
                <a href="https://linkedin.com/company/" target="_blank">LinkedIn</a>
                <a href="https://tiktok.com/@lokatechnologyllc" target="_blank">TikTok</a>
                <a href="https://youtube.com/@YOUR_HANDLE" target="_blank">YouTube</a>
                <a href="https://x.com/lokatechnology?s=21" target="_blank">X</a>
            </div>
          </div>
        </footer>
      </body> 
    </html>
  );
}
