"use client";

import { useState } from "react";
import Link from "next/link";

const BRAND = { slate: "#2F4F4F" } as const;

type Plan = "hourly" | "monthly" | "semester";
const LABEL: Record<Plan, string> = {
    hourly: "Hourly",
    monthly: "Monthly",
    semester: "Semester",
};

// Flat prices (USD). Hourly is metered at $4/hr.
const PRICE: Record<Plan, number> = {
    hourly: 4,
    monthly: 40,
    semester: 120,
};

export default function PricingLeaner() {
    const [plan, setPlan] = useState<Plan>("monthly");

    return (
        <section className="section">
            <div className="container space-y-8">
                <header>
                    <h1 style={{ color: BRAND.slate }}>Pricing</h1>
                    <p className="subtle">Three simple options—no surprises.</p>
                </header>

                {/* Plan pills */}
                <div className="card" style={{ display: "grid", gap: 14 }}>
                    <label className="block">
                        <div className="label">Choose a plan</div>
                        <div className="pill-group" role="tablist" aria-label="Plan">
                            {(["hourly", "monthly", "semester"] as Plan[]).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    role="tab"
                                    aria-selected={plan === p}
                                    className={`pill ${plan === p ? "is-active" : ""}`}
                                    onClick={() => setPlan(p)}
                                >
                                    {LABEL[p]}
                                </button>
                            ))}
                        </div>
                    </label>
                </div>

                {/* Plan cards */}
                <div className="grid-2">
                    <article className="card" aria-label="Hourly plan">
                        <h3 style={{ marginTop: 0 }}>Hourly</h3>
                        <p className="subtle">Best for short stops</p>
                        <div className="summary-total">
                            <span>Rate</span>
                            <strong>${PRICE.hourly.toFixed(2)}/hr (metered)</strong>
                        </div>
                        <Link href="/book" className="btn btn-primary" style={{ marginTop: 10 }}>
                            Book Hourly
                        </Link>
                        <p className="hint" style={{ marginTop: 8 }}>
                            Time is tracked automatically. Late policy: $10 after 24h; items moved to Lost &amp; Found.
                        </p>
                    </article>

                    <article className="card" aria-label="Monthly plan">
                        <h3 style={{ marginTop: 0 }}>Monthly</h3>
                        <p className="subtle">Great for regular use</p>
                        <div className="summary-total">
                            <span>Price</span>
                            <strong>${PRICE.monthly.toFixed(2)}/mo</strong>
                        </div>
                        <Link href="/book" className="btn btn-primary" style={{ marginTop: 10 }}>
                            Start Monthly
                        </Link>
                    </article>
                </div>

                <div className="grid-2">
                    <article className="card" aria-label="Semester plan">
                        <h3 style={{ marginTop: 0 }}>Semester</h3>
                        <p className="subtle">One payment for the term</p>
                        <div className="summary-total">
                            <span>Price</span>
                            <strong>${PRICE.semester.toFixed(2)} / semester</strong>
                        </div>
                        <Link href="/book" className="btn btn-primary" style={{ marginTop: 10 }}>
                            Start Semester
                        </Link>
                    </article>

                    {/* Estimator / CTA */}
                    <aside className="card" style={{ display: "grid", gap: 10 }}>
                        <h3 style={{ margin: 0 }}>Estimated total</h3>
                        <div className="summary-row">
                            <span>Plan</span>
                            <strong>{LABEL[plan]}</strong>
                        </div>

                        <div className="summary-total" style={{ fontSize: 18 }}>
                            <span>Total</span>
                            <strong>
                                {plan === "hourly"
                                    ? "$4.00/hr (metered)"
                                    : plan === "monthly"
                                        ? `$${PRICE.monthly.toFixed(2)}`
                                        : `$${PRICE.semester.toFixed(2)}`}
                            </strong>
                        </div>

                        <Link href="/book" className="btn btn-primary">
                            Continue to Booking
                        </Link>
                        <p className="hint">
                            {plan === "hourly"
                                ? "Billed by time used; final amount shown at checkout."
                                : "Final price shown at checkout. Taxes/fees may apply."}
                        </p>
                    </aside>
                </div>
            </div>
        </section>
    );
}
