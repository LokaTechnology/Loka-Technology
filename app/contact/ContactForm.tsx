"use client";
import { useState } from "react";

type SendState = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
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
      message: form.get("message")?.toString().trim(),
    };

    if (!payload.email || !payload.message) {
      setStatus("error");
      setError("Email and Message are required.");
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
      setError(err?.message || "Something went wrong. Please try again");
    }
  }

  return (
    <div className="contact-form-card">
      <h2 className="contact-form-title">Send us a Message</h2>

      <form onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label required">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="your.email@university.edu"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label required">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            placeholder="Tell us how we can help..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary form-submit"
        >
          {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
        </button>

        <p className="form-disclaimer">
          This site may be protected by reCAPTCHA and the Google Privacy Policy
          and Terms of Service apply.
        </p>

        {status === "ok" && (
          <div className="form-message success">
            ✓ Thanks! Your message has been sent.
          </div>
        )}
        
        {status === "error" && (
          <div className="form-message error">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}