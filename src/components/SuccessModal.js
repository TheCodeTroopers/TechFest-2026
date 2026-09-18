"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function SuccessModal({ competitionName, whatsappLink, note }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5"
    >
      <div className="w-full max-w-md border-2 border-ink bg-paper p-6 shadow-hard">
        <p className="inline-block bg-signal px-2 py-1 text-sm font-bold">Registered</p>
        <h2 id="success-title" className="mt-3 font-display text-3xl font-extrabold">
          Your {competitionName} team is in
        </h2>
        <p className="mt-3 text-neutral-700">
          Join the WhatsApp group — every announcement, schedule change and result goes there
          first.
        </p>
        {note && <p className="mt-3 text-sm text-neutral-700">{note}</p>}

        <div className="mt-6 flex flex-col gap-3">
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              Join the WhatsApp group
            </a>
          ) : (
            <p className="border-2 border-dashed border-ink bg-wash px-3 py-2 text-sm font-semibold">
              WhatsApp group link not set yet — add it in your environment variables.
            </p>
          )}
          <Link href="/" ref={closeRef} className="btn-quiet w-full">
            Back to competitions
          </Link>
        </div>
      </div>
    </div>
  );
}
