import ImageSlot from "@/components/ImageSlot";
import RulebookViewer from "@/components/RulebookViewer";
import { RULEBOOK } from "@/lib/rulebook";

export const metadata = {
  title: "Rule Book — Fest 2026",
  description: "Full rules for TechCon, Line Follower and the Web Dev Challenge.",
};

const COMPETITIONS_FOR_VIEWER = Object.entries(RULEBOOK).map(([slug, data]) => ({
  slug,
  ...data,
}));

export default function RulebookPage() {
  return (
    <div>
      <section className="border-b-2 border-ink bg-wash">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.15fr_1fr] md:items-center">
          <div>
            <p className="inline-block bg-ink px-3 py-1 text-sm font-semibold text-paper">
              Read before you register
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl">
              The <span className="bg-signal px-2">Rule Book</span>
            </h1>
            <p className="mt-6 max-w-[55ch] text-lg text-neutral-700">
              Everything that governs TechCon, Line Follower and the Web Dev Challenge — team
              sizes, deadlines, guidelines, judging criteria and what gets a team disqualified.
              Read the section for your competition before you register.
            </p>
            <div className="mt-8">
              <a href="/rulebook.pdf" download className="btn-primary">
                Download the full PDF
              </a>
            </div>
          </div>

          <ImageSlot label="Rule book cover image" ratio="aspect-[4/5]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <RulebookViewer competitions={COMPETITIONS_FOR_VIEWER} />
      </section>
    </div>
  );
}
