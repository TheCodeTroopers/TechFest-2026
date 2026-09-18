export const COLLEGE_DOMAIN = (
  process.env.NEXT_PUBLIC_COLLEGE_DOMAIN || "sode-edu.in"
).toLowerCase();

export const THEMES = [
  "Generative AI Applications",
  "Digital Twin Technology",
  "AI-Powered Robotics",
  "Edge AI Computing",
  "6G Wireless Communication",
  "Intelligent Manufacturing Systems",
  "AI-Based Predictive Maintenance",
];

// Defaults are only used the first time — once /admin saves the settings doc,
// Firestore is the source of truth and nothing here needs a redeploy.
export const DEFAULT_SETTINGS = {
  techcon: {
    registrationDeadline: "2026-10-12T23:59",
    paperDeadline: "2026-10-20T23:59",
    pptDeadline: "2026-10-24T23:59",
    eventDate: "2026-10-26T09:00",
  },
  "line-follower": {
    registrationDeadline: "2026-10-12T23:59",
    eventDate: "2026-10-27T09:00",
  },
  webdev: {
    registrationDeadline: "2026-10-12T23:59",
    eventDate: "2026-10-26T09:00",
  },
};

export const COMPETITIONS = {
  techcon: {
    slug: "techcon",
    name: "TechCon",
    kicker: "Paper presentation",
    cardImage: "/techcon.png",
    summary:
      "Pick one of seven themes, write an IEEE-format paper, and present it in six minutes.",
    minMembers: 2,
    maxMembers: 2,
    teamSizeLabel: "Exactly 2 members, including you",
    themes: THEMES,
    needsProjectLinks: false,
    hasShortlisting: false,
    acceptsSubmissions: true, // paper + PPT links are submitted on this site
    whatsappEnv: "NEXT_PUBLIC_WHATSAPP_TECHCON",
    deadlineFields: [
      { key: "registrationDeadline", label: "Registration closes" },
      { key: "paperDeadline", label: "Paper submission" },
      { key: "pptDeadline", label: "Final PPT" },
      { key: "eventDate", label: "Competition day" },
    ],
  },
  "line-follower": {
    slug: "line-follower",
    name: "Line Follower",
    kicker: "Robotics",
    cardImage: "/line_follower.png", 
    summary:
      "Build a fully autonomous bot that tracks a line and clears the course in the shortest time.",
    minMembers: 3,
    maxMembers: 3,
    teamSizeLabel: "Exactly 3 members, including you",
    themes: null,
    needsProjectLinks: false,
    hasShortlisting: false,
    acceptsSubmissions: false,
    whatsappEnv: "NEXT_PUBLIC_WHATSAPP_LINE_FOLLOWER",
    deadlineFields: [
      { key: "registrationDeadline", label: "Registration closes" },
      { key: "eventDate", label: "Competition day" },
    ],
  },
  webdev: {
    slug: "webdev",
    name: "Web Dev Challenge",
    kicker: "AI Web Experience Challenge",
    cardImage: "/webex.png", // ✅ Add this
    summary:
      "Reimagine an existing digital product with AI. Submit a repo and a demo video — shortlisted teams go through to the final round.",
    minMembers: 2,
    maxMembers: 2,
    teamSizeLabel: "Exactly 2 members, including you",
    themes: null,
    needsProjectLinks: true,
    hasShortlisting: true,
    acceptsSubmissions: false,
    whatsappEnv: "NEXT_PUBLIC_WHATSAPP_WEBDEV",
    deadlineFields: [
      { key: "registrationDeadline", label: "Registration closes" },
      { key: "eventDate", label: "Final demonstration" },
    ],
  },
};

export const COMPETITION_SLUGS = Object.keys(COMPETITIONS);

export function getCompetition(slug) {
  return COMPETITIONS[slug] || null;
}

export function isCollegeEmail(email) {
  return typeof email === "string" && email.toLowerCase().endsWith("@" + COLLEGE_DOMAIN);
}
