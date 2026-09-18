// Deadlines are stored as ISO strings ("2026-10-12T23:59") so the admin form,
// Firestore and the browser all agree without timezone surprises.
const LONG = { day: "numeric", month: "short", year: "numeric" };
const WITH_TIME = { ...LONG, hour: "numeric", minute: "2-digit" };

export function toDate(value) {
  if (!value) return null;
  if (typeof value === "object" && typeof value.toDate === "function") return value.toDate();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(value, withTime = false) {
  const d = toDate(value);
  if (!d) return "To be announced";
  return d.toLocaleString("en-IN", withTime ? WITH_TIME : LONG);
}

export function isPast(value) {
  const d = toDate(value);
  return d ? d.getTime() < Date.now() : false;
}

export function daysLeft(value) {
  const d = toDate(value);
  if (!d) return null;
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}
