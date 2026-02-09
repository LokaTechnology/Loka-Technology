"use client";
import { useState } from "react";

type IssueState = "idle" | "sending" | "ok" | "error";

export default function IssueReportForm() {
  const [issueState, setIssueState] = useState<IssueState>("idle");
  const [issueErr, setIssueErr] = useState("");

  async function submitIssue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIssueState("sending");
    setIssueErr("");

    const form = new FormData(e.currentTarget);
    const payload = {
      email: form.get("email")?.toString().trim(),
      campus: form.get("campus")?.toString().trim(),
      building: form.get("building")?.toString().trim(),
      bankId: form.get("bankId")?.toString().trim(),
      lockerNo: form.get("lockerNo")?.toString().trim(),
      category: form.get("category")?.toString(),
      notes: form.get("notes")?.toString().trim(),
    };

    if (!payload.email || !payload.bankId || !payload.lockerNo || !payload.category) {
      setIssueState("error");
      setIssueErr("Email, bank ID, locker #, and issue type are required.");
      return;
    }

    try {
      const res = await fetch("/api/report-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error(await res.text());
      
      setIssueState("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setIssueState("error");
      setIssueErr(err?.message || "Couldn't submit the issue. Please try again.");
    }
  }

  return (
    <div className="info-card">
      <h3 className="info-card-title">Report a Locker Issue</h3>
      
      <form onSubmit={submitIssue} className="issue-form">
        <div className="form-group">
          <label htmlFor="issue-email" className="form-label required">
            Your email
          </label>
          <input
            id="issue-email"
            name="email"
            type="email"
            className="form-input"
            placeholder="your.email@university.edu"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="campus" className="form-label">
              Campus
            </label>
            <input
              id="campus"
              name="campus"
              type="text"
              className="form-input"
              placeholder="e.g., Tempe"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="building" className="form-label">
              Building
            </label>
            <input
              id="building"
              name="building"
              type="text"
              className="form-input"
              placeholder="e.g., Hayden Library"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bankId" className="form-label required">
              Locker Bank ID
            </label>
            <input
              id="bankId"
              name="bankId"
              type="text"
              className="form-input"
              placeholder="e.g., ASU-HAY-LB-02"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lockerNo" className="form-label required">
              Locker #
            </label>
            <input
              id="lockerNo"
              name="lockerNo"
              type="text"
              className="form-input"
              placeholder="e.g., 27"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label required">
            Issue type
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            required
          >
            <option value="">Select an issue…</option>
            <option value="door-stuck">Door won't open / stuck</option>
            <option value="screen-offline">Screen/terminal offline</option>
            <option value="power-outage">Power outage</option>
            <option value="payment">Payment / receipt problem</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes" className="form-label">
            Additional notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="form-textarea"
            placeholder="Describe what happened..."
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={issueState === "sending"}
          className="btn btn-primary form-submit"
        >
          {issueState === "sending" ? "SUBMITTING..." : "SUBMIT ISSUE"}
        </button>

        {issueState === "ok" && (
          <div className="form-message success">
            ✓ Thanks! We've logged your report.
          </div>
        )}
        
        {issueState === "error" && (
          <div className="form-message error">
            {issueErr}
          </div>
        )}
      </form>

      <p className="issue-hint">
        💡 Tip: A photo of the screen/locker label speeds things up—attach it when we reply.
      </p>
    </div>
  );
}