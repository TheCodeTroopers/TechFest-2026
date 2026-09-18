import { NextResponse } from "next/server";

const SESSION_COOKIE = "fest_session";

// A cheap first gate only: the Edge runtime cannot verify a Firebase session
// cookie, so it just checks one is present. Every protected page re-verifies
// the cookie (and the admin allow-list) on the server before rendering.
export function middleware(request) {
  if (request.cookies.get(SESSION_COOKIE)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/register/:path*", "/submit/:path*"],
};
