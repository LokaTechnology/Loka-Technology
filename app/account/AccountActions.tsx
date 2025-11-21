// app/account/AccountActions.tsx
"use client";
import { signOut } from "next-auth/react";

export default function AccountActions() {
    return (
        <button
            className="btn btn-outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            aria-label="Sign out"
        >
            Sign out
        </button>
    );
}
