"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Plug, Snowflake, ShieldCheck, Bell, Share2, Tag } from "lucide-react";

const BRAND = { slate: "#2F4F4F", green: "#1E7D4B", yellow: "#FFC606" } as const;

type Size = "small" | "medium" | "large" | "xl";
type Duration = "hourly" | "daily" | "weekly" | "monthly" | "semester" | "yearly";

const SIZE_LABEL: Record<Size, string> = {
  small: "Small • 12”×15”×18”",
  medium: "Medium • 15”×18”×24”",
  large: "Large • 18”×22”×34”",
  xl: "Extra-Large / Specialty",
};

const DURATION_LABEL: Record<Duration, string> = {
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  semester: "Semester",
  yearly: "Yearly",
};

/** Example price book (editable). Values are USD. */
const BASE_PRICE: Record<Duration, Record<Size, number>> = {
  hourly:  { small: 1.5,  medium: 2.5,  large: 4.0,  xl: 6.0 },
  daily:   { small: 8,    medium: 12,   large: 18,   xl: 26  },
  weekly:  { small: 25,   medium: 39,   large: 59,   xl: 85  },
  monthly: { small: 60,   medium: 89,   large: 129,  xl: 179 },
  semester:{ small: 160,  medium: 239,  large: 349,  xl: 489 },
  yearly:  { small: 300,  medium: 449,  large: 649,  xl: 899 },
};

/** Add-ons: per-booking for short terms, per-period for long terms */
const ADD_ONS = [
  { key: "power", label: "Power outlet", icon: Plug, short: 1, long: 3 },
  { key: "cold", label: "Refrigerated bay", icon: Snowflake, short: 3, long: 8 },
  { key: "ins",  label: "Item insurance", icon: ShieldCheck, short: 0.5, long: 1.5 },
  { key: "sms",  label: "SMS reminders", icon: Bell, short: 0.25, long: 0.5 },
  { key: "share",label: "Locker sharing", icon: Share2, short: 1, long: 1 },
] as const;

type AddKey = typeof ADD_ONS[number]["key"];

const LONG_TERMS: Duration[] = ["weekly", "monthly", "semester", "yearly"];

export default function PricingPage() {
  const [duration, setDuration] = useState<Duration>("monthly");
  const [size, setSize] = useState<Size>("medium");
  const [addons, setAddons] = useState<Record<AddKey, boolean>>({
    power: false, cold: false, ins: false, sms: false, share: false
  });

  const isLongTerm = LONG_TERMS.includes(duration);

  const est = useMemo(() => {
    const base = BASE_PRICE[duration][size];
    const addSum = ADD_ONS.reduce((sum, a) => {
      if (!addons[a.key]) return sum;
      const fee = isLongTerm ? a.long : a.short;
      return sum + fee;
    }, 0);
    return (base + addSum).toFixed(2);
  }, [duration, size, addons, isLongTerm]);

  function toggleAdd(key: AddKey) {
    setAddons(s => ({ ...s, [key]: !s[key] }));
  }

  return (
    <section className="section">
      <div className="container space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 style={{ color: BRAND.slate }}>Pricing</h1>
          <p className="subtle" style={{ maxWidth: 720 }}>
            Simple, flexible plans for students. Pick a duration, choose your locker size, and
            add optional features. No keys, no hassle—just secure, on-campus storage.
          </p>
        </header>

        {/* Pickers + Estimator */}
        <div className="grid-2">
          {/* Controls */}
          <div className="card" style={{ display: "grid", gap: 14 }}>
            {/* Duration */}
            <label className="block">
              <div className="label">Duration</div>
              <div className="pill-group" role="tablist" aria-label="Duration">
                {(["hourly","daily","weekly","monthly","semester","yearly"] as Duration[]).map(d => (
                  <button
                    key={d}
                    type="button"
                    role="tab"
                    aria-selected={duration === d}
                    className={`pill ${duration === d ? "is-active" : ""}`}
                    onClick={() => setDuration(d)}
                  >
                    {DURATION_LABEL[d]}
                  </button>
                ))}
              </div>
            </label>

            {/* Size */}
            <label className="block">
              <div className="label">Locker size</div>
              <div className="pill-group" style={{ gridTemplateColumns: "repeat(4,minmax(0,1fr))" }}>
                {(["small","medium","large","xl"] as Size[]).map(s => (
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

            {/* Add-ons */}
            <fieldset style={{ border: 0, padding: 0 }}>
              <legend className="label">Add-ons (optional)</legend>
              <div className="grid" style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
                {ADD_ONS.map(({ key, label, icon: Icon, short, long }) => {
                  const price = isLongTerm ? long : short;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleAdd(key)}
                      className="card"
                      style={{
                        display: "flex", alignItems: "center", gap: 10, padding: 10,
                        borderColor: addons[key] ? BRAND.green : "var(--line)",
                        boxShadow: addons[key] ? "0 0 0 3px rgba(30,125,75,.12)" : "0 4px 14px rgba(0,0,0,.06)"
                      }}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "rgba(47,79,79,.06)" }}>
                        <Icon size={16} />
                      </span>
                      <span style={{ fontWeight: 600 }}>{label}</span>
                      <span className="text-muted" style={{ marginLeft: "auto", fontSize: 13 }}>
                        +${price.toFixed(2)} {isLongTerm ? "/period" : "/booking"}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="hint" style={{ marginTop: 6 }}>
                “Period” = {duration === "weekly" ? "week" : duration === "yearly" ? "year" : duration}.
              </p>
            </fieldset>
          </div>

          {/* Estimator / CTA */}
          <aside className="card" style={{ display: "grid", gap: 12 }}>
            <h3 style={{ margin: 0, color: BRAND.slate }}>Estimated price</h3>
            <div className="summary-row"><span>Duration</span><strong>{DURATION_LABEL[duration]}</strong></div>
            <div className="summary-row"><span>Size</span><strong>{size.toUpperCase()}</strong></div>
            <div className="summary-row">
              <span>Add-ons</span>
              <strong>
                {Object.values(addons).some(Boolean)
                  ? ADD_ONS.filter(a => addons[a.key]).map(a => a.label).join(", ")
                  : "None"}
              </strong>
            </div>
            <div className="summary-total" style={{ fontSize: 18 }}>
              <span>Total this period</span>
              <strong>${est}</strong>
            </div>

            <Link href="/book" className="btn btn-primary" style={{ background: BRAND.slate }}>
              Book a Locker
            </Link>
            <p className="hint">Final price shown at checkout. Taxes/fees may apply.</p>

            {/* Promos */}
            <div className="rounded-2xl border" style={{ borderColor: "var(--line)", padding: 12, background: "rgba(255,198,6,.08)" }}>
              <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                <Tag size={16} />
                <strong>Student deals:</strong>&nbsp;10% off with .edu email. Back-to-School: first week free on monthly plans.
              </p>
            </div>
          </aside>
        </div>

        {/* Comparison grid */}
        <section className="card" style={{ display: "grid", gap: 16 }}>
          <h3 style={{ margin: 0, color: BRAND.slate }}>Compare what’s included</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={th()}>Plan</th>
                  <th style={th()}>Best for</th>
                  <th style={th()}>Typical use</th>
                  <th style={th()}>Add-ons allowed</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hourly / Daily", "Quick stops", "Gym/library sessions, visitors", true],
                  ["Weekly", "Projects & exams", "Club events, midterms", true],
                  ["Monthly", "Regular storage", "Dorm convenience, commuting", true],
                  ["Semester", "Academic term", "All-semester access", true],
                  ["Yearly", "Max savings", "Full academic year", true],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 ? "#fafafa" : "#fff" }}>
                    <td style={td()}>{row[0]}</td>
                    <td style={td()}>{row[1]}</td>
                    <td style={td()}>{row[2]}</td>
                    <td style={td(true)}>{row[3] ? <Check size={16} /> : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Notes & policies */}
        <section className="grid-2">
          <div className="card">
            <h3 style={{ marginTop: 0, color: BRAND.slate }}>Policies & late fees</h3>
            <ul className="feature-list">
              <li>Grace period: 15 minutes after expiry.</li>
              <li>Late fee: $2 + standard hourly rate per hour after grace.</li>
              <li>Cancel anytime on Monthly/Semester/Yearly plans (renews at end of period).</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0, color: BRAND.slate }}>Bundles & referrals</h3>
            <ul className="feature-list">
              <li>Bundle charging + large locker → save 10%.</li>
              <li>Refer a friend → both get $5 credit.</li>
              <li>Dynamic pricing during peak (move-in, finals) may apply.</li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}

/* ------- tiny style helpers (reuses your base CSS) ------- */
function th(): React.CSSProperties {
  return {
    textAlign: "left",
    padding: "10px 12px",
    borderBottom: "1px solid var(--line)",
    color: "#2F4F4F",
    fontWeight: 700,
    whiteSpace: "nowrap",
  };
}
function td(center = false): React.CSSProperties {
  return {
    padding: "10px 12px",
    borderBottom: "1px solid var(--line)",
    verticalAlign: "top",
    textAlign: center ? "center" : "left",
  };
}
