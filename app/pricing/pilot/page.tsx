export const metadata = {
  title: "Pilot Program – Loka Smart Lockers",
};

export default function PilotProgramPage() {
  return (
    <main className="section">
      <div className="container space-y-10">

        {/* Header */}
        <section className="max-w-3xl">
          <h1>Pilot Program Overview</h1>
          <p className="text-muted">
            Loka pilot programs allow universities to evaluate smart locker
            deployments in a controlled, low-risk environment before committing
            to a broader rollout.
          </p>
        </section>

        <hr />

        {/* What the pilot is */}
        <section className="section max-w-3xl">
          <h2>What the Pilot Includes</h2>
          <p>
            Pilot deployments are short-term installations designed to validate
            operational impact, user adoption, and system performance. The pilot
            focuses on real campus usage rather than demonstrations or mock
            environments.
          </p>

          <ul className="feature-list mt-4">
            <li>Limited smart locker installation at selected campus location(s)</li>
            <li>Configuration aligned to approved campus access methods</li>
            <li>Administrative dashboard access for monitoring and reporting</li>
            <li>Operational support during the pilot period</li>
          </ul>
        </section>

        {/* Timeline */}
        <section className="section">
          <h2>Pilot Timeline</h2>

          <div className="grid-2 mt-6">
            <div className="card">
              <h3>Phase 1 — Planning</h3>
              <p>
                Coordination with facilities, IT, and security stakeholders to
                confirm scope, location, access methods, and success criteria.
              </p>
            </div>

            <div className="card">
              <h3>Phase 2 — Installation</h3>
              <p>
                Delivery and installation of lockers, system configuration, and
                verification of network and access requirements.
              </p>
            </div>

            <div className="card">
              <h3>Phase 3 — Live Operation</h3>
              <p>
                Active campus use with real-time monitoring, usage tracking, and
                issue resolution as needed.
              </p>
            </div>

            <div className="card">
              <h3>Phase 4 — Evaluation</h3>
              <p>
                Review of usage data, operational feedback, and recommendations
                for expansion or modification.
              </p>
            </div>
          </div>
        </section>

        {/* Success criteria */}
        <section className="section max-w-3xl">
          <h2>Evaluation Criteria</h2>
          <ul className="feature-list">
            <li>User adoption and utilization patterns</li>
            <li>Impact on staffing and administrative workload</li>
            <li>System reliability and uptime</li>
            <li>Alignment with campus security policies</li>
            <li>Feedback from operational stakeholders</li>
          </ul>
        </section>

        {/* Responsibilities — VERY IMPORTANT */}
        <section className="section">
          <h2>University Responsibilities</h2>

          <div className="card max-w-3xl">
            <p className="subtle">
              During the pilot, the university is responsible for the following:
            </p>

            <ul className="feature-list mt-3">
              <li>Providing physical space for locker installation</li>
              <li>Electrical power and network connectivity</li>
              <li>Coordination with internal IT, facilities, and security teams</li>
              <li>Approval of access methods and user policies</li>
              <li>Compliance with institutional privacy and data policies</li>
            </ul>
          </div>
        </section>

        {/* What happens after */}
        <section className="section max-w-3xl">
          <h2>Post-Pilot Outcomes</h2>
          <p>
            Upon completion of the pilot, Loka provides a summary of operational
            findings to support internal decision-making. Institutions may
            choose to expand, modify, or conclude the deployment based on pilot
            results.
          </p>
        </section>

        {/* CTA */}
        <section className="section card text-center">
          <h2>Apply for a Pilot Program</h2>
          <p className="text-muted max-w-xl mx-auto">
            Pilot availability is limited and subject to campus readiness and
            deployment scope.
          </p>

          <div className="flex gap-4 justify-center mt-6 flex-wrap">
            <a href="/contact" className="btn btn-primary">
              Apply for Pilot
            </a>
            <a href="/pricing" className="btn btn-outline">
              Back to Pricing
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
