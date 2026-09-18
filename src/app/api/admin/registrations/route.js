import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { requireAdmin, serialise } from "@/lib/server";

export const runtime = "nodejs";

const ALLOWED_STATUS = ["registered", "shortlisted", "rejected"];

export async function GET() {
  const { admin } = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admins only." }, { status: 403 });

  const snap = await getAdminDb()
    .collection("registrations")
    .orderBy("createdAt", "desc")
    .get();

  return NextResponse.json(
    { registrations: snap.docs.map(serialise), fetchedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function PATCH(request) {
  const { admin, user } = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admins only." }, { status: 403 });

  const { id, status } = await request.json().catch(() => ({}));
  if (!id || !ALLOWED_STATUS.includes(status)) {
    return NextResponse.json({ error: "Send a registration id and a valid status." }, { status: 400 });
  }

  await getAdminDb().collection("registrations").doc(id).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: user.email,
  });

  return NextResponse.json({ ok: true });
}
