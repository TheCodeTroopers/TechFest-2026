"use client";

import { useState } from "react";
import RuleCards from "./RuleCards";

export default function RulebookViewer({ competitions }) {
  const [active, setActive] = useState(competitions[0].slug);
  const current = competitions.find((c) => c.slug === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b-2 border-ink pb-4">
        {competitions.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActive(c.slug)}
            className={`border-2 border-ink px-4 py-2 text-sm font-semibold ${
              active === c.slug ? "bg-signal shadow-hard-sm" : "bg-paper hover:bg-wash"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold text-neutral-600">{current.subtitle}</p>
        <h2 className="font-display text-3xl font-extrabold">{current.name}</h2>

        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-y-2 border-ink py-4 text-sm">
          {current.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-neutral-600">{fact.label}</dt>
              <dd className="font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <RuleCards sections={current.sections} />
        </div>
      </div>
    </div>
  );
}
