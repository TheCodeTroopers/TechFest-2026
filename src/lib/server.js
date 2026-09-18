import { cookies } from "next/headers";
import { getAdminAuth, getAdminDb } from "./firebaseAdmin";
import { DEFAULT_SETTINGS, isCollegeEmail } from "./competitions";

export const SESSION_COOKIE = "fest_session";

/**
 * Reads the httpOnly session cookie and verifies it with Firebase Admin.
 * Returns null for anyone who is signed out, revoked, or off-domain.
 */
export async function getSessionUser() {
  const value = cookies().get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const decoded = await getAdminAuth().verifySessionCookie(value, true);
    const email = (decoded.email || "").toLowerCase();
    if (!isCollegeEmail(email)) return null;
    return {
      uid: decoded.uid,
      email,
      name: decoded.name || email.split("@")[0],
      picture: decoded.picture || null,
    };
  } catch {
    return null;
  }
}

/** admins/list -> { emails: [...] }, plus support for one doc per admin email. */
export async function isAdminEmail(email) {
  if (!email) return false;
  const lower = email.toLowerCase();
  try {
    const listDoc = await getAdminDb().collection("admins").doc("list").get();
    if (listDoc.exists) {
      const emails = (listDoc.data().emails || []).map((e) => String(e).toLowerCase());
      if (emails.includes(lower)) return true;
    }
    const byEmail = await getAdminDb().collection("admins").doc(lower).get();
    return byEmail.exists;
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) return { user: null, admin: false };
  return { user, admin: await isAdminEmail(user.email) };
}

/** Deadlines, falling back to the hardcoded defaults until admin saves once. */
export async function getSettings() {
  try {
    const snap = await getAdminDb().collection("settings").doc("deadlines").get();
    const stored = snap.exists ? snap.data() : {};
    const merged = {};
    for (const slug of Object.keys(DEFAULT_SETTINGS)) {
      merged[slug] = { ...DEFAULT_SETTINGS[slug], ...(stored[slug] || {}) };
    }
    return merged;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(next) {
  await getAdminDb().collection("settings").doc("deadlines").set(next, { merge: true });
}

export async function findRegistration(competition, email) {
  const snap = await getAdminDb()
    .collection("registrations")
    .where("competition", "==", competition)
    .where("teamLeaderEmail", "==", email.toLowerCase())
    .limit(1)
    .get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

export function serialise(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate?.().toISOString() || null,
    updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
  };
}
