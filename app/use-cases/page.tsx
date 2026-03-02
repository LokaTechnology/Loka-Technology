export default function UseCasesPage() {
  return (
    <main className="section">
      <div className="container">

        <h1>Campus Use Cases</h1>
        <p className="text-muted max-w-2xl">
          Loka smart lockers support a range of campus environments by providing
          secure, self service storage that reduces operational overhead while
          maintaining institutional security standards.
        </p>

        <hr />

        {/* Universities & Student Unions */}
        <section className="section">
          <h2>Universities & Student Unions</h2>
          <p className="max-w-3xl">
            Smart lockers provide secure, temporary storage for backpacks,
            laptops, and personal items in high-traffic academic buildings and
            student gathering spaces. This reduces clutter, minimizes theft
            risk, and enables students to move freely between classes and
            activities.
          </p>
        </section>

        {/* Libraries & Study Spaces */}
        <section className="section">
          <h2>Libraries & Study Spaces</h2>
          <p className="max-w-3xl">
            Lockers support quiet study environments by limiting personal item
            congestion while maintaining secure, monitored storage access.
            Libraries can improve space utilization without introducing
            additional staffing or manual locker management.
          </p>
        </section>

        {/* Campus Housing */}
        <section className="section">
          <h2>Campus Housing</h2>
          <p className="max-w-3xl">
            Shared use lockers provide flexible storage for residents, guests,
            and short term needs during move in, move out, and peak occupancy
            periods. Access can be managed digitally without issuing or tracking
            physical keys.
          </p>
        </section>

        {/* Recreation Centers */}
        <section className="section">
          <h2>Recreation Centers</h2>
          <p className="max-w-3xl">
            Recreation facilities benefit from fast, keyless locker access that
            reduces front desk congestion during peak hours. Secure self service
            storage improves user throughput while maintaining oversight and
            accountability.
          </p>
        </section>

        {/* Closing */}
        <section className="section card text-center">
          <h2>Flexible Deployment Across Campus</h2>
          <p className="text-muted max-w-xl mx-auto">
            Loka lockers adapt to diverse campus environments while maintaining
            consistent security, access control, and administrative visibility.
          </p>
          <a href="/contact" className="btn btn-primary mt-4">
            Discuss Campus Use Cases
          </a>
        </section>

      </div>
    </main>
  );
}
