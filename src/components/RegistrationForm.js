"use client";

import { useState } from "react";
import SuccessModal from "./SuccessModal";

function blankMembers(comp) {
  // The leader is member one, so the form only asks for the rest.
  const required = Math.max(comp.minMembers - 1, 0);
  const count = comp.minMembers === comp.maxMembers ? required : Math.max(required, 1);
  return Array.from({ length: count }, () => ({ name: "", email: "" }));
}

export default function RegistrationForm({ competition, leader, whatsappLink }) {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState(leader.name || "");
  const [members, setMembers] = useState(() => blankMembers(competition));
  const [theme, setTheme] = useState("");
  const [gitLink, setGitLink] = useState("");
  const [driveVideoLink, setDriveVideoLink] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const fixedSize = competition.minMembers === competition.maxMembers;
  const maxTeammates = competition.maxMembers - 1;

  function updateMember(index, key, value) {
    setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, [key]: value } : m)));
  }

  function addMember() {
    setMembers((prev) =>
      prev.length < maxTeammates ? [...prev, { name: "", email: "" }] : prev
    );
  }

  function removeMember(index) {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          competition: competition.slug,
          teamName,
          teamLeaderName: leaderName,
          members: members.filter((m) => m.name.trim()),
          theme,
          gitLink,
          driveVideoLink,
          agreed,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.error || "Registration did not go through. Try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Registration did not go through. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <section>
          <h2 className="font-display text-xl font-bold">Team</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="teamName">
                Team name <span className="font-normal text-neutral-500">(optional)</span>
              </label>
              <input
                id="teamName"
                className="field"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Nightshift"
                maxLength={60}
              />
            </div>

            <div>
              <label className="label" htmlFor="leaderName">
                Your name
              </label>
              <input
                id="leaderName"
                className="field"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                required
                minLength={2}
                maxLength={80}
              />
            </div>

            <div>
              <label className="label" htmlFor="leaderEmail">
                Your college email
              </label>
              <input id="leaderEmail" className="field" value={leader.email} disabled />
              <p className="hint">Taken from your sign-in. All updates go here.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-xl font-bold">
              {fixedSize ? "Your teammate" : "Teammates"}
            </h2>
            <p className="text-sm text-neutral-600">
              {members.length + 1} of {competition.maxMembers} members
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {members.map((member, index) => (
              <div key={index} className="border-2 border-ink p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor={`member-name-${index}`}>
                      Member {index + 2} name
                    </label>
                    <input
                      id={`member-name-${index}`}
                      className="field"
                      value={member.name}
                      onChange={(e) => updateMember(index, "name", e.target.value)}
                      required={index < competition.minMembers - 1}
                      maxLength={80}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor={`member-email-${index}`}>
                      Email <span className="font-normal text-neutral-500">(optional)</span>
                    </label>
                    <input
                      id={`member-email-${index}`}
                      type="email"
                      className="field"
                      value={member.email}
                      onChange={(e) => updateMember(index, "email", e.target.value)}
                    />
                  </div>
                </div>

                {!fixedSize && members.length > Math.max(competition.minMembers - 1, 1) && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="mt-3 text-sm font-semibold underline"
                  >
                    Remove this member
                  </button>
                )}
              </div>
            ))}
          </div>

          {!fixedSize && members.length < maxTeammates && (
            <button type="button" onClick={addMember} className="btn-quiet mt-4">
              Add another member
            </button>
          )}
        </section>

        {competition.themes && (
          <section>
            <h2 className="font-display text-xl font-bold">Theme</h2>
            <label className="label mt-4" htmlFor="theme">
              Pick one theme for your paper
            </label>
            <select
              id="theme"
              className="field"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              required
            >
              <option value="">Choose a theme</option>
              {competition.themes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <p className="hint">Write to the organisers if you need to change this later.</p>
          </section>
        )}

        {competition.needsProjectLinks && (
          <section>
            <h2 className="font-display text-xl font-bold">Round 1 submission</h2>
            <p className="mt-1 text-sm text-neutral-700">
              Judges review these to decide the shortlist, so set both links to
              anyone-with-the-link access.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="label" htmlFor="gitLink">
                  Project repository link
                </label>
                <input
                  id="gitLink"
                  type="url"
                  className="field"
                  value={gitLink}
                  onChange={(e) => setGitLink(e.target.value)}
                  placeholder="https://github.com/your-team/project"
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="driveVideoLink">
                  Demo video link (Google Drive)
                </label>
                <input
                  id="driveVideoLink"
                  type="url"
                  className="field"
                  value={driveVideoLink}
                  onChange={(e) => setDriveVideoLink(e.target.value)}
                  placeholder="https://drive.google.com/file/..."
                  required
                />
              </div>
            </div>
          </section>
        )}

        {competition.slug === "techcon" && (
          <label className="flex items-start gap-3 border-2 border-ink bg-wash p-4">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-black"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <span className="text-sm">
              Both of us have read the paper and presentation guidelines, and we will complete
              the library plagiarism check before submitting the final paper.
            </span>
          </label>
        )}

        {error && (
          <p
            role="alert"
            className="border-2 border-ink bg-signal px-4 py-3 text-sm font-semibold"
          >
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-primary w-full sm:w-auto">
          {busy ? "Registering your team" : `Register for ${competition.name}`}
        </button>
      </form>

      {done && (
        <SuccessModal
          competitionName={competition.name}
          whatsappLink={whatsappLink}
          note={
            competition.hasShortlisting
              ? "Judges review Round 1 submissions after registration closes. Shortlisted teams are announced in the group."
              : null
          }
        />
      )}
    </>
  );
}
