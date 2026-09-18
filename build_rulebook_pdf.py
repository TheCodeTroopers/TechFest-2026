from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem, PageBreak, HRFlowable
)
from reportlab.lib import colors

INK = colors.HexColor("#000000")
SIGNAL = colors.HexColor("#FFD60A")

styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    "TitleBig", parent=styles["Title"], fontSize=28, leading=32, spaceAfter=4,
)
subtitle_style = ParagraphStyle(
    "Subtitle", parent=styles["Normal"], fontSize=13, textColor=colors.HexColor("#444444"),
    spaceAfter=14,
)
comp_title_style = ParagraphStyle(
    "CompTitle", parent=styles["Heading1"], fontSize=22, spaceBefore=6, spaceAfter=2,
)
comp_subtitle_style = ParagraphStyle(
    "CompSubtitle", parent=styles["Normal"], fontSize=12,
    textColor=colors.HexColor("#555555"), spaceAfter=10,
)
fact_style = ParagraphStyle(
    "Fact", parent=styles["Normal"], fontSize=10.5, spaceAfter=2,
)
section_title_style = ParagraphStyle(
    "SectionTitle", parent=styles["Heading2"], fontSize=13.5, spaceBefore=12, spaceAfter=4,
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"], fontSize=10, leading=14, alignment=TA_LEFT,
)

RULEBOOK = {
    "techcon": {
        "name": "TechCon 2026",
        "subtitle": "Paper Presentation",
        "facts": [
            ("Team size", "2 members"),
            ("Registration closes", "12 October 2026"),
            ("Paper submission", "20 October 2026"),
            ("Final PPT", "24 October 2026"),
            ("Competition day", "26 October 2026"),
        ],
        "sections": [
            ("Team formation", [
                "Each team must consist of exactly 2 members.",
                "Participants can select one theme from the given list.",
            ]),
            ("Themes", [
                "Generative AI Applications",
                "Digital Twin Technology",
                "AI-Powered Robotics",
                "Edge AI Computing",
                "6G Wireless Communication",
                "Intelligent Manufacturing Systems",
                "AI-Based Predictive Maintenance",
            ]),
            ("Important deadlines", [
                "Registration deadline: 12 October 2026",
                "Paper submission deadline: 20 October 2026",
                "Final PPT submission: 24 October 2026",
                "TechCon competition: 26 October 2026",
            ]),
            ("Paper guidelines", [
                "The paper must be prepared in IEEE format.",
                "The submitted paper must be original and properly referenced.",
                "Plagiarism checking through the college library is mandatory for all participants.",
                "Participants must complete the plagiarism check before submitting the final paper.",
            ]),
            ("Presentation guidelines", [
                "Total time: 6 minutes per team \u2014 5 minutes presentation, 1 minute Q&A.",
                "Both team members should take part in the presentation.",
                "Participants must submit the final PPT by the specified deadline.",
            ]),
        ],
    },
    "line-follower": {
        "name": "Line Follower",
        "subtitle": "Robotics Event",
        "facts": [
            ("Team size", "3 members"),
            ("Competition day", "27 October 2026"),
            ("Duration", "7 hours"),
            ("Match length", "9 minutes per match"),
        ],
        "sections": [
            ("Match duration", [
                "Total: 9 minutes per match.",
                "2 minutes \u2014 setup.",
                "2 minutes \u2014 technical timeout.",
                "2 minutes \u2014 buffer.",
                "3 minutes \u2014 race.",
            ]),
            ("Rules", [
                "Robots must be fully autonomous with no manual intervention during the race.",
                "The robot must follow a black line on a white track.",
                "Deviation from the track incurs a 5-second penalty per incident.",
                "The bot must complete the track within the 3-minute race limit.",
                "Manual interference results in disqualification, unless authorised by the referee.",
                "Referee or coordinator decisions on penalties and disqualification are final.",
            ]),
            ("Rounds", [
                "Round 1 \u2014 Knockout: bots race on a simple track; the fastest bots qualify for the final round.",
                "Round 2 \u2014 Final Judgment: qualified bots race on a more complex track, results based on overall performance and shortest adjusted time.",
            ]),
            ("Judgment criteria", [
                "Time taken \u2014 time required to complete the track.",
                "Accuracy \u2014 ability to consistently follow the designated line.",
                "Smoothness \u2014 stability and smoothness of the robot's trajectory.",
                "Penalties \u2014 deviations and exceeding the time limit affect the result.",
            ]),
            ("Penalties", [
                "Track deviation: +5 seconds per incident.",
                "Exceeding the 3-minute race limit: disqualification.",
                "Unauthorised manual intervention: disqualification.",
            ]),
            ("Winner determination", [
                "The bot with the shortest final or adjusted completion time in the Final Judgment Round is declared the winner, subject to applicable penalties and referee decisions.",
            ]),
        ],
    },
    "webdev": {
        "name": "Web Dev Challenge",
        "subtitle": "AI Web Experience Challenge",
        "facts": [
            ("Team size", "2 members"),
            ("Event duration", "7 days"),
            ("Mode", "Online / Offline / Hybrid"),
            ("Final demo", "5 minutes + Q&A"),
        ],
        "sections": [
            ("About the challenge", [
                "A one-week innovation challenge to reimagine how people interact with existing digital products, services or platforms using modern technology and AI.",
                "This is not a traditional website-development competition \u2014 the goal is an experience that makes judges ask \u201cwhy didn't this exist before?\u201d",
                "Teams may take inspiration from existing products (Amazon, YouTube, Spotify, Instagram, Google Maps, Netflix, Airbnb, and similar) purely to understand the concept \u2014 they are not required to build for these platforms.",
            ]),
            ("The core challenge", [
                "Identify an existing product, service or digital experience and propose a meaningful new interaction, feature, workflow or experience that substantially improves or reimagines it.",
                "Example: instead of \u201cbuild an Amazon clone,\u201d explore \u201cwhat if online shopping could show how a product fits into my actual lifestyle?\u201d",
                "The final project should demonstrate original thinking, not simply AI bolted onto an existing website.",
            ]),
            ("Team size and eligibility", [
                "Each team must consist of exactly 2 participants; each participant may belong to only one team and cannot submit multiple projects.",
                "Both members must make a meaningful contribution to the final project.",
                "Team composition is locked after the registration deadline \u2014 no member can be added or removed afterwards unless approved by the organising committee.",
                "Participants must provide accurate registration information; false information may lead to disqualification.",
            ]),
            ("Project originality", [
                "Submissions may use existing APIs, open-source libraries, frameworks, AI models, AI coding assistants, design tools, public datasets and cloud services \u2014 but the concept, integration and experience must be directed and developed by the team.",
                "Not allowed: copying another team's project, rebranding an existing product, submitting a previously completed project without substantial new development, or using someone else's work or code without permission.",
                "The judging panel has the final say on whether a project is sufficiently innovative.",
            ]),
            ("AI tools and disclosure", [
                "Any legally accessible AI tool, agent, model or coding assistant is allowed \u2014 this list is not exhaustive.",
                "Every team submits a short AI Usage Declaration: which tools/models were used, what the AI was used for, which components were AI-generated or AI-assisted, and what the team designed, modified, tested or integrated themselves.",
                "AI usage is not penalised, but teams must be able to explain what they built.",
            ]),
            ("Pre-built work and existing code", [
                "Before the challenge starts, teams may research, learn APIs/frameworks, brainstorm, sketch rough concepts, and set up development environments.",
                "Before the challenge starts, teams may not build the complete project or prepare a finished prototype to submit as-is \u2014 substantial development must happen during the official challenge period.",
                "Open-source code, libraries and templates may be used where licences permit; teams must follow the licence and give attribution.",
                "Third-party APIs and services are allowed; teams are responsible for complying with each service's terms and for their own usage costs unless organisers provide credits.",
            ]),
            ("Data, privacy and AI-generated media", [
                "Use data legally and responsibly: no private information without permission, no exposing passwords, API keys or tokens, and no unauthorised confidential datasets.",
                "Prefer your own data, consent-based data, public data, licensed datasets or synthetic data.",
                "AI-generated images, video, voice, music and text are allowed, but must never be used to create deceptive or harmful content \u2014 realistic synthetic media must be clearly labelled as AI-generated.",
            ]),
            ("Prohibited projects", [
                "No malware, viruses, spyware, credential theft, phishing systems, or hacking tools intended for illegal use.",
                "No systems designed to facilitate fraud, non-consensual deepfakes, hate or harassment tools, or illegal surveillance.",
                "No project that violates applicable law or a third party's intellectual property rights.",
            ]),
            ("Submission requirements", [
                "Each team submits exactly one final project, including: project and team name, member details, problem statement, tech stack, AI tools/models used, AI Usage Declaration, working prototype, source code/repository, demo video and a deployment link where applicable.",
                "Idea-only submissions are not evaluated \u2014 the project must demonstrate a working prototype, though it does not need to be production-ready.",
            ]),
            ("Final demonstration", [
                "Each team gets 5 minutes to present: roughly 1 minute on the idea, 1 minute on what's different, 2 minutes of live demonstration, and 1 minute on the technology and AI behind it.",
                "A short Q&A follows the presentation.",
            ]),
            ("Judging criteria", [
                "Innovation & Originality \u2014 30%",
                "User Experience & \u201cWow\u201d Factor \u2014 20%",
                "Technical Execution \u2014 20%",
                "Effective Use of AI \u2014 10%",
                "Functionality & Completeness \u2014 10%",
                "Presentation & Demonstration \u2014 10%",
            ]),
            ("The innovation standard", [
                "Ideas like \u201cexisting website + chatbot\u201d are not automatically disqualified, but are unlikely to score well without a genuinely new interaction.",
                "The strongest projects answer: \u201cwhat can users do now that they could not meaningfully do before?\u201d",
            ]),
            ("Fair play and verification", [
                "Do not share your project with another competing team before submission, copy another team's concept, or submit the same project under multiple names.",
                "The organising committee may request source code, commit history, or a live demonstration to verify ownership and understanding.",
            ]),
            ("Intellectual property", [
                "IP in the project stays with the team, subject to the rights of any third-party software, APIs, datasets or assets used.",
                "By participating, teams allow organisers to display, demonstrate, photograph and publish the project for non-commercial event promotion.",
            ]),
            ("Disqualification and conduct", [
                "Grounds for disqualification include plagiarism, copying another team's project, submitting substantially pre-built work, false information, misuse of AI-generated content or personal data, malicious software, harassment, and attempts to manipulate judging.",
                "All participants are expected to be professional and respectful toward participants, organisers, mentors and judges.",
            ]),
            ("Judging decisions and organiser's rights", [
                "The judging panel's decisions are final and binding. Ties are broken first on Innovation & Originality, then User Experience, then Technical Execution, then Functionality.",
                "The organising committee may modify the schedule, clarify or amend rules, or cancel/postpone the event under exceptional circumstances.",
            ]),
            ("Final principle", [
                "This competition is not about building the most complicated application \u2014 it is about building the most interesting experience.",
                "Don't just build another website. Reimagine what the experience could be.",
            ]),
        ],
    },
}

def build():
    doc = SimpleDocTemplate(
        "public/rulebook.pdf",
        pagesize=A4,
        topMargin=2.2 * cm, bottomMargin=2 * cm, leftMargin=2 * cm, rightMargin=2 * cm,
        title="Fest 2026 Rule Book",
    )
    story = []

    story.append(Paragraph("Fest 2026 \u2014 Rule Book", title_style))
    story.append(Paragraph(
        "Official rules for TechCon, Line Follower and the Web Dev Challenge.",
        subtitle_style,
    ))
    story.append(HRFlowable(width="100%", thickness=1.4, color=INK, spaceAfter=10))

    comp_order = ["techcon", "line-follower", "webdev"]
    for i, slug in enumerate(comp_order):
        comp = RULEBOOK[slug]
        if i > 0:
            story.append(PageBreak())
        story.append(Paragraph(comp["name"], comp_title_style))
        story.append(Paragraph(comp["subtitle"], comp_subtitle_style))

        fact_line = "&nbsp;&nbsp;|&nbsp;&nbsp;".join(
            f"<b>{label}:</b> {value}" for label, value in comp["facts"]
        )
        story.append(Paragraph(fact_line, fact_style))
        story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#CCCCCC"), spaceBefore=8, spaceAfter=6))

        for title, items in comp["sections"]:
            story.append(Paragraph(title, section_title_style))
            story.append(
                ListFlowable(
                    [ListItem(Paragraph(item, body_style), leftIndent=6, spaceAfter=3) for item in items],
                    bulletType="bullet",
                    start="\u2022",
                    leftIndent=14,
                )
            )

    doc.build(story)
    print("PDF written")

if __name__ == "__main__":
    build()
