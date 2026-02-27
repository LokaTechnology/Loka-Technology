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

export default function PricingLeaner() {
    const [plan, setPlan] = useState<Plan>("monthly");

    return (
        <section className="section">
            <div className="container space-y-8">
                <header>
                    <h1 style={{ color: BRAND.slate }}>Pricing</h1>
                    <p className="subtle">Choose the access model that fits your locker usage.</p>
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
                        <Link href="/book" className="btn btn-primary" style={{ marginTop: 10 }}>
                            Book Hourly
                        </Link>
                        <p className="hint" style={{ marginTop: 8 }}>Time is tracked automatically.</p>
                    </article>

                    <article className="card" aria-label="Monthly plan">
                        <h3 style={{ marginTop: 0 }}>Monthly</h3>
                        <p className="subtle">Great for regular use</p>
                        <Link href="/book" className="btn btn-primary" style={{ marginTop: 10 }}>
                            Start Monthly
                        </Link>
                    </article>
                </div>

                <div className="grid-2">
                    <article className="card" aria-label="Semester plan">
                        <h3 style={{ marginTop: 0 }}>Semester</h3>
                        <p className="subtle">One payment for the term</p>
                        <Link href="/book" className="btn btn-primary" style={{ marginTop: 10 }}>
                            Start Semester
                        </Link>
                    </article>

                    {/* Estimator / CTA */}
                    <aside className="card" style={{ display: "grid", gap: 10 }}>
                        <h3 style={{ margin: 0 }}>Plan summary</h3>
                        <div className="summary-row">
                            <span>Plan</span>
                            <strong>{LABEL[plan]}</strong>
                        </div>

                        <div className="summary-total" style={{ fontSize: 18 }}>
                            <span>Service model</span>
                            <strong>Core Services</strong>
                        </div>

                        <Link href="/book" className="btn btn-primary">
                            Continue to Booking
                        </Link>
                        <p className="hint">Access details are confirmed during booking.</p>
                    </aside>
                </div>
            </div>
        </section>
    );
}
