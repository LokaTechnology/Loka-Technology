"use client";

import Link from "next/link";
import { useState } from "react";

const BRAND = { slate: "#2F4F4F", green: "#1E7D4B", yellow: "#FFC606" };

export default function PartnerPage() {
  return (
    <section className="section">
      <div className="container space-y-8">
        {/* 1) Compelling intro */}
        <header className="space-y-2">
          <h1 style={{ color: BRAND.slate }}>Partner With Us</h1>
          <p className="text-muted" style={{ maxWidth: 800 }}>
            Join the Loka partner network to deliver secure, self-serve smart lockers that reduce theft,
            streamline operations, and elevate student experience. We power software, monitoring, and analytics;
            you help us bring it to campuses and properties that need it most.
          </p>
          <div className="kicker">By students, for students — built for campuses</div>
        </header>

        {/* Supplier highlight + Why partner */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card md:col-span-2">
            <h3>Why partner with Loka</h3>
            <ul className="feature-list mt-2">
              <li><strong>Expand your footprint:</strong> libraries, rec centers, labs, athletics, residence life.</li>
              <li><strong>New revenue streams:</strong> hourly/daily/semester plans, rev-share or margin options.</li>
              <li><strong>Modern stack:</strong> Stripe checkout, role-based access, full audit logs, webhooks.</li>
              <li><strong>Sales enablement:</strong> co-branded assets, pilots, lead support, case studies.</li>
              <li><strong>Training & SLAs:</strong> install playbooks, admin training, defined response windows.</li>
            </ul>
          </div>

          <div className="card">
            <h3>Hardware supplier</h3>
            <p className="m-0 text-[15px] text-gray-700">
              Physical lockers supplied by <strong>American Locker</strong>. Loka manages software, monitoring,
              and first-line support; American Locker provides <em>field service & RMA</em> for hinges, latches,
              and controllers.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <a className="btn btn-outline" href="https://www.americanlocker.com/" target="_blank" rel="noreferrer">
                About American Locker
              </a>
              <Link className="btn btn-primary" href="/support/ticket">Open a hardware ticket</Link>
            </div>
          </div>
        </div>

        {/* 2) Partner profiles */}
        <div className="card">
          <h3 className="m-0">Who we’re looking for</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-3">
            <Bucket title="Distributors & Resellers" items={["Campus retailers", "Facilities vendors", "Security resellers"]} />
            <Bucket title="System Integrators" items={["SSO / OIDC / SAML", "Access control & NFC", "IT asset management"]} />
            <Bucket title="Property & Logistics" items={["Residence life & housing", "3PL & click-and-collect", "Athletics / rec ops"]} />
          </div>
        </div>

        {/* 3) Program tiers */}
        <div className="card">
          <h3 className="m-0">Partner program tiers (example)</h3>
          <div className="grid md:grid-cols-4 gap-6 mt-3">
            <Tier name="Registered" who="New resellers / campus orgs" perks={["Lead portal", "Co-branded decks", "Email support"]}/>
            <Tier name="Silver" who="Active installers / integrators" perks={["Deal reg + MDF", "Priority support", "Sandbox & webhooks"]}/>
            <Tier name="Gold" who="Regional specialists" perks={["Rev-share or margin uplift", "Joint marketing", "Quarterly roadmap"]}/>
            <Tier name="Enterprise" who="National distributors / OEM" perks={["Territory options", "Custom integrations", "Dedicated TAM"]}/>
          </div>
        </div>

        {/* 4) Integrations */}
        <div className="card">
          <h3 className="m-0">Common integrations</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-3">
            <Bucket title="Identity & Access" items={["SSO (SAML/OIDC)", "Campus ID / NFC / HID", "Role-based admin"]}/>
            <Bucket title="Payments & Billing" items={["Stripe (cards, wallets)", "Subscriptions / invoices", "Refunds & receipts"]}/>
            <Bucket title="Ops & Data" items={["Webhooks & REST API", "Ticketing (Zendesk/Jira)", "Usage & revenue exports"]}/>
          </div>
        </div>

        {/* 5) Process */}
        <div className="card">
          <h3 className="m-0">Partnership process</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 mt-2">
            <li><strong>Apply:</strong> share your org, regions, and target use-cases.</li>
            <li><strong>Fit call:</strong> align on model (rev-share, subscription, or purchase + support).</li>
            <li><strong>Pilot (60–90 days):</strong> on-site install, success metrics, student feedback.</li>
            <li><strong>Agreement & enablement:</strong> contracts, training, co-marketing.</li>
            <li><strong>Launch:</strong> go-live, dashboards, quarterly reviews.</li>
          </ol>
        </div>

        {/* 6) Testimonials / case snapshot */}
        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial
            quote="We stood up a pilot in weeks and hit 90% utilization during midterms."
            by="Associate Director, Campus Library"
          />
          <Testimonial
            quote="Revenue share covered our costs in month two—students love the flexibility."
            by="VP Auxiliary Services"
          />
          <Testimonial
            quote="Integration with campus SSO and ID cards was straightforward for our team."
            by="Systems Integrator Partner"
          />
        </div>

        {/* CTA + lead form */}
        <div id="contact" className="card" style={{ display: "grid", gap: 14 }}>
          <h3 className="m-0">Ready to get started?</h3>
          <p className="m-0 text-gray-700">Tell us about your organization. We’ll respond within one business day.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <PartnerLeadForm />
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "#fff" }}>
              <h4 className="m-0" style={{ color: BRAND.slate }}>Models</h4>
              <ul className="feature-list mt-2">
                <li>Revenue Share</li>
                <li>Subscription</li>
                <li>Purchase + Support</li>
                <li>Pilot (60–90 days)</li>
              </ul>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <Link href="/payment" className="btn btn-outline">See Pricing Models</Link>
                <Link href="/support" className="btn btn-primary" style={{ background: BRAND.slate }}>Support Center</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- small presentational helpers ---------- */
function Bucket({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "#fff" }}>
      <h4 className="m-0" style={{ color: "#2F4F4F" }}>{title}</h4>
      <ul className="feature-list mt-2">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
    </div>
  );
}

function Tier({ name, who, perks }: { name: string; who: string; perks: string[] }) {
  return (
    <div className="card">
      <div className="kicker">{name}</div>
      <div className="text-muted" style={{ margin: "6px 0 8px", fontWeight: 600 }}>{who}</div>
      <ul className="feature-list">{perks.map((p, i) => <li key={i}>{p}</li>)}</ul>
    </div>
  );
}

function Testimonial({ quote, by }: { quote: string; by: string }) {
  return (
    <div className="card">
      <p style={{ fontStyle: "italic", margin: 0 }}>&ldquo;{quote}&rdquo;</p>
      <div className="text-muted" style={{ marginTop: 8, fontWeight: 600 }}>— {by}</div>
    </div>
  );
}

/* ---------- tiny lead form (posts to /api/contact) ---------- */
function PartnerLeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");

    const f = new FormData(e.currentTarget);
    const payload = {
      topic: "partner",
      company: f.get("company")?.toString().trim(),
      name: f.get("name")?.toString().trim(),
      email: f.get("email")?.toString().trim(),
      phone: f.get("phone")?.toString().trim(),
      type: f.get("type")?.toString(),
      region: f.get("region")?.toString(),
      message: f.get("message")?.toString().trim(),
    };

    if (!payload?.email || !payload?.message) {
      setStatus("error");
      setErr("Email and message are required.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (e: any) {
      setStatus("error");
      setErr(e?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" noValidate style={{ display: "grid", gap: 10 }}>
      <h4 className="m-0" style={{ color: BRAND.slate }}>Become a partner</h4>

      <label className="label">Company</label>
      <input name="company" className="form-input" placeholder="Your company" />

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="label">Name</label>
          <input name="name" className="form-input" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="label">Email*</label>
          <input type="email" name="email" required className="form-input" placeholder="you@company.com" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="label">Phone</label>
          <input name="phone" className="form-input" placeholder="+1 (555) 123-4567" />
        </div>
        <div>
          <label className="label">Partner type</label>
          <select name="type" className="form-input">
            <option>Distributor / Reseller</option>
            <option>System Integrator</option>
            <option>Property / Facilities</option>
            <option>Logistics / 3PL</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="label">Region</label>
          <input name="region" className="form-input" placeholder="e.g., Southwest, Northeast, National" />
        </div>
      </div>

      <label className="label">Message*</label>
      <textarea name="message" required rows={5} className="form-input" placeholder="Tell us about your goals, timeline, and ideal model…" />

      {status === "error" && <p className="error">{err}</p>}
      {status === "ok" && <p style={{ color: "#0f8a5f", fontWeight: 600 }}>Thanks! We’ll follow up within one business day.</p>}

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button className="btn btn-primary" disabled={status === "sending"} style={{ background: BRAND.slate }}>
          {status === "sending" ? "Sending…" : "Apply Now"}
        </button>
        <Link href="/payment" className="cta-muted">View Pricing</Link>
      </div>
    </form>
  );
}
