import Link from "next/link";
import { ClipboardCheck, TestTube2, Database, Calendar, TrendingUp } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: ClipboardCheck,
    title: "Campus & Business Assessment",
    description: "We evaluate your campus needs, traffic patterns, and security requirements."
  },
  {
    number: 2,
    icon: TestTube2,
    title: "Pilot Deployment",
    description: "Start small with a pilot installation in one high-traffic location to test fit and usage."
  },
  {
    number: 3,
    icon: Database,
    title: "Data Collection",
    description: "Track usage patterns, peak times, and student feedback during the pilot phase."
  },
  {
    number: 4,
    icon: Calendar,
    title: "Quarterly Review",
    description: "Analyze performance metrics and identify opportunities for optimization or expansion."
  },
  {
    number: 5,
    icon: TrendingUp,
    title: "Scale or Optimize",
    description: "Use AI-driven insights to expand to new locations or refine existing operations."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 1000 }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 56 }}>
          <h1 style={{ margin: "0 0 16px" }}>How It Works</h1>
          <p className="text-muted" style={{ fontSize: 18, maxWidth: 650, margin: "0 auto" }}>
            From initial assessment to campus-wide deployment, we make the process simple and data-driven.
          </p>
        </header>

        {/* Steps Timeline */}
        <div style={{ position: "relative", marginBottom: 48 }}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.number} style={{ position: "relative", marginBottom: isLast ? 0 : 40 }}>
                {/* Connecting line */}
                {!isLast && (
                  <div style={{
                    position: "absolute",
                    left: 40,
                    top: 80,
                    width: 2,
                    height: 60,
                    background: "#d3ddd9",
                    zIndex: 1
                  }} />
                )}

                {/* Step Card */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "80px 1fr",
                  gap: 20,
                  alignItems: "start"
                }}>
                  {/* Icon Circle */}
                  <div style={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: "50%", 
                    background: "#1E7D4B",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    position: "relative",
                    zIndex: 2,
                    boxShadow: "0 4px 12px rgba(30, 125, 75, 0.2)"
                  }}>
                    <Icon size={32} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ 
                      fontSize: 13, 
                      fontWeight: 700, 
                      color: "#1E7D4B", 
                      marginBottom: 4,
                      letterSpacing: "0.5px"
                    }}>
                      STEP {step.number}
                    </div>
                    <h3 style={{ margin: "0 0 8px", fontSize: 20 }}>
                      {step.title}
                    </h3>
                    <p className="text-muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="card" style={{ 
          background: "#f7f8fa", 
          padding: 32, 
          textAlign: "center",
          border: "1px solid #e5e7eb"
        }}>
          <h2 style={{ margin: "0 0 12px" }}>Let's start with a pilot</h2>
          <p className="text-muted" style={{ fontSize: 16, marginBottom: 24 }}>
            See how Loka works on your campus before committing to a full deployment.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/pricing/pilot" className="btn btn-green" style={{ fontSize: 16, padding: "12px 24px" }}>
              Request a Pilot
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: 16, padding: "12px 24px" }}>
              Ask Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}