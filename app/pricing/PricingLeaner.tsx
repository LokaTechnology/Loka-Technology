"use client";

import { useState } from "react";

type Deployment = "pilot" | "department" | "campus";

const LABEL: Record<Deployment, string> = {
  pilot: "Pilot Deployment",
  department: "Department-Level",
  campus: "Campus-Wide",
};

export default function PricingLeaner() {
  const [deployment, setDeployment] = useState<Deployment>("pilot");

  return (
    <section className="space-y-6">

        <header>
          <h2>Deployment Options</h2>
          <p className="subtle max-w-2xl">
            Loka offers flexible deployment models designed to support pilot
            testing, departmental rollouts, and full campus implementations.
          </p>
        </header>

        <div className="card">
          <div className="pill-group">
            {(Object.keys(LABEL) as Deployment[]).map((d) => (
              <button
                key={d}
                className={`pill ${deployment === d ? "is-active" : ""}`}
                onClick={() => setDeployment(d)}
              >
                {LABEL[d]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-2">
          {deployment === "pilot" && (
            <div className="card">
              <h3>Pilot Deployment</h3>
              <p>
                Short-term installation to validate usage patterns, operational
                impact, and stakeholder alignment. Includes monitoring,
                reporting, and evaluation support.
              </p>
            </div>
          )}

          {deployment === "department" && (
            <div className="card">
              <h3>Department-Level Deployment</h3>
              <p>
                Targeted rollout for specific facilities such as libraries,
                recreation centers, or academic buildings with centralized
                administrative oversight.
              </p>
            </div>
          )}

          {deployment === "campus" && (
            <div className="card">
              <h3>Campus-Wide Deployment</h3>
              <p>
                Scaled implementation across multiple locations with consistent
                access control, reporting, and support infrastructure.
              </p>
            </div>
          )}

          <div className="card">
            <h3>Next Steps</h3>
            <p className="subtle">
              Pricing is provided following a brief assessment of campus
              requirements and deployment scope.
            </p>
            <a href="/contact" className="btn btn-primary mt-3">
              Request Pricing
            </a>
          </div>
        </div>

    </section>
  );
}
