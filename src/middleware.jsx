import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("role")?.value?.toLowerCase();

  // ❌ لو مش مسجل دخول
  if (!token || !role) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  /**
   * 👑 ADMIN ROUTES
   */
  if (pathname.startsWith("/Admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  /**
   * 🧑‍💼 B2B AGENTS ROUTES
   */
  if (pathname.startsWith("/Agents")) {
    if (role !== "b2b") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  /**
   * 👤 B2C CLIENTS ROUTES
   */
  if (pathname.startsWith("/Client")) {
    if (role !== "b2c") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Admin/:path*",
    "/Agents/:path*",
    "/Client/:path*",
  ],
};