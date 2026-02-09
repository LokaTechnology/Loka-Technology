
export default function UseCasesPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Flexible Deployments Across Campus Operations</h1>
        <p className="text-muted max-w-2xl">
          Loka adapts to a wide range of academic, residential,
          and auxiliary service environments.
        </p>

        <hr />

        <section className="section grid-2">
          <div className="card">
            <h3>Mailrooms & Package Services</h3>
            <p>
              Reduce package backlogs and front-desk congestion by enabling
              24/7 self-service pickup.
            </p>
          </div>

          <div className="card">
            <h3>Libraries & Study Spaces</h3>
            <p>
              Secure personal belongings and reduce clutter
              in academic environments.
            </p>
          </div>

          <div className="card">
            <h3>Housing & Residential Life</h3>
            <p>
              Support move-in periods, guest storage, and
              temporary resident needs.
            </p>
          </div>

          <div className="card">
            <h3>Recreation & Athletics</h3>
            <p>
              Fast, keyless locker access without staffing
              bottlenecks during peak hours.
            </p>
          </div>
        </section>

        <section className="section card text-center">
          <h2>One Platform, Many Departments</h2>
          <p className="text-muted">
            Loka integrates into existing workflows without forcing
            operational change.
          </p>
          <a href="/contact" className="btn btn-primary">
            Talk to Us
          </a>
        </section>

      </div>
    </main>
  );
}
