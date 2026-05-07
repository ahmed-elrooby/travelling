import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("role")?.value;

  // 🚨 لو مش مسجل دخول
  if (!token || !role) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 👑 ADMIN
  if (pathname.startsWith("/Admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🧑‍💼 B2B Agents
  if (pathname.startsWith("/Agents") && role !== "b2b") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 👤 B2C Clients
  if (pathname.startsWith("/Client") && role !== "b2c") {
    return NextResponse.redirect(new URL("/", req.url));
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