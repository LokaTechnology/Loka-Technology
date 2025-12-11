
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "24/7 Access & Reliability | Loka Technology",
    description:
        "Engineered for high availability, redundancy, performance, and security—so your locker services stay up around the clock.",
};

export default function AlwaysOnPage() {
    return (
        <section className="section">
            <div className="container" style={{ display: "grid", gap: 16 }}>
                {/* Hero */}
                <header className="card" style={{ display: "grid", gap: 8 }}>
                    <h1 style={{ margin: 0 }}>24/7 Access & Reliability</h1>
                    <p className="text-muted" style={{ margin: 0 }}>
                        Built like our lockers—available when you are. Below is how we design for uptime,
                        performance, and safety so services stay online day and night.
                    </p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <Link href="/book" className="btn btn-primary">Book a Locker</Link>
                        <Link href="/support" className="btn btn-outline">Support Center</Link>
                    </div>
                </header>

                {/* Pillars */}
                <div className="account-grid">
                    <div className="card" style={{ display: "grid", gap: 12 }}>
                        <h3 style={{ margin: 0 }}>Infrastructure & Hosting</h3>
                        <ul className="feature-list">
                            <li><strong>Reliable hosting</strong> with 99.9%+ uptime targets</li>
                            <li><strong>Auto-scaling</strong> to handle peak traffic without slowdowns</li>
                            <li><strong>Redundancy & load balancing</strong>—no single point of failure</li>
                            <li><strong>Multi-region option</strong> for resilience against regional outages</li>
                        </ul>
                    </div>

                    <div className="card" style={{ display: "grid", gap: 12 }}>
                        <h3 style={{ margin: 0 }}>Data Management & Recovery</h3>
                        <ul className="feature-list">
                            <li><strong>Live replication</strong> across instances/databases</li>
                            <li><strong>Automated backups</strong> with verified restore drills</li>
                            <li><strong>Disaster recovery runbook</strong> for fast RTO/RPO</li>
                        </ul>
                    </div>

                    <div className="card" style={{ display: "grid", gap: 12 }}>
                        <h3 style={{ margin: 0 }}>Performance & Security</h3>
                        <ul className="feature-list">
                            <li><strong>CDN + caching</strong> for global, snappy load times</li>
                            <li><strong>Image/code optimization</strong> to keep pages fast</li>
                            <li><strong>TLS everywhere</strong>, hardened headers, WAF/firewalls</li>
                            <li><strong>Regular scans & patching</strong> to reduce risk</li>
                        </ul>
                    </div>

                    <div className="card" style={{ display: "grid", gap: 12 }}>
                        <h3 style={{ margin: 0 }}>Monitoring & Support</h3>
                        <ul className="feature-list">
                            <li><strong>24/7 uptime monitoring</strong> with real-time alerts</li>
                            <li><strong>Automated health checks</strong> & self-healing restarts</li>
                            <li><strong>On-call escalation</strong> for incidents, anytime</li>
                        </ul>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
                            <a
                                className="btn btn-outline"
                                href={process.env.NEXT_PUBLIC_STATUS_URL || "#"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Status Page
                            </a>
                            <Link href="/contact" className="btn btn-outline">Contact Us</Link>
                        </div>
                    </div>
                </div>

                {/* How this maps to student experience */}
                <div className="card" style={{ display: "grid", gap: 8 }}>
                    <h3 style={{ margin: 0 }}>What this means for students</h3>
                    <ul className="feature-list">
                        <li>Lockers and booking flow stay available—even late at night</li>
                        <li>Fast pages on campus Wi-Fi and mobile data</li>
                        <li>Secure checkout and account changes over encrypted connections</li>
                    </ul>
                    <p className="text-muted" style={{ marginTop: 6 }}>
                        For universities, we can share uptime reports and architecture summaries on request.
                    </p>
                </div>
            </div>

            {/* Optional: basic JSON-LD “Service” for SEO */}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Loka Technology — Smart Locker Access",
                        areaServed: "University campuses",
                        provider: { "@type": "Organization", name: "Loka Technology" },
                        termsOfService: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/terms`,
                    }),
                }}
            />
        </section>
    );
}
