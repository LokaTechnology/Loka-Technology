"use client";

import { useState } from "react";

type SendState = "idle" | "sending" | "ok" | "error";

const LOKA_PHONE = "619-616-6828";
const LOKA_EMAIL = "andre@lokatechnology.com";
const STATUS_URL = process.env.NEXT_PUBLIC_STATUS_URL || "/always-on";

export default function ContactPage() {
  const [status, setStatus] = useState<SendState>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name")?.toString().trim(),
      email: form.get("email")?.toString().trim(),
      intent: form.get("intent")?.toString(),
      message: form.get("message")?.toString().trim(),
    };

    if (!payload.email || !payload.message) {
      setStatus("error");
      setError("Email and message are required.");
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
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        {/* Page header */}
        <h1 className="contact-title">Contact Us</h1>
        <p className="text-center subtle">
          Pilot requests, pricing inquiries, and operational support.
        </p>
        <p className="text-center subtle mt-2">
          Business inquiries:{" "}
          <a href={`mailto:${LOKA_EMAIL}`} className="underline">
            {LOKA_EMAIL}
          </a>
        </p>

        <div className="contact-grid mt-8">
          {/* LEFT — SALES / PILOT */}
          <div className="contact-form-card">
            <h2 className="contact-form-title">Request a Pilot / Contact Sales</h2>
            <p className="subtle text-center mb-4">
              For pilot deployments, pricing discussions, or general questions.
            </p>

            <form onSubmit={onSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="your.email@university.edu"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reason for contact</label>
                <select name="intent" className="form-select" defaultValue="pilot">
                  <option value="pilot">Request a Pilot</option>
                  <option value="pricing">Pricing Information</option>
                  <option value="integration">Integrations / IT Questions</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label required">Message</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your campus, use case, or timeline…"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary form-submit"
              >
                {status === "sending" ? "SENDING…" : "SEND REQUEST"}
              </button>

              <div className="text-center mt-4">
                <p className="subtle">Prefer to schedule a call?</p>
                <a
                  href="https://calendly.com/your-link-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline mt-2"
                >
                  Schedule a 15-min Intro Call
                </a>
              </div>

              {status === "ok" && (
                <div className="form-message success mt-4">
                  ✓ Thanks! We’ll be in touch shortly.
                </div>
              )}

              {status === "error" && (
                <div className="form-message error mt-4">{error}</div>
              )}
            </form>
          </div>

          {/* RIGHT — OPERATIONAL SUPPORT */}
          <div className="contact-sidebar">
            <div className="info-card">
              <h3 className="info-card-title">Operational Support</h3>
              <p className="subtle">
                For campuses with active locker deployments.
              </p>

              <div className="urgent-callout">
                <div className="urgent-callout-title">
                  🚨 Can’t access a locker right now?
                </div>
                <ul>
                  <li>Stay near the locker bank</li>
                  <li>Note the locker bank ID and locker number</li>
                  <li>Contact support below</li>
                </ul>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-label">Loka Technology Support</div>
                <div className="contact-info-details">
                  Phone:{" "}
                  <a href={`tel:${LOKA_PHONE.replace(/[^0-9]/g, "")}`}>
                    {LOKA_PHONE}
                  </a>
                  <br />
                  Email:{" "}
                  <a href={`mailto:${LOKA_EMAIL}`}>{LOKA_EMAIL}</a>
                </div>
              </div>

              <a
                href={STATUS_URL}
                className="btn btn-outline mt-4"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "100%" }}
              >
                View System Status
              </a>
            </div>

            <div className="contact-footer-help">
              <p className="contact-footer-help-title">We’re here to help</p>
              <p className="contact-footer-help-text">
                Call{" "}
                <a href={`tel:${LOKA_PHONE.replace(/[^0-9]/g, "")}`}>
                  {LOKA_PHONE}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${LOKA_EMAIL}`}>{LOKA_EMAIL}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
