import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import Faq from "@/components/Faq";
import LandingIntro from "@/components/LandingIntro";
import { COMPETITIONS } from "@/lib/competitions";
import { getSettings } from "@/lib/server";
import { formatDate, isPast, daysLeft } from "@/lib/dates";
import { FAQ_ITEMS } from "@/lib/faq";

export const dynamic = "force-dynamic";

function Countdown({ deadline }) {
  if (isPast(deadline)) {
    return <span className="border-2 border-ink px-2 py-1 text-xs font-bold">Closed</span>;
  }
  const left = daysLeft(deadline);
  if (left === null) return null;
  return (
    <span className="bg-signal px-2 py-1 text-xs font-bold">
      {left <= 0 ? "Closes today" : left === 1 ? "1 day left" : `${left} days left`}
    </span>
  );
}

function CompetitionRow({ comp, deadline }) {
  const closed = isPast(deadline);
  return (
    <article className="grid gap-5 border-b-2 border-ink py-8 md:grid-cols-[13rem_1fr_auto] md:items-center">
      <ImageSlot label={`${comp.name} card image`} ratio="aspect-[16/10]" />

      <div className="min-w-0">
        <p className="text-sm font-semibold text-neutral-600">{comp.kicker}</p>
        <h3 className="font-display text-3xl font-extrabold">{comp.name}</h3>
        <p className="mt-2 max-w-[60ch] text-neutral-700">{comp.summary}</p>
        <p className="mt-3 text-sm font-semibold">{comp.teamSizeLabel}</p>
      </div>

      <div className="flex flex-col items-start gap-3 md:items-end">
        <div className="md:text-right">
          <p className="text-sm text-neutral-600">Registration closes</p>
          <p className="font-display text-xl font-bold">{formatDate(deadline)}</p>
        </div>
        <Countdown deadline={deadline} />
        {closed ? (
          <span className="btn-quiet cursor-not-allowed border-rule text-neutral-400">
            Registration closed
          </span>
        ) : (
          <Link href={`/register/${comp.slug}`} className="btn-primary">
            Register for {comp.name}
          </Link>
        )}
      </div>
    </article>
  );
}

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <LandingIntro
        deadline={settings.techcon?.registrationDeadline}
        eventDate={settings.techcon?.eventDate}
        imageSrc="/poster.png"
        imageAlt="Fest 2026 poster"
      />

      {/* Competitions */}
      <section id="competitions" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
        <h2 className="font-display text-4xl font-extrabold">Pick your competition</h2>
        <p className="mt-2 max-w-[60ch] text-neutral-700">
          Only the team leader registers. Teammates are entered on the form and do not need to
          sign in. You can lead a team in more than one competition. Full rules for each
          competition are shown right on its registration page.
        </p>

        <div className="mt-8 border-t-2 border-ink">
          {Object.values(COMPETITIONS).map((comp) => (
            <CompetitionRow
              key={comp.slug}
              comp={comp}
              deadline={settings[comp.slug]?.registrationDeadline}
            />
          ))}
        </div>
      </section>

      {/* Rule book teaser */}
      <section className="border-y-2 border-ink bg-wash">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1fr_1.1fr] md:items-center">
          <ImageSlot
            label="Rule book cover image"
            ratio="aspect-[4/5]"
            className="order-2 md:order-1"
          />

          <div className="order-1 md:order-2">
            <p className="inline-block bg-ink px-3 py-1 text-sm font-semibold text-paper">
              Read this first
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold">The Rule Book</h2>
            <p className="mt-4 max-w-[55ch] text-neutral-700">
              Team sizes, deadlines, judging criteria, what gets a team disqualified — every rule
              for TechCon, Line Follower and the Web Dev Challenge, in one place. Download it as a
              PDF or browse it on the page.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/rulebook" className="btn-primary">
                Open the Rule Book
              </Link>
              <a href="/rulebook.pdf" download className="btn-quiet">
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-5 py-14">
        <h2 className="font-display text-4xl font-extrabold">Got questions?</h2>
        <p className="mt-2 max-w-[60ch] text-neutral-700">
          The short answers to what people usually ask before registering.
        </p>
        <Faq items={FAQ_ITEMS} />
      </section>
    </>
  );
}