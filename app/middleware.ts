import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth";

export async function middleware(req: Request) {
  const cookie = (req as any).cookies?.get?.("auth_session")?.value || (req.headers.get("cookie") ?? "").match(/auth_session=([^;]+)/)?.[1];
  if (!cookie) return NextResponse.redirect(new URL("/login", req.url));
  const { session } = await lucia.validateSession(cookie);
  if (!session) return NextResponse.redirect(new URL("/login", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/book/:path*", "/api/checkout"]
};
