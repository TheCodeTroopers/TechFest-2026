export default function RuleCards({ sections }) {
  if (!sections?.length) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {sections.map((section) => (
        <div key={section.title} className="border-2 border-ink bg-paper p-5 shadow-hard-sm">
          <h3 className="font-display text-lg font-bold">{section.title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true" className="mt-1 text-xs">
                  ▸
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
