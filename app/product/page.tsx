export default function ProductPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Enterprise Smart Locker System for Universities</h1>
        <p className="text-muted max-w-2xl">
          Loka provides a fully managed smart locker solution combining
          secure hardware, cloud-based software, and ongoing operational support.
        </p>

        <hr />

        <section className="section">
          <h2>System Overview</h2>
          <p>
            Loka is designed to reduce administrative workload while providing
            students and staff with secure, self-service access to campus storage.
            The system integrates with existing campus infrastructure and scales
            across multiple departments and locations.
          </p>
        </section>

        <section className="section">
          <h2>Core Capabilities</h2>
          <div className="grid-2">
            <div className="card">
              <h3>Secure Access Control</h3>
              <p>
                Supports campus ID, QR codes, and approved authentication methods
                with encrypted access and audit logging.
              </p>
            </div>
            <div className="card">
              <h3>Centralized Administration</h3>
              <p>
                Web-based dashboard for monitoring usage, availability,
                alerts, and performance metrics across deployments.
              </p>
            </div>
            <div className="card">
              <h3>Operational Automation</h3>
              <p>
                Automated alerts, diagnostics, and reporting reduce manual
                intervention and support proactive maintenance.
              </p>
            </div>
            <div className="card">
              <h3>Scalable Hardware</h3>
              <p>
                Modular locker configurations suitable for indoor and
                outdoor installations with ADA-compliant options.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>Pilot Deployment Timeline</h2>

            <div className="grid-2 mt-6">
              <div className="card">
                <h3>Week 1 — Assessment</h3>
                <p>
                  Site review, use-case alignment, and deployment planning
                  with facilities and IT stakeholders.
                </p>
              </div>

              <div className="card">
                <h3>Week 2 — Installation</h3>
                <p>
                  Locker delivery, installation, and system configuration
                  with minimal campus disruption.
                </p>
              </div>

              <div className="card">
                <h3>Weeks 3–6 — Live Pilot</h3>
                <p>
                  Active usage by students and staff with real-time monitoring
                  and support.
                </p>
              </div>

              <div className="card">
                <h3>Final Review</h3>
                <p>
                  Usage data, operational impact summary, and
                  recommendation for campus-wide rollout.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Security & Compliance</h2>
          <ul className="feature-list">
            <li>Encrypted authentication and session handling</li>
            <li>Anti-tamper hardware sensors</li>
            <li>Audit trails for access and usage</li>
            <li>Supports campus security and privacy policies</li>
          </ul>
        </section>


        <section className="section card text-center">
          <h2>Evaluate Loka on Your Campus</h2>
          <p className="text-muted">
            Pilot deployments allow institutions to validate impact
            before full rollout.
          </p>
          <a href="/contact" className="btn btn-primary">
            Request a Pilot
          </a>
        </section>

      </div>
    </main>
  );
}
