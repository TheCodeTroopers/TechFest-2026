# Fest 2026 — registration site

Next.js (App Router) + Firebase Auth + Firestore, deployed on Vercel.

Three competitions: **TechCon** (paper presentation), **Line Follower**, **Web Dev Challenge**.
Only the team leader signs in; teammates are just names on the form.

---

## What's in the box

| Route | What it does |
|---|---|
| `/` | Hero, three competition rows with live deadlines, Rule Book teaser, FAQ |
| `/login` | Google sign-in, restricted to `@sode-edu.in` |
| `/register/[competition]` | Full rules for that competition, then the registration form |
| `/rulebook` | All three rulebooks, tabbed, plus a PDF download |
| `/submit/techcon` | Team leaders paste paper + final PPT links, gated by deadline |
| `/admin` | Allow-listed admins only: all registrations, filters, shortlisting, deadline editor, CSV |

### Security model

The browser **never** talks to Firestore. It uses Firebase Auth to get a Google ID token, posts
that to `/api/auth/session`, and the server checks the email domain and mints an `httpOnly`
session cookie. Every read and write goes through a route handler using the Admin SDK, which
re-verifies the cookie. `middleware.js` is only a cheap first gate — the real check runs on the
server in `src/lib/server.js`. So hitting `/admin` directly gets you nothing.

That's why `firestore.rules` denies all client access. If you ever move reads into the browser,
the file has a commented alternative rule set ready.

---

## Setup

```bash
npm install
cp .env.local.example .env.local   # then fill it in
npm run dev
```

### 1. Firebase project

1. Create a project at console.firebase.google.com.
2. **Authentication → Sign-in method → Google**: enable it.
3. **Firestore Database**: create in production mode, then paste `firestore.rules` into
   **Rules** and publish.
4. **Project settings → General → Your apps → Web app**: copy the config into the
   `NEXT_PUBLIC_FIREBASE_*` variables.
5. **Project settings → Service accounts → Generate new private key**: the downloaded JSON gives
   you `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`.
   Keep the private key in quotes with its `\n` escapes intact.

### 2. Seed the admin list

In Firestore, create `admins` → document ID `list`:

```
emails (array of strings): ["yourname@sode-edu.in", "co-organiser@sode-edu.in"]
```

Managing this from the console (not the app) means nobody can add themselves as an admin.

### 3. WhatsApp links

Set `NEXT_PUBLIC_WHATSAPP_TECHCON`, `NEXT_PUBLIC_WHATSAPP_LINE_FOLLOWER` and
`NEXT_PUBLIC_WHATSAPP_WEBDEV`. Until you do, the success modal says the link isn't set yet
instead of showing a broken button.

### 4. Deploy

1. Push to GitHub, import into Vercel.
2. Add every variable from `.env.local` to **Vercel → Settings → Environment Variables**.
3. Deploy, then add your Vercel domain (and any custom domain) to
   **Firebase → Authentication → Settings → Authorized domains**. Google Sign-In fails on the
   live site without this.

---

## Deadlines

Defaults live in `src/lib/competitions.js` (`DEFAULT_SETTINGS`). The first time an admin saves
in `/admin`, a `settings/deadlines` document is written and takes over — from then on dates are
editable from the site with no redeploy. Deadlines are stored as `datetime-local` strings, so
what the admin types is what everyone sees.

Deadlines aren't cosmetic: `/api/register` refuses late registrations, and
`/api/submissions/techcon` refuses late paper and PPT links.

## Team sizes

| Competition | Members (leader included) |
|---|---|
| TechCon | exactly 2 |
| Line Follower | exactly 3 |
| Web Dev Challenge | exactly 2 |

Change these in `src/lib/competitions.js` — the form, the validation and the copy all read from
the same place. A leader can register one team per competition, but can lead teams in all three.

## Web Dev Challenge shortlisting

Round 1 is the repo link plus the Drive video, collected at registration. Admins mark each team
`shortlisted` or `rejected` from `/admin`. Results are announced in the WhatsApp group — there is
no second form on the site. If that changes, add a `/submit/webdev` page mirroring
`/submit/techcon`.

## Images

Every placeholder is an `<ImageSlot>` (`src/components/ImageSlot.js`) with a dashed border and a
label saying what it expects: hero, per-competition cards, and the Rule Book cover (shown on both
the home page teaser and the `/rulebook` page). Drop your files into `/public` and replace each
slot with `next/image`.

## Editing the rules, FAQ, socials and contacts

Everything below is plain data — edit the file, no other code changes needed:

| What | File |
|---|---|
| Rules shown on `/register/[competition]` and `/rulebook` | `src/lib/rulebook.js` |
| The downloadable PDF at `/rulebook.pdf` | `build_rulebook_pdf.py` (see below) |
| "Got questions?" on the home page | `src/lib/faq.js` |
| Instagram / LinkedIn / YouTube links, coordinator names & phone numbers | `src/lib/contact.js` |
| Team sizes, themes, deadlines defaults, WhatsApp env var names | `src/lib/competitions.js` |

### Regenerating the PDF

`public/rulebook.pdf` is a static file, generated once from the same text as `rulebook.js`. If
you change the rules, regenerate it: edit the matching content in `build_rulebook_pdf.py` (kept
alongside the project, not shipped to Vercel) and run:

```bash
pip install reportlab
python3 build_rulebook_pdf.py
```

This overwrites `public/rulebook.pdf` in place. Commit the new PDF along with your rule changes.

---

## Firestore shape

```
registrations/{autoId}
  competition        "techcon" | "line-follower" | "webdev"
  teamName           string | null
  teamLeaderName     string
  teamLeaderEmail    string (lowercase, college domain)
  teamLeaderUid      string
  members            [{ name, email }]
  teamSize           number (leader included)
  status             "registered" | "shortlisted" | "rejected"
  theme              string            // TechCon
  paperLink          string | null     // TechCon
  pptLink            string | null     // TechCon
  gitLink            string            // Web Dev
  driveVideoLink     string            // Web Dev
  createdAt, updatedAt   timestamps

settings/deadlines
  techcon         { registrationDeadline, paperDeadline, pptDeadline, eventDate }
  line-follower   { registrationDeadline, eventDate }
  webdev          { registrationDeadline, eventDate }

admins/list
  emails          [string]
```

## Still worth deciding

- Confirmation email on registration — not built. Easiest add is a Firebase Extension
  (Trigger Email) on the `registrations` collection, no app changes needed.
- Line Follower event-day details (arena rules, heat timings) aren't on the site yet; the
  TechCon details section is the template if you want one per competition.
