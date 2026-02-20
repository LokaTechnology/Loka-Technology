export default function ProductPage() {
  return (
    <main className="section">
      <div className="container">

        {/* Page Header */}
        <h1>Smart Locker Platform & Managed Campus Services</h1>
        <p className="text-muted max-w-2xl">
          Loka provides a fully managed smart locker solution supported by a
          major enterprise-grade supplier, combining secure hardware,
          centralized software, and ongoing operational services designed
          specifically for universities.
        </p>

        <hr />

        {/* Core Services — PRIMARY SELLING POINTS */}
        <section className="section">
          <h2>Core Services</h2>

          <div className="grid-2">

            <div className="card">
              <h3>Data Analytics & Reporting</h3>
              <p>
                Real-time usage tracking, access logs, and performance data
                enable institutions to evaluate demand, optimize placement,
                and support evidence-based expansion planning.
              </p>
            </div>

            <div className="card">
              <h3>24/7 Operational Support</h3>
              <p>
                Continuous monitoring and support ensure locker uptime,
                rapid response to issues, and consistent service availability
                across campus locations.
              </p>
            </div>

            <div className="card">
              <h3>Preventive Maintenance</h3>
              <p>
                Scheduled inspections, diagnostics, and system health checks
                reduce downtime and extend hardware lifespan while minimizing
                operational disruption.
              </p>
            </div>

            <div className="card">
              <h3>Expansion Planning</h3>
              <p>
                Data-informed growth strategies allow universities to scale
                deployments across additional buildings and departments as
                demand increases.
              </p>
            </div>

            <div className="card">
              <h3>Technology Integration</h3>
              <p>
                Supports integration with campus authentication systems,
                administrative platforms, and existing IT infrastructure
                using secure, configurable access methods.
              </p>
            </div>

          </div>
        </section>

        {/* System Overview */}
        <section className="section">
          <h2>System Overview</h2>
          <p className="max-w-3xl">
            The Loka platform provides secure, self-service storage while
            reducing administrative workload. Locker access is managed
            through approved campus authentication methods, and system
            activity is monitored via a centralized administrative dashboard.
          </p>
        </section>

        {/* How It Works */}
        <section className="section">
          <h2>How the System Works</h2>

          <div className="grid-2">

            <div className="card">
              <h3>1. Authenticate</h3>
              <p>
                Users access lockers using institution-approved methods such
                as ID cards, QR codes, or secure login credentials.
              </p>
            </div>

            <div className="card">
              <h3>2. Store & Retrieve</h3>
              <p>
                Lockers unlock instantly for authorized users, eliminating
                manual key distribution or front-desk management.
              </p>
            </div>

            <div className="card">
              <h3>3. Monitor & Manage</h3>
              <p>
                Administrators review usage metrics, system alerts, and
                access logs from a web-based management interface.
              </p>
            </div>

            <div className="card">
              <h3>4. Maintain & Scale</h3>
              <p>
                Automated alerts and ongoing service support enable proactive
                maintenance and campus-wide expansion planning.
              </p>
            </div>

          </div>
        </section>

        {/* Problems Addressed */}
        <section className="section">
          <h2>Institutional Challenges Addressed</h2>
          <ul className="feature-list max-w-3xl">
            <li>Limited or unsecured storage in academic buildings</li>
            <li>Front-desk congestion and manual locker administration</li>
            <li>Lost or stolen personal or institutional property</li>
            <li>Staffing overhead associated with key management</li>
            <li>Inflexible storage systems that do not scale with demand</li>
          </ul>
        </section>

        {/* No Risk Section (Important — from meeting notes) */}
        <section className="section card text-center">
          <h2>No Risk to the University</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Institutions may evaluate the Loka system through a limited pilot
            deployment before committing to campus-wide expansion. The pilot
            allows stakeholders to validate operational impact, user adoption,
            and system reliability using real-world data.
          </p>

          <a href="/pricing" className="btn btn-primary mt-4">
            Request a Free Pilot
          </a>
        </section>

      </div>
    </main>
  );
}
