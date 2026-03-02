
export default function WhyLokaPage() {
  return (
    <main className="section">
      <div className="container">

        {/* Header */}
        <h1>Why Loka</h1>
        <p className="text-muted max-w-2xl">
          Universities can purchase lockers. Or they can deploy a managed,
          accountable campus storage platform. Loka focuses on outcomes —
          not just equipment.
        </p>

        <hr />

        {/* Vendor vs Loka */}
        <section className="section">
          <h2>Why Not Go Direct to a Locker Vendor?</h2>

          <div className="grid-2 mt-6">

            <div className="card">
              <h3>Hardware Vendors Sell Equipment</h3>
              <ul className="feature-list">
                <li>Upfront hardware purchase</li>
                <li>Limited operational oversight</li>
                <li>Reactive support models</li>
                <li>Fragmented responsibility across departments</li>
              </ul>
            </div>

            <div className="card">
              <h3>Loka Manages Outcomes</h3>
              <ul className="feature-list">
                <li>End to end operational ownership</li>
                <li>Data analytics and reporting</li>
                <li>24/7 monitoring and support</li>
                <li>Performance accountability</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Vendor sprawl risk */}
        <section className="section max-w-3xl">
          <h2>Avoid Vendor Sprawl & Operational Risk</h2>
          <p>
            Direct hardware procurement often results in separate vendors
            for hardware, software, maintenance, and integration. This
            increases institutional risk and diffuses accountability.
          </p>
          <p className="mt-3">
            Loka serves as a single operational partner — consolidating
            hardware sourcing, system management, analytics, support,
            and expansion planning under one accountable structure.
          </p>
        </section>

        {/* What We Own */}
        <section className="section">
          <h2>What Loka Owns</h2>

          <div className="grid-2">
            <div className="card">
              <h3>Operations</h3>
              <p>
                Continuous monitoring, issue resolution, and performance oversight.
              </p>
            </div>

            <div className="card">
              <h3>Data & Reporting</h3>
              <p>
                Usage metrics, adoption rates, and expansion planning insights.
              </p>
            </div>

            <div className="card">
              <h3>System Reliability</h3>
              <p>
                Preventive maintenance and proactive uptime management.
              </p>
            </div>

            <div className="card">
              <h3>Accountability</h3>
              <p>
                A single partner responsible for performance and campus outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section card text-center">
          <h2>Choose a Managed Outcome, Not Just Hardware</h2>
          <a href="/pricing" className="btn btn-primary mt-4">
            Evaluate a Pilot Deployment
          </a>
        </section>

      </div>
    </main>
  );
}
