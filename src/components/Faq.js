"use client";

import { useState } from "react";

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-8 border-t-2 border-ink">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.question} className="border-b-2 border-ink">
            <button
              onClick={() => setOpen(expanded ? -1 : i)}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg font-bold sm:text-xl">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink text-lg font-bold transition-transform ${
                  expanded ? "bg-signal" : "bg-paper"
                }`}
              >
                {expanded ? "–" : "+"}
              </span>
            </button>
            {expanded && (
              <div className="max-w-[65ch] pb-5 text-neutral-700">
                {Array.isArray(item.answer) ? (
                  item.answer.map((p, j) => <p key={j} className="mt-2 first:mt-0">{p}</p>)
                ) : (
                  <p>{item.answer}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
