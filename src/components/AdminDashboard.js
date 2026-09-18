"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { COMPETITIONS } from "@/lib/competitions";
import { formatDate } from "@/lib/dates";

const TABS = [{ slug: "all", name: "All" }, ...Object.values(COMPETITIONS)];

const STATUS_STYLES = {
  registered: "border-ink bg-paper",
  shortlisted: "border-ink bg-signal",
  rejected: "border-neutral-400 bg-neutral-100 text-neutral-600",
};

function csvCell(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(rows) {
  const header = [
    "Competition",
    "Team name",
    "Leader",
    "Leader email",
    "Members",
    "Team size",
    "Theme",
    "Git link",
    "Video link",
    "Paper link",
    "PPT link",
    "Status",
    "Registered at",
  ];
  const body = rows.map((r) =>
    [
      COMPETITIONS[r.competition]?.name || r.competition,
      r.teamName,
      r.teamLeaderName,
      r.teamLeaderEmail,
      (r.members || []).map((m) => (m.email ? `${m.name} <${m.email}>` : m.name)).join("; "),
      r.teamSize,
      r.theme,
      r.gitLink,
      r.driveVideoLink,
      r.paperLink,
      r.pptLink,
      r.status,
      r.createdAt ? new Date(r.createdAt).toLocaleString("en-IN") : "",
    ].map(csvCell).join(",")
  );
  return [header.map(csvCell).join(","), ...body].join("\n");
}

export default function AdminDashboard({ initialSettings, adminEmail }) {
  const [rows, setRows] = useState([]);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetchedAt, setFetchedAt] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/registrations", { cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "Could not load registrations.");
        return;
      }
      setRows(data.registrations || []);
      setFetchedAt(new Date(data.fetchedAt));
    } catch {
      setError("Could not load registrations. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (tab !== "all" && r.competition !== tab) return false;
      if (!q) return true;
      const haystack = [
        r.teamName,
        r.teamLeaderName,
        r.teamLeaderEmail,
        r.theme,
        ...(r.members || []).map((m) => m.name),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [rows, tab, query]);

  const counts = useMemo(() => {
    const out = { all: rows.length };
    for (const slug of Object.keys(COMPETITIONS)) {
      out[slug] = rows.filter((r) => r.competition === slug).length;
    }
    return out;
  }, [rows]);

  async function setStatus(id, status) {
    const previous = rows;
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    const response = await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      setRows(previous);
      setError("That status change did not save. Try again.");
    }
  }

  function downloadCsv() {
    const blob = new Blob([toCsv(visible)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold">Registrations</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Signed in as {adminEmail}
            {fetchedAt && ` · last loaded ${fetchedAt.toLocaleTimeString("en-IN")}`}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={load} disabled={loading} className="btn-primary">
            {loading ? "Loading" : "Refresh"}
          </button>
          <button onClick={downloadCsv} disabled={!visible.length} className="btn-quiet">
            Download CSV
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 border-2 border-ink bg-signal px-4 py-3 text-sm font-semibold">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-2 border-b-2 border-ink pb-4">
        {TABS.map((t) => (
          <button
            key={t.slug}
            onClick={() => setTab(t.slug)}
            className={`border-2 border-ink px-3 py-2 text-sm font-semibold ${
              tab === t.slug ? "bg-signal shadow-hard-sm" : "bg-paper hover:bg-wash"
            }`}
          >
            {t.name} ({counts[t.slug] ?? 0})
          </button>
        ))}
        <input
          className="field ml-auto max-w-xs"
          placeholder="Search teams or emails"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {!loading && !visible.length ? (
        <p className="mt-10 border-2 border-dashed border-ink bg-wash p-8 text-center font-semibold">
          No teams here yet. Refresh once registrations start coming in.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((r) => (
            <RegistrationCard key={r.id} row={r} onStatus={setStatus} />
          ))}
        </ul>
      )}

      <DeadlineEditor initialSettings={initialSettings} />
    </div>
  );
}

function RegistrationCard({ row, onStatus }) {
  const comp = COMPETITIONS[row.competition];
  const shortlisting = comp?.hasShortlisting;

  return (
    <li className="border-2 border-ink p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-neutral-600">
            {comp?.name || row.competition}
            {row.createdAt && ` · ${formatDate(row.createdAt, true)}`}
          </p>
          <h2 className="font-display text-xl font-bold">
            {row.teamName || row.teamLeaderName}
          </h2>
          <p className="text-sm text-neutral-700">
            Leader: {row.teamLeaderName} ({row.teamLeaderEmail})
          </p>
        </div>
        <span
          className={`border-2 px-2 py-1 text-xs font-bold ${
            STATUS_STYLES[row.status] || STATUS_STYLES.registered
          }`}
        >
          {row.status}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-neutral-600">Members ({row.teamSize})</dt>
          <dd className="font-medium">
            {[row.teamLeaderName, ...(row.members || []).map((m) => m.name)].join(", ")}
          </dd>
        </div>
        {row.theme && (
          <div>
            <dt className="text-neutral-600">Theme</dt>
            <dd className="font-medium">{row.theme}</dd>
          </div>
        )}
        {row.gitLink && <LinkRow label="Repository" href={row.gitLink} />}
        {row.driveVideoLink && <LinkRow label="Demo video" href={row.driveVideoLink} />}
        {row.paperLink && <LinkRow label="Paper" href={row.paperLink} />}
        {row.pptLink && <LinkRow label="Final PPT" href={row.pptLink} />}
      </dl>

      {shortlisting && (
        <div className="mt-4 flex flex-wrap gap-2 border-t-2 border-rule pt-4">
          <button
            onClick={() => onStatus(row.id, "shortlisted")}
            disabled={row.status === "shortlisted"}
            className="btn-primary px-4 py-2 text-sm"
          >
            Shortlist
          </button>
          <button
            onClick={() => onStatus(row.id, "rejected")}
            disabled={row.status === "rejected"}
            className="btn-quiet px-4 py-2 text-sm"
          >
            Reject
          </button>
          {row.status !== "registered" && (
            <button
              onClick={() => onStatus(row.id, "registered")}
              className="btn-quiet px-4 py-2 text-sm"
            >
              Reset to registered
            </button>
          )}
        </div>
      )}
    </li>
  );
}

function LinkRow({ label, href }) {
  return (
    <div className="min-w-0">
      <dt className="text-neutral-600">{label}</dt>
      <dd className="truncate">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline"
        >
          {href}
        </a>
      </dd>
    </div>
  );
}

function DeadlineEditor({ initialSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function update(slug, key, value) {
    setSettings((prev) => ({ ...prev, [slug]: { ...prev[slug], [key]: value } }));
  }

  async function save() {
    setBusy(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "Deadlines were not saved.");
        return;
      }
      setSettings(data.settings);
      setMessage("Deadlines saved. The site is showing the new dates now.");
    } catch {
      setError("Deadlines were not saved. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-16 border-t-2 border-ink pt-10">
      <h2 className="font-display text-3xl font-extrabold">Deadlines</h2>
      <p className="mt-2 max-w-[60ch] text-neutral-700">
        These drive what the home page shows and what the forms accept. Changes take effect
        immediately — no redeploy.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {Object.values(COMPETITIONS).map((comp) => (
          <div key={comp.slug} className="border-2 border-ink p-5">
            <h3 className="font-display text-lg font-bold">{comp.name}</h3>
            <div className="mt-4 space-y-4">
              {comp.deadlineFields.map((field) => (
                <div key={field.key}>
                  <label className="label" htmlFor={`${comp.slug}-${field.key}`}>
                    {field.label}
                  </label>
                  <input
                    id={`${comp.slug}-${field.key}`}
                    type="datetime-local"
                    className="field"
                    value={settings[comp.slug]?.[field.key] || ""}
                    onChange={(e) => update(comp.slug, field.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button onClick={save} disabled={busy} className="btn-primary">
          {busy ? "Saving" : "Save deadlines"}
        </button>
        {message && <p className="text-sm font-semibold">{message}</p>}
        {error && (
          <p role="alert" className="bg-signal px-3 py-2 text-sm font-semibold">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
