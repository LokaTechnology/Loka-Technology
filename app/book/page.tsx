"use client";
import { useMemo, useState } from "react";

type Plan = "hourly" | "monthly" | "semester";
type Size = "small" | "medium" | "large";

export default function Book() {
  const [plan, setPlan] = useState<Plan>("hourly");
  const [size, setSize] = useState<Size>("small");
  const [hours, setHours] = useState<number>(2); 
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Optional display-only pricing (keep in sync with server)
  const unitPrices = {
    small: 150,   // $1.50/hr in cents
    medium: 250,  // $2.50/hr
    large: 400,   // $4.00/hr
  };

  const hourlyPreview = useMemo(() => {
    if (plan !== "hourly" || !hours || hours < 1) return null;
    const cents = unitPrices[size] * hours;
    return (cents / 100).toFixed(2);
  }, [plan, size, hours]);

  async function checkout() {
    setError(null);
    setLoading(true);
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ plan, size, hours: plan === "hourly" ? hours : undefined, email }),
      });
      const data = await r.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Checkout failed");
      }
    } catch (e: any) {
      setError(e?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-semibold">Book a Locker</h1>

      <div className="space-y-4 rounded-2xl border border-white/15 p-5">
        {/* Plan */}
        <label className="block">
          <span className="block mb-1">Plan</span>
          <div className="grid grid-cols-3 gap-2">
            {(["hourly","monthly","semester"] as Plan[]).map(p => (
              <button
                key={p}
                type="button"
                onClick={()=>setPlan(p)}
                className={`rounded-xl border px-3 py-2 text-sm capitalize ${
                  plan === p ? "border-white/80" : "border-white/20 opacity-80 hover:opacity-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </label>

        {/* Size */}
        <label className="block">
          <span className="block mb-1">Locker Size</span>
          <select
            value={size}
            onChange={e=>setSize(e.target.value as Size)}
            className="w-full bg-transparent border border-white/20 rounded-xl p-3"
          >
            <option value="small">Small – best for notebooks</option>
            <option value="medium">Medium – backpacks</option>
            <option value="large">Large – gear & instruments</option>
          </select>
        </label>

        {/* Hours (only when hourly) */}
        {plan === "hourly" && (
          <label className="block">
            <span className="block mb-1">Hours (no cap)</span>
            <input
              type="number"
              min={1}
              value={Number.isFinite(hours) ? hours : 1}
              onChange={e => {
                const v = e.target.value === "" ? NaN : parseInt(e.target.value, 10);
                setHours(Number.isNaN(v) ? 1 : v);
              }}
              className="w-full bg-transparent border border-white/20 rounded-xl p-3"
            />
            <p className="mt-1 text-xs text-white/60">
              Enter any number of hours you need. There’s no maximum.
              {hourlyPreview && <span className="ml-1">Estimated: ${hourlyPreview}</span>}
            </p>
          </label>
        )}

        {/* Email */}
        <label className="block">
          <span className="block mb-1">Email for receipt</span>
          <input
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="you@asu.edu"
            className="w-full bg-transparent border border-white/20 rounded-xl p-3"
          />
        </label>

        {/* Submit */}
        <button
          onClick={checkout}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 font-medium text-black hover:bg-emerald-400 disabled:opacity-60"
        >
          {loading ? "Creating checkout..." : "Proceed to Checkout"}
        </button>
        <p className="text-xs text-white/60">You’ll be redirected to Stripe Checkout.</p>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>

      {/* Plan notes */}
      <div className="rounded-2xl border border-white/10 p-4 text-sm text-white/80 space-y-2">
        <p><strong>Hourly:</strong> Pay-as-you-go. No cap on hours. Charged once based on the hours you choose.</p>
        <p><strong>Monthly:</strong> Recurring monthly subscription until you cancel.</p>
        <p><strong>Semester:</strong> Recurring subscription set to your school’s semester duration (you can cancel anytime).</p>
      </div>
    </div>
  );
}
