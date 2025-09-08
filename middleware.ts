import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // Not authenticated
  if (!sessionCookie) {
    // Is it a post request
    if (request.method === "POST") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    } else {
      const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;

      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", callbackUrl);

      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/component/:path*"]
};
