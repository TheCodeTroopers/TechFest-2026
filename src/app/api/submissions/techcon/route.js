import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { getSessionUser, getSettings, findRegistration } from "@/lib/server";
import { isPast } from "@/lib/dates";

export const runtime = "nodejs";

const clean = (v) => (typeof v === "string" ? v.trim() : "");
const looksLikeUrl = (v) => /^https?:\/\/\S+\.\S+/i.test(v);

// Team leaders submit their paper and final PPT as links, up to each deadline.
export async function POST(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in to submit." }, { status: 401 });

  const registration = await findRegistration("techcon", user.email);
  if (!registration) {
    return NextResponse.json({ error: "Register a TechCon team first." }, { status: 404 });
  }

  const { kind, link } = await request.json().catch(() => ({}));
  if (!["paper", "ppt"].includes(kind)) {
    return NextResponse.json({ error: "Say whether this is the paper or the PPT." }, { status: 400 });
  }
  if (!looksLikeUrl(clean(link))) {
    return NextResponse.json(
      { error: "Paste a full link starting with https:// that is set to anyone-with-the-link." },
      { status: 400 }
    );
  }

  const settings = await getSettings();
  const deadline =
    kind === "paper" ? settings.techcon?.paperDeadline : settings.techcon?.pptDeadline;
  if (isPast(deadline)) {
    return NextResponse.json(
      { error: kind === "paper" ? "The paper deadline has passed." : "The PPT deadline has passed." },
      { status: 409 }
    );
  }

  await getAdminDb()
    .collection("registrations")
    .doc(registration.id)
    .update({
      [kind === "paper" ? "paperLink" : "pptLink"]: clean(link),
      [kind === "paper" ? "paperSubmittedAt" : "pptSubmittedAt"]: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

  return NextResponse.json({ ok: true });
}
