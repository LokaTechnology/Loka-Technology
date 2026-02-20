export const metadata = {
  title: "Semester Pilot Program – Loka",
};

export default function PilotProgramPage() {
  return (
    <main className="section">
      <div className="container">

        <h1>Semester-Based Pilot Program</h1>
        <p className="text-muted max-w-2xl">
          A structured, data-driven pilot allowing universities to evaluate
          performance before committing to long-term deployment.
        </p>

        <hr />

        {/* Structure */}
        <section className="section max-w-3xl">
          <h2>Pilot Structure</h2>
          <ul className="feature-list">
            <li>Limited installation at approved campus location(s)</li>
            <li>Semester-length evaluation period</li>
            <li>Full dashboard access and reporting</li>
            <li>Operational and technical support included</li>
          </ul>
        </section>

        {/* Success metrics */}
        <section className="section">
          <h2>Defined Success Metrics</h2>

          <div className="grid-2">
            <div className="card">
              <h3>User Adoption</h3>
              <p>Utilization rates and repeat usage patterns.</p>
            </div>

            <div className="card">
              <h3>Operational Impact</h3>
              <p>Reduction in staffing burden and front-desk congestion.</p>
            </div>

            <div className="card">
              <h3>System Reliability</h3>
              <p>Uptime performance and issue resolution timelines.</p>
            </div>

            <div className="card">
              <h3>Policy Alignment</h3>
              <p>Compliance with institutional security and privacy standards.</p>
            </div>
          </div>
        </section>

        {/* No long term commitment */}
        <section className="section max-w-3xl">
          <h2>No Long-Term Commitment Upfront</h2>
          <p>
            At the end of the semester, the university receives a formal
            performance report supporting a data-backed go/no-go decision.
          </p>
          <p className="mt-3">
            Institutions may expand, modify, or conclude the deployment
            without contractual obligation beyond the pilot term.
          </p>
        </section>

        {/* CTA */}
        <section className="section card text-center">
          <h2>Apply for a Semester Pilot</h2>
          <a href="/contact" className="btn btn-primary mt-4">
            Apply for Pilot
          </a>
        </section>

      </div>
    </main>
  );
}
