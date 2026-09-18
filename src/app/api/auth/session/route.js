import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebaseAdmin";
import { isCollegeEmail, COLLEGE_DOMAIN } from "@/lib/competitions";
import { SESSION_COOKIE } from "@/lib/server";

export const runtime = "nodejs";

const FIVE_DAYS = 60 * 60 * 24 * 5 * 1000;

// Exchanges a Google ID token for an httpOnly session cookie.
export async function POST(request) {
  const { idToken } = await request.json().catch(() => ({}));
  if (!idToken) {
    return NextResponse.json({ error: "No sign-in token was sent." }, { status: 400 });
  }

  let decoded;
  try {
    decoded = await getAdminAuth().verifyIdToken(idToken, true);
  } catch {
    return NextResponse.json(
      { error: "That sign-in could not be verified. Try again." },
      { status: 401 }
    );
  }

  if (!isCollegeEmail(decoded.email)) {
    return NextResponse.json(
      { error: `Use your college email (@${COLLEGE_DOMAIN}) to sign in.` },
      { status: 403 }
    );
  }

  const cookie = await getAdminAuth().createSessionCookie(idToken, { expiresIn: FIVE_DAYS });
  const response = NextResponse.json({ ok: true, email: decoded.email.toLowerCase() });
  response.cookies.set(SESSION_COOKIE, cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: FIVE_DAYS / 1000,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
