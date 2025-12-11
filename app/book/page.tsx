"use client";

import { useEffect, useMemo, useState } from "react";

type Plan = "hourly" | "monthly" | "semester";
type Size = "small" | "medium" | "large";

type PriceMap = {
    monthly?: Record<Size, { cents: number; currency: string; interval: string }>;
    semester?: Record<Size, { cents: number; currency: string; interval: string }>;
};

const SIZE_LABEL: Record<Size, string> = {
    small:  "Small • 12” × 15” × 18”",
    medium: "Medium • 15” × 18” × 24”",
    large:  "Large • 18” × 22” × 34”",
};

export default function Book() {
    const [plan, setPlan]   = useState<Plan>("hourly");
    const [size, setSize]   = useState<Size>("small");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);

    // Stripe subscription prices (fetched from server, so UI always matches backend)
    const [prices, setPrices] = useState<PriceMap>({});

    useEffect(() => {
        let mounted = true;
        fetch("/api/prices")
            .then(r => r.json())
            .then(d => mounted && setPrices(d))
            .catch(() => {});
        return () => { mounted = false; };
    }, []);

    const monthlyTotal = useMemo(() => {
        if (plan !== "monthly") return null;
        const cents = prices.monthly?.[size]?.cents;
        return typeof cents === "number" ? (cents / 100).toFixed(2) : null;
    }, [plan, size, prices]);

    const semesterTotal = useMemo(() => {
        if (plan !== "semester") return null;
        const cents = prices.semester?.[size]?.cents;
        return typeof cents === "number" ? (cents / 100).toFixed(2) : null;
    }, [plan, size, prices]);

    async function checkout() {
        setError(null);
        setLoading(true);
        try {
            const r = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // 🚫 no "hours" sent
                body: JSON.stringify({ plan, size, email }),
            });
            const data = await r.json();
            if (data?.url) window.location.href = data.url;
            else setError(data?.error || "Checkout failed");
        } catch (e: any) {
            setError(e?.message || "Checkout failed");
        } finally {
            setLoading(false);
        }
    }

    const planLabel = plan[0].toUpperCase() + plan.slice(1);

    return (
        <section className="section">
            <div className="container">
                <h1>Book a Locker</h1>

                <div className="grid-2">
                    {/* ---------- LEFT: Form ---------- */}
                    <div className="card" style={{ display:"grid", gap:16 }}>
                        {/* Plan */}
                        <label className="block">
                            <div className="label">Choose a plan</div>
                            <div className="pill-group" role="tablist" aria-label="Plan">
                                {(["hourly","monthly","semester"] as Plan[]).map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        role="tab"
                                        aria-selected={plan === p}
                                        className={`pill ${plan === p ? "is-active" : ""}`}
                                        onClick={() => setPlan(p)}
                                    >
                                        {p[0].toUpperCase() + p.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </label>

                        {/* Locker Size */}
                        <label className="block">
                            <div className="label">Locker Size</div>
                            <div className="pill-group" style={{ gridTemplateColumns: "repeat(3,minmax(0,1fr))" }}>
                                {(["small","medium","large"] as Size[]).map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`pill ${size === s ? "is-active" : ""}`}
                                        aria-pressed={size === s}
                                        onClick={() => setSize(s)}
                                        title={SIZE_LABEL[s]}
                                    >
                                        {s[0].toUpperCase() + s.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <p className="hint" style={{ marginTop: 6 }}>{SIZE_LABEL[size]}</p>
                        </label>

                        {/* Email (optional) */}
                        <label className="block">
                            <div className="label">Email for receipt (optional)</div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="form-input"
                                placeholder="you@asu.edu"
                            />
                        </label>

                        {/* Action */}
                        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                            <button onClick={checkout} disabled={loading} className="btn btn-primary">
                                {loading ? "Creating checkout…" : "Continue to Booking"}
                            </button>
                            {plan === "hourly" ? (
                                <span className="hint">Billed at <strong>$4/hr</strong>. Time is metered automatically.</span>
                            ) : (
                                <span className="hint">You’ll be redirected to Stripe Checkout.</span>
                            )}
                        </div>

                        {error && <p className="error">{error}</p>}
                    </div>

                    {/* ---------- RIGHT: Summary ---------- */}
                    <aside className="card" style={{ display:"grid", gap:12 }}>
                        <h3 style={{ margin:0 }}>Estimated total</h3>

                        <div className="summary-row">
                            <span>Plan</span>
                            <strong className="value">{planLabel}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Size</span>
                            <strong className="value">{size[0].toUpperCase() + size.slice(1)}</strong>
                        </div>

                        {/* Totals */}
                        {plan === "hourly" && (
                            <div className="summary-total">
                                <span>Rate</span>
                                <strong className="value">$4.00 / hr (metered)</strong>
                            </div>
                        )}
                        {plan === "monthly" && (
                            <div className="summary-total">
                                <span>First month</span>
                                <strong className="value">{monthlyTotal ? `$${monthlyTotal}/mo` : "—"}</strong>
                            </div>
                        )}
                        {plan === "semester" && (
                            <div className="summary-total">
                                <span>First charge</span>
                                <strong className="value">{semesterTotal ? `$${semesterTotal} / semester` : "—"}</strong>
                            </div>
                        )}

                        <hr />
                        <ul className="feature-list">
                            <li>No cap on hourly usage</li>
                            <li>Secure smart lockers</li>
                            <li>Cancel anytime (Monthly/Semester)</li>
                            <li>Receipt emailed to you</li>
                        </ul>

                        {plan === "hourly" && (
                            <p className="hint" style={{ marginTop: 8 }}>
                                Late policy: $10 fee after 24 hours; items moved to Lost &amp; Found.
                            </p>
                        )}
                    </aside>
                </div>

                {/* Notes */}
                <div className="card text-muted" style={{ marginTop:16 }}>
                    <p><strong>Hourly:</strong> Charged at $4/hr via metered billing. No hour selector—your time is tracked automatically.</p>
                    <p><strong>Monthly:</strong> Recurring each month (amount shown above is the first month’s charge).</p>
                    <p><strong>Semester:</strong> One payment per term (amount shown above is the first charge).</p>
                </div>
            </div>
        </section>
    );
}
