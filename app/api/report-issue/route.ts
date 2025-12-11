import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    // TODO: validate & persist — e.g., write to DB or forward to a helpdesk email/webhook
    // Minimal validation:
    const required = ["email", "bankId", "lockerNo", "category"];
    for (const k of required) {
        if (!body?.[k]) {
            return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
        }
    }


    return NextResponse.json({ ok: true });
}
