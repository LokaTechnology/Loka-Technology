import Link from "next/link";
import { Shield, Settings, HeadphonesIcon, BarChart3 } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 1100 }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ margin: "0 0 16px" }}>What We Do</h1>
          <p className="text-muted" style={{ fontSize: 18, maxWidth: 700, margin: "0 auto" }}>
            We handle everything—from placement strategy to 24/7 support—so your campus gets secure, 
            convenient lockers without the operational burden.
          </p>
        </header>

        {/* Service Cards Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: 24,
          marginBottom: 48 
        }}>
          
          {/* Service 1: Campus Strategy */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 12, 
              background: "rgba(30, 125, 75, 0.1)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              marginBottom: 16
            }}>
              <Shield size={28} color="#1E7D4B" />
            </div>
            <h3 style={{ margin: "0 0 12px" }}>Campus Strategy & Placement</h3>
            <p className="text-muted" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
              We assess high-traffic areas, safety needs, and accessibility requirements to determine 
              optimal locker locations.
            </p>
            <ul className="feature-list" style={{ fontSize: 14, color: "#555" }}>
              <li>Safety and accessibility review</li>
              <li>Pilot-first deployment approach</li>
            </ul>
          </div>

          {/* Service 2: Managed Operations */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 12, 
              background: "rgba(30, 125, 75, 0.1)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              marginBottom: 16
            }}>
              <Settings size={28} color="#1E7D4B" />
            </div>
            <h3 style={{ margin: "0 0 12px" }}>Fully Managed Operations</h3>
            <p className="text-muted" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
              From vendor coordination to ongoing maintenance, we handle the logistics so your 
              facilities team can focus on other priorities.
            </p>
            <ul className="feature-list" style={{ fontSize: 14, color: "#555" }}>
              <li>Vendor and supplier coordination</li>
              <li>Maintenance oversight</li>
            </ul>
          </div>

          {/* Service 3: Student Support */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 12, 
              background: "rgba(30, 125, 75, 0.1)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              marginBottom: 16
            }}>
              <HeadphonesIcon size={28} color="#1E7D4B" />
            </div>
            <h3 style={{ margin: "0 0 12px" }}>Student Support (24/7)</h3>
            <p className="text-muted" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
              Round-the-clock assistance for access issues, lockouts, and technical problems—
              reducing the burden on campus staff.
            </p>
            <ul className="feature-list" style={{ fontSize: 14, color: "#555" }}>
              <li>Access and lockout support</li>
              <li>After-hours issue handling</li>
              <li>Reduced staff burden</li>
            </ul>
          </div>

          {/* Service 4: Data & Reporting */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 12, 
              background: "rgba(30, 125, 75, 0.1)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              marginBottom: 16
            }}>
              <BarChart3 size={28} color="#1E7D4B" />
            </div>
            <h3 style={{ margin: "0 0 12px" }}>Data & Reporting</h3>
            <p className="text-muted" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
              Actionable insights on usage patterns, peak times, and expansion opportunities 
              through quarterly performance reviews.
            </p>
            <ul className="feature-list" style={{ fontSize: 14, color: "#555" }}>
              <li>Usage analytics</li>
              <li>Quarterly performance reviews</li>
              <li>Expansion and relocation recommendations</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="card" style={{ 
          background: "#f7f8fa", 
          padding: 32, 
          textAlign: "center",
          border: "1px solid #e5e7eb"
        }}>
          <h2 style={{ margin: "0 0 12px" }}>Ready to bring Loka to your campus?</h2>
          <p className="text-muted" style={{ fontSize: 16, marginBottom: 24 }}>
            Start with a pilot program and see how smart lockers improve campus life.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-green" style={{ fontSize: 16, padding: "12px 24px" }}>
              Request a Pilot
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: 16, padding: "12px 24px" }}>
              Talk to Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}