export default function ProductPage() {
  return (
    <main className="section">
      <div className="container">

        {/* Page header */}
        <h1>Enterprise Smart Locker System for Universities</h1>
        <p className="text-muted max-w-2xl">
          Loka delivers a fully managed smart locker solution combining secure,
          enterprise-grade hardware with cloud-based software and ongoing
          operational support — purpose-built for university environments.
        </p>

        <hr />

        {/* What the system is */}
        <section className="section">
          <h2>System Overview</h2>
          <p className="max-w-3xl">
            Loka smart lockers provide secure, self-service storage for students,
            faculty, and staff while reducing administrative overhead for campus
            operations. The system integrates with existing campus infrastructure
            and supports deployment across multiple buildings, departments, and
            use cases.
          </p>
        </section>

        {/* How it works */}
        <section className="section">
          <h2>How the System Works</h2>

          <div className="grid-2">
            <div className="card">
              <h3>1. Authenticate</h3>
              <p>
                Users access lockers using approved campus authentication methods
                such as student ID cards, QR codes, or secure login credentials.
              </p>
            </div>

            <div className="card">
              <h3>2. Access & Store</h3>
              <p>
                Lockers unlock instantly for authorized users, enabling quick
                storage and retrieval without staff involvement.
              </p>
            </div>

            <div className="card">
              <h3>3. Monitor & Manage</h3>
              <p>
                Administrators manage availability, access logs, alerts, and
                system health through a centralized web-based dashboard.
              </p>
            </div>

            <div className="card">
              <h3>4. Maintain & Scale</h3>
              <p>
                Automated diagnostics and alerts support proactive maintenance
                and allow deployments to scale with campus demand.
              </p>
            </div>
          </div>
        </section>

        {/* Problems solved — IMPORTANT for RFPs */}
        <section className="section">
          <h2>Problems Addressed</h2>
          <ul className="feature-list max-w-3xl">
            <li>Limited or unsecured storage in academic and common spaces</li>
            <li>Front-desk congestion and manual key management</li>
            <li>Lost or stolen personal and institutional assets</li>
            <li>High staffing overhead for locker administration</li>
            <li>Inflexible storage policies that do not scale with demand</li>
          </ul>
        </section>

        {/* Pilot timeline */}
        <section className="section">
          <h2>Pilot Deployment Timeline</h2>

          <div className="grid-2 mt-6">
            <div className="card">
              <h3>Week 1 — Assessment</h3>
              <p>
                Site evaluation, use-case definition, and coordination with
                facilities, IT, and security stakeholders.
              </p>
            </div>

            <div className="card">
              <h3>Week 2 — Installation</h3>
              <p>
                Locker delivery, physical installation, and system configuration
                with minimal disruption to campus operations.
              </p>
            </div>

            <div className="card">
              <h3>Weeks 3–6 — Live Pilot</h3>
              <p>
                Active use by students and staff with real-time monitoring,
                reporting, and support.
              </p>
            </div>

            <div className="card">
              <h3>Final Review</h3>
              <p>
                Data-driven evaluation of usage, operational impact, and
                recommendations for broader rollout.
              </p>
            </div>
          </div>
        </section>

        {/* Security & compliance */}
        <section className="section">
          <h2>Security & Compliance</h2>
          <ul className="feature-list max-w-3xl">
            <li>Encrypted authentication and access sessions</li>
            <li>Hardware-level anti-tamper monitoring</li>
            <li>Comprehensive audit trails for access and usage</li>
            <li>Supports institutional security and privacy policies</li>
          </ul>
        </section>

        {/* Bottom CTA */}
        <section className="section card text-center">
          <h2>Evaluate Loka on Your Campus</h2>
          <p className="text-muted max-w-xl mx-auto">
            Pilot deployments allow institutions to validate operational impact,
            user adoption, and system reliability before a full rollout.
          </p>
          <a href="/contact" className="btn btn-primary mt-4">
            Request a Pilot
          </a>
        </section>

      </div>
    </main>
  );
}
