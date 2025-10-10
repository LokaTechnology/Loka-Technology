import Link from "next/link";

export default function Partner() {
  return (
    <div className="space-y-8">
      <h1>Partner With Us</h1>
      <p className="text-white/80 max-w-2xl">
        Team up with Loka Tech to deploy self-serve smart lockers that reduce theft, improve student experience,
        and generate measurable value—without new headcount.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3>Models</h3>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Revenue Share</li>
            <li>Subscription</li>
            <li>Purchase + Support</li>
            <li>Pilot (60–90 days)</li>
          </ul>
        </div>
        <div className="card">
          <h3>Get Started</h3>
          <p className="text-white/80">Tell us about your campus and timeline.</p>
          <Link href="/partner#contact" className="btn btn-primary mt-3">Request a Campus Pilot</Link>
        </div>
      </div>
    </div>
  );
}
