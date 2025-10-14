"use client"
import { useState } from "react"
export default function ContactPage(){
    const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
    const[error, setError] = useState<string>("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setStatus("sending");
        setError("");

        const form  = new FormData(e.currentTarget);
        const payload = {
            name: form.get("name")?.toString().trim(),
            email:form.get("email")?.toString().trim(),
            message:form.get("message")?.toString().trim(),

        };

        if(!payload.email || !payload.message){
            setStatus("error");
            setError("Email and Message are required.");
            return;
        }
        try{
            const res = await fetch("/api/contact",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });
            if(!res.ok) throw new Error(await res.text());
            setStatus("ok");
            (e.target as HTMLFormElement).reset();
        } catch (err:any){
            setStatus("error");
            setError(err?.message || "Something went wrong. Please try again");
        }
    }

    return (
        <div style = {{ background: "#f3f5f4"}}>
            <div style ={{maxWidth: 880, margin: "0 auto", padding: "36px 16px"}}>
                <h1 style ={{textAlign: "center", fontFamily:"Georgia, 'Times New Roman',serif ",
                letterSpacing: ".5px",
                fontWeight: 700,
                fontSize:32,
                margin: "6px 0 22px",
                color: "#24423d",
            }}>CONTACT US</h1>
            <div className="card"style = {{ background: "#fff", border: "1px solid #d8e0dd", borderRadius: 10, boxShadow: "0 1px 0 rgba(0,0,0,0.02)", padding:18, maxWidth: 880, margin:"0 auto",}}>
                <h3 style = {{textAlign: "center", fontWeight: 600, fontSize:18, margin: "8px 0 18px", color: "#24423d",}}>Send Message</h3>

                <form onSubmit={onSubmit} noValidate>
                    <label  htmlFor="name"
              style={{ display: "block", fontSize: 12, margin: "0 0 6px", color: "#6b7a75" }}
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder=""
              style={inputStyle}
            />

            {/* Email (required) */}
            <label
              htmlFor="email"
              style={{ display: "block", fontSize: 12, margin: "14px 0 6px", color: "#6b7a75" }}
            >
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              style={inputStyle}
            />

            {/* Message (required) */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                marginTop: 16,
                width: "100%",
                padding: "12px 14px",
                borderRadius: 6,
                border: "none",
                background: "#24423d",
                color: "#fff",
                fontWeight: 700,
                letterSpacing: ".4px",
                cursor: "pointer",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              {status === "sending" ? "SENDING..." : "SEND"}
            </button>
            <p style={{ marginTop: 12, fontSize: 12, color: "#8a988f", textAlign: "center" }}>
              This site may be protected by reCAPTCHA and the Google&nbsp;Privacy&nbsp;Policy and
              Terms&nbsp;of&nbsp;Service apply.
            </p>

            {/* Status messages */}
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
        <div style={{ textAlign: "center", marginTop: 24, color: "#51615b" }}>
          <p style={{ fontWeight: 600 }}>Let us help!</p>
          <p style={{ fontSize: 14 }}>
            Prefer phone? Call <a href="tel:6196166828" style={{ color: "#24423d", fontWeight: 600 }}>619-616-6828</a>
            &nbsp;or email <a href="mailto:aj3brac@gmail.com" style={{ color: "#24423d", fontWeight: 600 }}>aj3brac@gmail.com</a>.
            </p>
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