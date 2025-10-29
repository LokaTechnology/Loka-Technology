// app/solutions/page.tsx
import Link from "next/link";

const BRAND = { slate: "#2F4F4F", green: "#1E7D4B", yellow: "#FFC606" };

export default function Solutions() {
  return (
    <section className="w-full">
      {/* thin top bar like the screenshot */}
      <div style={{ height: 6, background: BRAND.slate }} />

      <div className="container py-10 md:py-14">
        {/* Page Title */}
        <header className="mb-10 md:mb-12">
          <h1
            className="text-center"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: ".04em",
              color: BRAND.slate,
              fontSize: "clamp(28px, 4vw, 44px)",
              textTransform: "uppercase",
            }}
          >
            Solutions
          </h1>
        </header>

        {/* Content column centered with lots of breathing room */}
        <div className="mx-auto w-full max-w-4xl">
          <SolutionBlock
            title="Advanced Security Measures"
            body="We take security seriously. Systems include 24/7 camera coverage near locker bays, audit logs for every open/close, role-based access controls for staff, and remote disable. Hardware service is coordinated through American Locker."
          />

          <Divider />

          <SolutionBlock
            title="Variety of Unit Sizes"
            body="From small doors for notebooks and tablets to larger bays for instruments or athletic gear, we fit the use-cases on campus. Layouts can mix sizes within a single bank to maximize utilization."
          />

          <Divider />

          <SolutionBlock
            title="Online Bill Payment"
            body="Stripe-powered checkout for hourly, monthly, and semester plans. Receipts are automatically emailed, and you can extend or cancel anytime from your account."
          />

          <Divider />

          <SolutionBlock
            title="Climate-Controlled Options"
            body="Where heat matters (Arizona ☀️), we offer temperature-monitored bays for devices, meds, or sensitive materials. Alerts are triggered if thresholds are exceeded."
          />

          <Divider />

          <SolutionBlock
            title="Easy Student Access"
            body="Unlock with QR code, PIN, or campus ID—no keys to lose. Accessibility and lighting meet campus standards, and locations are ADA-friendly."
          />

          <Divider />

          <SolutionBlock
            title="Turn-Key Install & Support"
            body="We handle site planning, delivery, install, and training. Ongoing support includes software updates, uptime monitoring, and American Locker field service for hardware."
          />

          {/* Partner CTA */}
          <div className="mt-10 flex items-center justify-between gap-4 rounded-xl border bg-white p-4"
               style={{ borderColor: "var(--line)" }}>
            <p className="m-0 text-sm text-gray-700">
              Looking to collaborate on a pilot or multi-site rollout?
            </p>
            <Link href="/partner" className="btn btn-primary" style={{ background: BRAND.slate }}>
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="py-5">
      <h3
        className="m-0"
        style={{
          color: "#243b3b",
          fontWeight: 700,
          fontSize: "clamp(18px, 2.4vw, 22px)",
        }}
      >
        {title}
      </h3>
      <p className="m-0 mt-2 text-[15px] leading-7 text-gray-700">{body}</p>
    </section>
  );
}

function Divider() {
  return <hr className="my-2 border-t" style={{ borderColor: "var(--line)" }} />;
}
