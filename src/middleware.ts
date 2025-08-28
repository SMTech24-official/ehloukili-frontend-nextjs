/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface DecodedToken {
  role?: string;
  [key: string]: any;
}

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("auth_token")?.value;

  const loginUrl = new URL("/auth/login", request.url);

  const roleBasedAccess: Record<string, string[]> = {
    "/submit-property": ["user", "agent", "admin"],
    "/user-dashboard/profile": ["user", "agent"],
    "/user-dashboard/:path*": ["user", "agent"],
    "/admin/:path*": ["admin"],
    "/agent/:path*": ["user", "agent"]
  };

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const user = jwtDecode<DecodedToken>(token as string);
    const { pathname } = request.nextUrl;

    const allowedRoles = Object.entries(roleBasedAccess)
      .filter(([path]) => pathname.startsWith(path))
      .flatMap(([_, roles]) => roles);

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role ?? "")) {
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// "Matching Paths"
export const config = {
  matcher: [
    "/submit-property",
    "/user-dashboard/profile",
    "/user-dashboard/:path*",
    "/admin/:path*",
    "/agent/:path*",
  ],
};
