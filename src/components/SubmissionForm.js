"use client";

import { useState } from "react";
import { isPast } from "@/lib/dates";

export default function SubmissionForm({ kind, title, deadlineLabel, deadline, currentLink }) {
  const closed = isPast(deadline);
  const [link, setLink] = useState(currentLink);
  const [saved, setSaved] = useState(Boolean(currentLink));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch("/api/submissions/techcon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, link }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "That link was not saved. Try again.");
        return;
      }
      setSaved(true);
    } catch {
      setError("That link was not saved. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-2 border-ink p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <p className={`text-sm font-semibold ${closed ? "text-neutral-500" : ""}`}>
          {closed ? "Closed" : deadlineLabel}
        </p>
      </div>

      <label className="label mt-4" htmlFor={`link-${kind}`}>
        Share link
      </label>
      <input
        id={`link-${kind}`}
        type="url"
        className="field"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://drive.google.com/..."
        disabled={closed}
        required
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy || closed} className="btn-primary">
          {busy ? "Saving" : currentLink ? "Replace link" : "Save link"}
        </button>
        {saved && !error && <p className="text-sm font-semibold">Link saved.</p>}
      </div>

      {error && (
        <p role="alert" className="mt-3 bg-signal px-3 py-2 text-sm font-semibold">
          {error}
        </p>
      )}
    </form>
  );
}
