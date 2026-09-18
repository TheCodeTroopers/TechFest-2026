import { SOCIAL_LINKS, COORDINATORS, CONTACT_EMAIL } from "@/lib/contact";

const SOCIAL_LABELS = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

export default function SiteFooter() {
  const socials = Object.entries(SOCIAL_LINKS).filter(([, url]) => url);

  return (
    <footer className="mt-20 border-t-2 border-ink">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-bold">Fest 2026</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Organised by the student council.
            </p>
            {socials.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {SOCIAL_LABELS[key] || key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">Contact us</h2>
            <ul className="mt-2 space-y-3 text-sm text-neutral-700">
              {COORDINATORS.map((c) => (
                <li key={c.role}>
                  <p className="font-semibold text-ink">{c.role}</p>
                  <p>
                    {c.name} ·{" "}
                    <a href={`tel:${c.phone}`} className="underline">
                      {c.phone}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">Write to us</h2>
            <p className="mt-2 text-sm text-neutral-700">
              Trouble registering, or a question not covered in the{" "}
              <a href="/#faq" className="underline">
                FAQ
              </a>
              ?
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 inline-block text-sm font-semibold underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <p className="mt-10 border-t-2 border-rule pt-6 text-sm text-neutral-500">
          Fest 2026 — all rules and deadlines are also available in the{" "}
          <a href="/rulebook" className="underline">
            Rule Book
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
