import { NextResponse } from "next/server";
import { requireAdmin, getSettings, saveSettings } from "@/lib/server";
import { COMPETITIONS } from "@/lib/competitions";

export const runtime = "nodejs";

export async function GET() {
  const { admin } = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admins only." }, { status: 403 });
  return NextResponse.json({ settings: await getSettings() }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request) {
  const { admin } = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admins only." }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const incoming = body.settings || {};
  const next = {};

  for (const [slug, comp] of Object.entries(COMPETITIONS)) {
    const block = incoming[slug];
    if (!block) continue;
    next[slug] = {};
    for (const field of comp.deadlineFields) {
      const value = block[field.key];
      if (typeof value !== "string" || !value) continue;
      if (Number.isNaN(new Date(value).getTime())) {
        return NextResponse.json(
          { error: `"${field.label}" for ${comp.name} is not a valid date.` },
          { status: 400 }
        );
      }
      next[slug][field.key] = value;
    }
  }

  await saveSettings(next);
  return NextResponse.json({ ok: true, settings: await getSettings() });
}
