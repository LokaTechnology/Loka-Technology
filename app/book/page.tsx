"use client";
import { useState } from "react";

export default function Book() {
  const [size, setSize] = useState("small");
  const [hours, setHours] = useState(2);
  const [email, setEmail] = useState("");

  async function checkout() {
    const r = await fetch("/api/checkout", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ size, hours, email })
    });
    const data = await r.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || "Checkout failed");
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1>Book a Locker</h1>
      <div className="card space-y-4">
        <label className="block">
          <span className="block mb-1">Locker Size</span>
          <select value={size} onChange={e=>setSize(e.target.value)} className="w-full bg-transparent border border-white/20 rounded-xl p-3">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label className="block">
          <span className="block mb-1">Hours</span>
          <input type="number" min={1} max={24} value={hours} onChange={e=>setHours(parseInt(e.target.value||'1'))} className="w-full bg-transparent border border-white/20 rounded-xl p-3"/>
        </label>
        <label className="block">
          <span className="block mb-1">Email for receipt</span>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-transparent border border-white/20 rounded-xl p-3"/>
        </label>
        <button onClick={checkout} className="btn btn-primary">Proceed to Checkout</button>
        <p className="text-xs text-white/60">You’ll be redirected to Stripe Checkout.</p>
      </div>
    </div>
  );
}
