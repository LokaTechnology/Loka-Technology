import { NextResponse } from "next/server";
import { z } from "zod";

// Optional: tiny in-memory throttle (per process) — replace with Upstash later
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX = 8;            // 8 req/min per ip

const ContactSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().email(),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
    const now = Date.now();
    const rec = hits.get(ip);
    if (!rec || now - rec.ts > WINDOW_MS) {
      hits.set(ip, { count: 1, ts: now });
    } else if (rec.count >= MAX) {
      return NextResponse.json({ ok: false, error: "Too many requests. Try again soon." }, { status: 429 });
    } else {
      rec.count++;
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
    }
    const { name, email, message } = parsed.data;

    // Log for observability
    console.log("Contact", { at: new Date().toISOString(), name, email, len: message.length });

    // Optional email via Resend (only if env set)
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Loka Website <no-reply@yourdomain.com>",
          to: [process.env.CONTACT_TO_EMAIL],
          subject: `New contact from ${name || email}`,
          text: `From: ${name || "(no name)"} <${email}>\n\n${message}`,
        }),
      });
      // Non-fatal if email service is down
      if (!res.ok) console.warn("Resend error", await res.text());
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
