import { THEMES } from "./competitions";

/**
 * Shared source of truth for every rule shown on the site: the register page
 * shows one competition's sections, /rulebook shows all three. Edit the text
 * here and both places update — nothing else needs to change.
 */
export const RULEBOOK = {
  techcon: {
    name: "TechCon 2026",
    subtitle: "Paper Presentation",
    facts: [
      { label: "Team size", value: "2 members" },
      { label: "Registration closes", value: "12 October 2026" },
      { label: "Paper submission", value: "20 October 2026" },
      { label: "Final PPT", value: "24 October 2026" },
      { label: "Competition day", value: "26 October 2026" },
    ],
    sections: [
      {
        title: "Team formation",
        items: [
          "Each team must consist of exactly 2 members.",
          "Participants can select one theme from the given list.",
        ],
      },
      {
        title: "Themes",
        items: THEMES,
      },
      {
        title: "Important deadlines",
        items: [
          "Registration deadline: 12 October 2026",
          "Paper submission deadline: 20 October 2026",
          "Final PPT submission: 24 October 2026",
          "TechCon competition: 26 October 2026",
        ],
      },
      {
        title: "Paper guidelines",
        items: [
          "The paper must be prepared in IEEE format.",
          "The submitted paper must be original and properly referenced.",
          "Plagiarism checking through the college library is mandatory for all participants.",
          "Participants must complete the plagiarism check before submitting the final paper.",
        ],
      },
      {
        title: "Presentation guidelines",
        items: [
          "Total time: 6 minutes per team — 5 minutes presentation, 1 minute Q&A.",
          "Both team members should take part in the presentation.",
          "Participants must submit the final PPT by the specified deadline.",
        ],
      },
    ],
  },

  "line-follower": {
    name: "Line Follower",
    subtitle: "Robotics Event",
    facts: [
      { label: "Team size", value: "3 members" },
      { label: "Competition day", value: "27 October 2026" },
      { label: "Duration", value: "7 hours" },
      { label: "Match length", value: "9 minutes per match" },
    ],
    sections: [
      {
        title: "Match duration",
        items: [
          "Total: 9 minutes per match.",
          "2 minutes — setup.",
          "2 minutes — technical timeout.",
          "2 minutes — buffer.",
          "3 minutes — race.",
        ],
      },
      {
        title: "Rules",
        items: [
          "Robots must be fully autonomous with no manual intervention during the race.",
          "The robot must follow a black line on a white track.",
          "Deviation from the track incurs a 5-second penalty per incident.",
          "The bot must complete the track within the 3-minute race limit.",
          "Manual interference results in disqualification, unless authorised by the referee.",
          "Referee or coordinator decisions on penalties and disqualification are final.",
        ],
      },
      {
        title: "Rounds",
        items: [
          "Round 1 — Knockout: bots race on a simple track; the fastest bots qualify for the final round.",
          "Round 2 — Final Judgment: qualified bots race on a more complex track, and results are based on overall performance and shortest adjusted time.",
        ],
      },
      {
        title: "Judgment criteria",
        items: [
          "Time taken — time required to complete the track.",
          "Accuracy — ability to consistently follow the designated line.",
          "Smoothness — stability and smoothness of the robot's trajectory.",
          "Penalties — deviations and exceeding the time limit affect the result.",
        ],
      },
      {
        title: "Penalties",
        items: [
          "Track deviation: +5 seconds per incident.",
          "Exceeding the 3-minute race limit: disqualification.",
          "Unauthorised manual intervention: disqualification.",
        ],
      },
      {
        title: "Winner determination",
        items: [
          "The bot with the shortest final or adjusted completion time in the Final Judgment Round is declared the winner, subject to applicable penalties and referee decisions.",
        ],
      },
    ],
  },

  webdev: {
    name: "Web Dev Challenge",
    subtitle: "AI Web Experience Challenge",
    facts: [
      { label: "Team size", value: "2 members" },
      { label: "Event duration", value: "7 days" },
      { label: "Mode", value: "Online / Offline / Hybrid" },
      { label: "Final demo", value: "5 minutes + Q&A" },
    ],
    sections: [
      {
        title: "About the challenge",
        items: [
          "A one-week innovation challenge to reimagine how people interact with existing digital products, services or platforms using modern technology and AI.",
          "This is not a traditional website-development competition — the goal is an experience that makes judges ask “why didn't this exist before?”",
          "Teams may take inspiration from existing products (Amazon, YouTube, Spotify, Instagram, Google Maps, Netflix, Airbnb, and similar) purely to understand the concept — they are not required to build for these platforms.",
        ],
      },
      {
        title: "The core challenge",
        items: [
          "Identify an existing product, service or digital experience and propose a meaningful new interaction, feature, workflow or experience that substantially improves or reimagines it.",
          "Example: instead of “build an Amazon clone,” explore “what if online shopping could show how a product fits into my actual lifestyle?”",
          "The final project should demonstrate original thinking, not simply AI bolted onto an existing website — a new interaction, workflow, or way of solving an overlooked problem.",
        ],
      },
      {
        title: "Team size and eligibility",
        items: [
          "Each team must consist of exactly 2 participants; each participant may belong to only one team and cannot submit multiple projects.",
          "Both members must make a meaningful contribution to the final project.",
          "Team composition is locked after the registration deadline — no member can be added or removed afterwards unless approved by the organising committee.",
          "Participants must provide accurate registration information; false information may lead to disqualification.",
        ],
      },
      {
        title: "Project originality",
        items: [
          "Submissions may use existing APIs, open-source libraries, frameworks, AI models, AI coding assistants, design tools, public datasets and cloud services — but the concept, integration and experience must be directed and developed by the team.",
          "Not allowed: copying another team's project, rebranding an existing product, submitting a previously completed project without substantial new development, or using someone else's work or code without permission.",
          "Participants must not simply clone an existing product; the submission must introduce a meaningful new experience. The judging panel has the final say on whether a project is sufficiently innovative.",
        ],
      },
      {
        title: "AI tools and disclosure",
        items: [
          "Any legally accessible AI tool, agent, model or coding assistant is allowed (ChatGPT, Claude, Gemini, GitHub Copilot, Cursor, Lovable, Replit, v0, Windsurf, and more) — this list is not exhaustive.",
          "Every team submits a short AI Usage Declaration: which tools/models were used, what the AI was used for, which components were AI-generated or AI-assisted, and what the team designed, modified, tested or integrated themselves.",
          "AI usage is not penalised, but teams must be able to explain what they built — judges may ask about architecture, model choices, what happens if the AI service fails, and what the team personally modified.",
        ],
      },
      {
        title: "Pre-built work and existing code",
        items: [
          "Before the challenge starts, teams may research, learn APIs/frameworks, brainstorm, sketch rough concepts, and set up development environments.",
          "Before the challenge starts, teams may not build the complete project, develop the core functionality, or prepare a finished prototype to submit as-is — substantial development must happen during the official challenge period.",
          "Open-source code, libraries and templates may be used where licences permit; teams must follow the licence, give attribution, and not claim third-party code as their own.",
          "Third-party APIs and services (AI APIs, Firebase, Supabase, cloud services, maps, payments, auth) are allowed; teams are responsible for complying with each service's terms and for their own usage costs unless organisers provide credits.",
        ],
      },
      {
        title: "Data, privacy and AI-generated media",
        items: [
          "Use data legally and responsibly: no private information without permission, no uploading another person's photo without consent, no exposing passwords, API keys or tokens, and no unauthorised confidential datasets.",
          "Prefer your own data, consent-based data, public data, licensed datasets or synthetic data.",
          "AI-generated images, video, voice, music and text are allowed, but must never be used to create deceptive or harmful content — realistic synthetic media that could be mistaken for a real person or event must be clearly labelled as AI-generated.",
        ],
      },
      {
        title: "Prohibited projects",
        items: [
          "No malware, viruses, spyware, credential theft, phishing systems, or hacking tools intended for illegal use.",
          "No systems designed to facilitate fraud, non-consensual deepfakes, hate or harassment tools, or illegal surveillance.",
          "No project that violates applicable law or a third party's intellectual property rights. The organising committee may reject any project it considers unsafe, illegal or inappropriate.",
        ],
      },
      {
        title: "Submission requirements",
        items: [
          "Each team submits exactly one final project, including: project and team name, member details, problem statement, explanation of the new experience, tech stack, AI tools/models used, AI Usage Declaration, working prototype, source code/repository, demo video and a deployment link where applicable.",
          "Idea-only submissions are not evaluated — the project must demonstrate a working prototype or meaningful functional implementation, though it does not need to be production-ready.",
        ],
      },
      {
        title: "Final demonstration",
        items: [
          "Each team gets 5 minutes to present: roughly 1 minute on the idea, 1 minute on what's different about the experience, 2 minutes of live demonstration, and 1 minute on the technology and AI behind it.",
          "A short Q&A follows the presentation. Exact timing may be adjusted by the organising committee depending on the number of teams.",
        ],
      },
      {
        title: "Judging criteria",
        items: [
          "Innovation & Originality — 30%",
          "User Experience & “Wow” Factor — 20%",
          "Technical Execution — 20%",
          "Effective Use of AI — 10%",
          "Functionality & Completeness — 10%",
          "Presentation & Demonstration — 10%",
        ],
      },
      {
        title: "The innovation standard",
        items: [
          "Ideas like “existing website + chatbot” or “+ recommendation system” or “+ dashboard” are not automatically disqualified, but are unlikely to score well without a genuinely new interaction.",
          "The strongest projects answer: “what can users do now that they could not meaningfully do before?”",
        ],
      },
      {
        title: "Fair play and verification",
        items: [
          "Do not share your project with another competing team before submission, copy another team's concept, collaborate on the core implementation with another team, or submit the same project under multiple names.",
          "The organising committee may request source code, commit history, or a live demonstration of specific functionality to verify ownership and understanding. A team that cannot reasonably demonstrate this may be penalised or disqualified.",
        ],
      },
      {
        title: "Intellectual property",
        items: [
          "IP in the project stays with the team, subject to the rights of any third-party software, APIs, datasets or assets used. Organisers do not automatically gain commercial ownership by accepting a submission.",
          "By participating, teams allow organisers to display, demonstrate, photograph and publish the project (name, screenshots, demo material) for non-commercial event promotion.",
        ],
      },
      {
        title: "Disqualification and conduct",
        items: [
          "Grounds for disqualification include plagiarism, copying another team's project, submitting substantially pre-built work, false information, misuse of AI-generated content or personal data, malicious software, harassment, and attempts to manipulate judging.",
          "All participants are expected to be professional and respectful toward participants, organisers, mentors and judges — serious misconduct can mean immediate removal from the event.",
        ],
      },
      {
        title: "Judging decisions and organiser's rights",
        items: [
          "The judging panel's decisions are final and binding. Ties are broken first on Innovation & Originality, then User Experience, then Technical Execution, then Functionality.",
          "The organising committee may modify the schedule, clarify or amend rules, reject an ineligible submission, or cancel/postpone the event under exceptional circumstances. Significant changes will be communicated to participants.",
        ],
      },
      {
        title: "Final principle",
        items: [
          "This competition is not about building the most complicated application — it is about building the most interesting experience.",
          "Don't just build another website. Reimagine what the experience could be.",
        ],
      },
    ],
  },
};

export function getRulebook(slug) {
  return RULEBOOK[slug] || null;
}
