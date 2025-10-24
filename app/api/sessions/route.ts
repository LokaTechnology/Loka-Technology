
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const { user } = await getSession();
  if (!user) return NextResponse.json({ loggedIn: false });
  return NextResponse.json({
    loggedIn: true,
    user: { id: user.id, email: user.email, name: user.name }
  });
}
