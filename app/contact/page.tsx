"use client";
import { useState } from "react";

type SendState = "idle" | "sending" | "ok" | "error";
type IssueState = "idle" | "sending" | "ok" | "error";

const LOKA_PHONE = "619-616-6828";
const LOKA_EMAIL = "aj3brac@gmail.com";

// ⛳️ TODO: replace with your American Locker vendor contacts
const AMLOCKER_PHONE = "800-000-0000";
const AMLOCKER_EMAIL = "support@americanlocker.example.com";

// ⛳️ Optional public status page (set in .env.local as NEXT_PUBLIC_STATUS_URL)
const STATUS_URL =
    process.env.NEXT_PUBLIC_STATUS_URL || "/always-on";

export default function ContactPage() {
    // main message form
    const [status, setStatus] = useState<SendState>("idle");
    const [error, setError] = useState("");

    // issue report form
    const [issueState, setIssueState] = useState<IssueState>("idle");
    const [issueErr, setIssueErr] = useState("");

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
            // timestamp captured server-side too
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
            setIssueErr(err?.message || "Couldn’t submit the issue. Please try again.");
        }
    }

    return (
        <div style={{ background: "#f3f5f4" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 16px" }}>
                <h1
                    style={{
                        textAlign: "center",
                        fontFamily: "Georgia, 'Times New Roman',serif",
                        letterSpacing: ".5px",
                        fontWeight: 700,
                        fontSize: 32,
                        margin: "6px 0 22px",
                        color: "#24423d",
                    }}
                >
                    CONTACT US
                </h1>

                {/* Grid: left = form, right = immediate help */}
                <div className="grid-2">
                    {/* --- LEFT: Send Message --- */}
                    <div
                        className="card"
                        style={{
                            background: "#fff",
                            border: "1px solid #d8e0dd",
                            borderRadius: 10,
                            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
                            padding: 18,
                            display: "grid",
                            gap: 8,
                        }}
                    >
                        <h3
                            style={{
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 18,
                                margin: "8px 0 8px",
                                color: "#24423d",
                            }}
                        >
                            Send Message
                        </h3>

                        <form onSubmit={onSubmit} noValidate>
                            <label
                                htmlFor="name"
                                style={{ display: "block", fontSize: 12, margin: "0 0 6px", color: "#6b7a75" }}
                            >
                                Name
                            </label>
                            <input id="name" name="name" type="text" placeholder="" style={inputStyle} />

                            <label
                                htmlFor="email"
                                style={{ display: "block", fontSize: 12, margin: "14px 0 6px", color: "#6b7a75" }}
                            >
                                Email*
                            </label>
                            <input id="email" name="email" type="email" required style={inputStyle} />

                            <label
                                htmlFor="message"
                                style={{ display: "block", fontSize: 12, margin: "14px 0 6px", color: "#6b7a75" }}
                            >
                                Message*
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                style={{ ...inputStyle, resize: "vertical" }}
                            />

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="btn btn-primary"
                                style={{ marginTop: 16, width: "100%" }}
                            >
                                {status === "sending" ? "SENDING..." : "SEND"}
                            </button>

                            <p style={{ marginTop: 12, fontSize: 12, color: "#8a988f", textAlign: "center" }}>
                                This site may be protected by reCAPTCHA and the Google&nbsp;Privacy&nbsp;Policy and
                                Terms&nbsp;of&nbsp;Service apply.
                            </p>

                            {status === "ok" && (
                                <p style={{ marginTop: 10, color: "#0f8a5f", textAlign: "center" }}>
                                    Thanks! Your message has been sent.
                                </p>
                            )}
                            {status === "error" && (
                                <p style={{ marginTop: 10, color: "#b3002d", textAlign: "center" }}>{error}</p>
                            )}
                        </form>
                    </div>

                    {/* --- RIGHT: Immediate help + after-hours --- */}
                    <aside className="stack-col">
                        <div className="card" style={{ display: "grid", gap: 10 }}>
                            <h3 style={{ margin: 0 }}>Immediate help (24/7)</h3>

                            <div className="note-callout" role="note" aria-label="Urgent steps">
                                <div style={{ fontWeight: 700 }}>Can’t access a locker right now?</div>
                                <ul className="feature-list" style={{ marginTop: 4 }}>
                                    <li>If you’re at the bank: stay nearby for staff to find you.</li>
                                    <li>Note the <strong>Locker Bank ID</strong> and <strong>Locker #</strong> (on the door or screen).</li>
                                    <li>Call us, then file the quick report below so we have the exact unit.</li>
                                </ul>
                            </div>

                            <div style={{ display: "grid", gap: 8 }}>
                                <div className="card" style={{ display: "grid", gap: 6 }}>
                                    <div style={{ fontWeight: 700 }}>Loka Technology Support</div>
                                    <div>
                                        Phone:{" "}
                                        <a href={`tel:${LOKA_PHONE.replace(/[^0-9]/g, "")}`} className="underlinedText">
                                            {LOKA_PHONE}
                                        </a>
                                        {" · "}
                                        Email:{" "}
                                        <a href={`mailto:${LOKA_EMAIL}`} className="underlinedText">
                                            {LOKA_EMAIL}
                                        </a>
                                    </div>
                                    <div className="text-muted" style={{ fontSize: 14 }}>
                                        After-hours calls are routed to on-call.
                                    </div>
                                </div>

                                <div className="card" style={{ display: "grid", gap: 6 }}>
                                    <div style={{ fontWeight: 700 }}>American Locker (OEM) Support</div>
                                    <div>
                                        Phone:{" "}
                                        <a href={`tel:${AMLOCKER_PHONE.replace(/[^0-9]/g, "")}`} className="underlinedText">
                                            {AMLOCKER_PHONE}
                                        </a>
                                        {" · "}
                                        Email:{" "}
                                        <a href={`mailto:${AMLOCKER_EMAIL}`} className="underlinedText">
                                            {AMLOCKER_EMAIL}
                                        </a>
                                    </div>
                                    <div className="text-muted" style={{ fontSize: 14 }}>
                                        Vendor hotline for hardware/firmware escalations. {/* replace with real details */}
                                    </div>
                                </div>

                                <div className="card" style={{ display: "grid", gap: 6 }}>
                                    <div style={{ fontWeight: 700 }}>System status</div>
                                    <a href={STATUS_URL} className="btn btn-outline" target="_blank">
                                        View status & past incidents
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick issue report */}
                        <div className="card" style={{ display: "grid", gap: 10 }}>
                            <h3 style={{ margin: 0 }}>Report a locker issue</h3>
                            <form onSubmit={submitIssue}>
                                <label className="label" htmlFor="issue-email">Your email*</label>
                                <input id="issue-email" name="email" type="email" required style={inputStyle} />

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                    <div>
                                        <label className="label" htmlFor="campus">Campus</label>
                                        <input id="campus" name="campus" type="text" placeholder="e.g., Tempe" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="label" htmlFor="building">Building</label>
                                        <input id="building" name="building" type="text" placeholder="e.g., Hayden Library" style={inputStyle} />
                                    </div>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                                    <div>
                                        <label className="label" htmlFor="bankId">Locker Bank ID*</label>
                                        <input id="bankId" name="bankId" type="text" required placeholder="e.g., ASU-HAY-LB-02" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="label" htmlFor="lockerNo">Locker #*</label>
                                        <input id="lockerNo" name="lockerNo" type="text" required placeholder="e.g., 27" style={inputStyle} />
                                    </div>
                                </div>

                                <label className="label" htmlFor="category" style={{ marginTop: 10 }}>Issue type*</label>
                                <select id="category" name="category" required style={{ ...inputStyle, background: "#fff" }}>
                                    <option value="">Select an issue…</option>
                                    <option value="door-stuck">Door won’t open / stuck</option>
                                    <option value="screen-offline">Screen/terminal offline</option>
                                    <option value="power-outage">Power outage</option>
                                    <option value="payment">Payment / receipt problem</option>
                                    <option value="other">Other</option>
                                </select>

                                <label className="label" htmlFor="notes" style={{ marginTop: 10 }}>Notes</label>
                                <textarea id="notes" name="notes" rows={4} style={{ ...inputStyle, resize: "vertical" }} />

                                <button
                                    type="submit"
                                    disabled={issueState === "sending"}
                                    className="btn btn-primary"
                                    style={{ width: "100%", marginTop: 12 }}
                                >
                                    {issueState === "sending" ? "Submitting…" : "Submit issue"}
                                </button>

                                {issueState === "ok" && (
                                    <p style={{ marginTop: 10, color: "#0f8a5f", textAlign: "center" }}>
                                        Thanks! We’ve logged your report.
                                    </p>
                                )}
                                {issueState === "error" && (
                                    <p style={{ marginTop: 10, color: "#b3002d", textAlign: "center" }}>{issueErr}</p>
                                )}
                            </form>
                            <p className="hint" style={{ marginTop: 6 }}>
                                Tip: a photo of the screen/locker label speeds things up—attach it when we reply.
                            </p>
                        </div>

                        {/* Friendly footer help */}
                        <div style={{ textAlign: "center", marginTop: 8, color: "#51615b" }}>
                            <p style={{ fontWeight: 600 }}>Let us help!</p>
                            <p style={{ fontSize: 14 }}>
                                Prefer phone? Call{" "}
                                <a href={`tel:${LOKA_PHONE.replace(/[^0-9]/g, "")}`} style={{ color: "#24423d", fontWeight: 600 }}>
                                    {LOKA_PHONE}
                                </a>{" "}
                                or email{" "}
                                <a href={`mailto:${LOKA_EMAIL}`} style={{ color: "#24423d", fontWeight: 600 }}>
                                    {LOKA_EMAIL}
                                </a>.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    background: "#eef3f1",
    border: "1px solid #d3ddd9",
    borderRadius: 6,
    outline: "none",
};
