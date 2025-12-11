
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LinkGoogle({ isConnected }: { isConnected: boolean }) {
    const [msg, setMsg] = useState<string | null>(null);

    async function disconnect() {
        setMsg(null);
        const r = await fetch("/api/account/disconnect/google", { method: "POST" });
        const data = await r.json();
        setMsg(r.ok ? "Google disconnected." : data?.error || "Failed to disconnect");
    }

    return (
        <div className="grid gap-3">
            <div>Google: <strong>{isConnected ? "Connected" : "Not connected"}</strong></div>
            {isConnected ? (
                <button className="btn btn-outline" onClick={disconnect}>Disconnect Google</button>
            ) : (
                <button className="btn btn-outline" onClick={() => signIn("google", { callbackUrl: "/account/settings" })}>
                    Connect Google
                </button>
            )}
            {msg && <p className={msg.includes("disconnected") ? "" : "error"}>{msg}</p>}
        </div>
    );
}
