import Image from "next/image";
import PricingLeaner from "./PricingLeaner";

export const metadata = {
  title: "Campus Pricing & Pilot Programs – Loka Technology",
};

export default function PricingPage() {
  return (
    <main className="section">
      <div className="container space-y-10">

        {/* Hero */}
        <section className="relative h-56 rounded-xl overflow-hidden border">
          <Image
            src="/images/loka4.png"
            alt="Smart lockers on a university campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute bottom-4 left-6 text-white text-3xl font-bold">
            Campus Pricing & Pilot Programs
          </h1>
        </section>

        {/* Pricing philosophy */}
        <section className="max-w-3xl">
          <h2>Campus-Specific Pricing</h2>
          <p className="subtle">
            Loka pricing is customized for each institution. Costs vary based on
            deployment size, configuration, integrations, and operational
            requirements. This ensures pricing aligns with campus needs rather
            than one-size-fits-all plans.
          </p>
        </section>

        {/* What affects pricing */}
        <section className="section">
          <h2>What Influences Pricing</h2>
          <ul className="feature-list max-w-3xl">
            <li>Number of lockers and module configuration</li>
            <li>Indoor or outdoor installation requirements</li>
            <li>Hours of availability and access policies</li>
            <li>Authentication methods (ID cards, SSO, QR)</li>
            <li>Software integrations and reporting needs</li>
            <li>Pilot duration and support scope</li>
          </ul>
        </section>

        {/* Reworked estimator */}
        <PricingLeaner />

        {/* Pilot CTA */}
        <section className="section card text-center">
          <h2>Pilot Before Full Deployment</h2>
          <p className="text-muted max-w-xl mx-auto">
            Pilot programs allow universities to evaluate operational impact,
            user adoption, and system performance before committing to a
            campus-wide rollout.
          </p>

          <div className="flex gap-4 justify-center mt-6 flex-wrap">
            <a href="/contact" className="btn btn-primary">
              Request Pricing
            </a>
            <a href="/pricing/pilot" className="btn btn-outline">
              Apply for Pilot
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
