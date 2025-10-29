"use client";
import { useEffect, useMemo, useState } from "react";

type Plan = "hourly" | "monthly" | "semester";
type Size = "small" | "medium" | "large";

type PriceMap = {
  monthly?: Record<Size, { cents: number; currency: string; interval: string }>;
  semester?: Record<Size, { cents: number; currency: string; interval: string }>;
};

export default function Book() {
  const [plan, setPlan]   = useState<Plan>("hourly");
  const [size, setSize]   = useState<Size>("small");
  const [hours, setHours] = useState<number>(2);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Hourly unit prices in cents (mirror your server constants)
  const hourlyUnit = { small: 150, medium: 250, large: 400 } as const;

  // Stripe subscription prices (fetched from server, so UI always matches backend)
  const [prices, setPrices] = useState<PriceMap>({});

  useEffect(() => {
    let mounted = true;
    fetch("/api/prices")
      .then(r => r.json())
      .then(d => mounted && setPrices(d))
      .catch(() => {/* swallow, UI just shows "—" */});
    return () => { mounted = false; };
  }, []);

  // --- Previews ---
  const hourlyTotal = useMemo(() => {
    if (plan !== "hourly" || !hours || hours < 1) return null;
    return ((hourlyUnit[size] * hours) / 100).toFixed(2);
  }, [plan, size, hours]);

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
        body: JSON.stringify({ plan, size, hours: plan === "hourly" ? hours : undefined, email }),
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
              <div className="label">Plan</div>
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

            {/* Size */}
            <label className="block">
              <div className="label">Locker Size</div>
              <select
                value={size}
                onChange={(e)=>setSize(e.target.value as Size)}
                className="form-input"
              >
                <option value="small">Small — best for notebooks</option>
                <option value="medium">Medium — backpacks</option>
                <option value="large">Large — gear & instruments</option>
              </select>
            </label>

            {/* Hours (hourly only) */}
            {plan === "hourly" && (
              <label className="block">
                <div className="label">Hours (no cap)</div>
                <input
                  type="number"
                  min={1}
                  value={Number.isFinite(hours) ? hours : 1}
                  onChange={(e) => {
                    const v = e.target.value === "" ? NaN : parseInt(e.target.value, 10);
                    setHours(Number.isNaN(v) ? 1 : v);
                  }}
                  className="form-input"
                  placeholder="e.g., 5"
                />
                <div className="hint">
                  Enter any number of hours you need. There’s no maximum.
                  {hourlyTotal && <strong className="ml-2">Estimated: ${hourlyTotal}</strong>}
                </div>
              </label>
            )}

            {/* Email */}
            <label className="block">
              <div className="label">Email for receipt</div>
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
                {loading ? "Creating checkout…" : "Proceed to Checkout"}
              </button>
              <span className="hint">You’ll be redirected to Stripe Checkout.</span>
            </div>

            {error && <p className="error">{error}</p>}
          </div>

          {/* ---------- RIGHT: Summary ---------- */}
          <aside className="card" style={{ display:"grid", gap:12 }}>
            <h3 style={{ margin:0 }}>Summary</h3>

            <div className="summary-row">
              <span>Plan</span>
              <strong className="value">{planLabel}</strong>
            </div>
            <div className="summary-row">
              <span>Size</span>
              <strong className="value">{size[0].toUpperCase() + size.slice(1)}</strong>
            </div>
            {plan === "hourly" && (
              <div className="summary-row">
                <span>Hours</span>
                <strong className="value">{hours}</strong>
              </div>
            )}

            {/* Totals */}
            {plan === "hourly" && (
              <div className="summary-total">
                <span>Estimated total</span>
                <strong className="value">${hourlyTotal ?? "—"}</strong>
              </div>
            )}
            {plan === "monthly" && (
              <div className="summary-total">
                <span>First month</span>
                <strong className="value">
                  {monthlyTotal ? `$${monthlyTotal}/mo` : "—"}
                </strong>
              </div>
            )}
            {plan === "semester" && (
              <div className="summary-total">
                <span>First charge</span>
                <strong className="value">
                  {semesterTotal ? `$${semesterTotal} / semester` : "—"}
                </strong>
              </div>
            )}

            <hr />
            <ul className="feature-list">
              <li>No cap on hourly bookings</li>
              <li>Secure smart lockers</li>
              <li>Cancel anytime (Monthly/Semester)</li>
              <li>Receipt emailed to you</li>
            </ul>
          </aside>
        </div>

        {/* Notes */}
        <div className="card text-muted" style={{ marginTop:16 }}>
          <p><strong>Hourly:</strong> One-time charge based on hours selected. No maximum.</p>
          <p><strong>Monthly:</strong> Recurring each month (amount shown above is the first month’s charge).</p>
          <p><strong>Semester:</strong> Recurring per semester (amount shown above is the first charge).</p>
        </div>
      </div>
    </section>
  );
}
