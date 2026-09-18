import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { getCompetition, THEMES } from "@/lib/competitions";
import { getSessionUser, getSettings, findRegistration } from "@/lib/server";
import { isPast } from "@/lib/dates";

export const runtime = "nodejs";

const clean = (v) => (typeof v === "string" ? v.trim() : "");
const looksLikeUrl = (v) => /^https?:\/\/\S+\.\S+/i.test(v);

export async function POST(request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in with your college email to register." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const competition = getCompetition(clean(body.competition));
  if (!competition) {
    return NextResponse.json({ error: "That competition does not exist." }, { status: 400 });
  }

  const settings = await getSettings();
  const deadline = settings[competition.slug]?.registrationDeadline;
  if (isPast(deadline)) {
    return NextResponse.json(
      { error: `Registration for ${competition.name} has closed.` },
      { status: 409 }
    );
  }

  const existing = await findRegistration(competition.slug, user.email);
  if (existing) {
    return NextResponse.json(
      { error: `You have already registered a team for ${competition.name}.` },
      { status: 409 }
    );
  }

  // --- team ---
  const teamLeaderName = clean(body.teamLeaderName);
  if (teamLeaderName.length < 2) {
    return NextResponse.json({ error: "Enter the team leader's full name." }, { status: 400 });
  }

  const teamName = clean(body.teamName);

  const members = (Array.isArray(body.members) ? body.members : [])
    .map((m) => ({ name: clean(m?.name), email: clean(m?.email).toLowerCase() }))
    .filter((m) => m.name.length > 0);

  const total = members.length + 1; // leader counts as a member
  if (total < competition.minMembers || total > competition.maxMembers) {
    return NextResponse.json(
      {
        error:
          competition.minMembers === competition.maxMembers
            ? `${competition.name} teams must have exactly ${competition.maxMembers} members.`
            : `${competition.name} teams can have ${competition.minMembers} to ${competition.maxMembers} members.`,
      },
      { status: 400 }
    );
  }

  const badEmail = members.find((m) => m.email && !/^\S+@\S+\.\S+$/.test(m.email));
  if (badEmail) {
    return NextResponse.json(
      { error: `"${badEmail.email}" is not a valid email address.` },
      { status: 400 }
    );
  }

  const doc = {
    competition: competition.slug,
    teamName: teamName || null,
    teamLeaderName,
    teamLeaderEmail: user.email,
    teamLeaderUid: user.uid,
    members,
    teamSize: total,
    status: "registered",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  // --- TechCon ---
  if (competition.slug === "techcon") {
    const theme = clean(body.theme);
    if (!THEMES.includes(theme)) {
      return NextResponse.json({ error: "Choose one of the seven themes." }, { status: 400 });
    }
    if (body.agreed !== true) {
      return NextResponse.json(
        { error: "Confirm that your team has read the paper and presentation guidelines." },
        { status: 400 }
      );
    }
    doc.theme = theme;
    doc.agreedToGuidelines = true;
    doc.paperLink = null;
    doc.pptLink = null;
  }

  // --- Web Dev Challenge ---
  if (competition.needsProjectLinks) {
    const gitLink = clean(body.gitLink);
    const driveVideoLink = clean(body.driveVideoLink);
    if (!looksLikeUrl(gitLink)) {
      return NextResponse.json(
        { error: "Add a full Git repository link starting with https://" },
        { status: 400 }
      );
    }
    if (!looksLikeUrl(driveVideoLink)) {
      return NextResponse.json(
        { error: "Add a full Google Drive video link starting with https://" },
        { status: 400 }
      );
    }
    doc.gitLink = gitLink;
    doc.driveVideoLink = driveVideoLink;
  }

  const ref = await getAdminDb().collection("registrations").add(doc);
  return NextResponse.json({ ok: true, id: ref.id });
}
