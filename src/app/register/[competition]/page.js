import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import RegistrationForm from "@/components/RegistrationForm";
import RuleCards from "@/components/RuleCards";
import { getCompetition } from "@/lib/competitions";
import { getSessionUser, getSettings, findRegistration } from "@/lib/server";
import { formatDate, isPast } from "@/lib/dates";
import { getRulebook } from "@/lib/rulebook";

export const dynamic = "force-dynamic";

function Notice({ title, children }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="font-display text-4xl font-extrabold">{title}</h1>
      <div className="mt-4 space-y-4 text-neutral-700">{children}</div>
      <Link href="/" className="btn-quiet mt-8">
        Back to competitions
      </Link>
    </div>
  );
}

export default async function RegisterPage({ params }) {
  const comp = getCompetition(params.competition);
  if (!comp) notFound();

  const user = await getSessionUser();
  if (!user) redirect(`/login?next=/register/${comp.slug}`);

  const settings = await getSettings();
  const deadline = settings[comp.slug]?.registrationDeadline;

  if (isPast(deadline)) {
    return (
      <Notice title={`${comp.name} registration has closed`}>
        <p>Registration closed on {formatDate(deadline, true)}.</p>
      </Notice>
    );
  }

  const existing = await findRegistration(comp.slug, user.email);
  if (existing) {
    return (
      <Notice title={`You are registered for ${comp.name}`}>
        <p>
          Your team of {existing.teamSize} is in, registered under {existing.teamLeaderEmail}. One
          team per leader, per competition — but you can still lead a team in the other
          competitions.
        </p>
        {comp.acceptsSubmissions && (
          <p>
            <Link href="/submit/techcon" className="font-semibold text-ink underline">
              Submit your paper and PPT links
            </Link>{" "}
            when they are ready.
          </p>
        )}
      </Notice>
    );
  }

  const rulebook = getRulebook(comp.slug);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="text-sm font-semibold text-neutral-600">{comp.kicker}</p>
      <h1 className="font-display text-4xl font-extrabold">Register for {comp.name}</h1>
      <p className="mt-3 text-neutral-700">{comp.summary}</p>

      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y-2 border-ink py-4 text-sm">
        <div>
          <dt className="text-neutral-600">Team size</dt>
          <dd className="font-semibold">{comp.teamSizeLabel}</dd>
        </div>
        <div>
          <dt className="text-neutral-600">Registration closes</dt>
          <dd className="font-semibold">{formatDate(deadline, true)}</dd>
        </div>
      </dl>

      {rulebook && (
        <section className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl font-bold">Full rules for {comp.name}</h2>
            <Link href="/rulebook" className="text-sm font-semibold underline">
              See the full rule book
            </Link>
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            Read this before you fill the form below — it covers team formation, deadlines,
            guidelines and what gets a team disqualified.
          </p>
          <div className="mt-5">
            <RuleCards sections={rulebook.sections} />
          </div>
        </section>
      )}

      <div className="mx-auto max-w-2xl">
        <RegistrationForm
          competition={{
            slug: comp.slug,
            name: comp.name,
            minMembers: comp.minMembers,
            maxMembers: comp.maxMembers,
            themes: comp.themes,
            needsProjectLinks: comp.needsProjectLinks,
            hasShortlisting: comp.hasShortlisting,
          }}
          leader={{ name: user.name, email: user.email }}
          whatsappLink={whatsappFor(comp.slug)}
        />
      </div>
    </div>
  );
}

// Env vars have to be read as literals for Next to inline them.
function whatsappFor(slug) {
  if (slug === "techcon") return process.env.NEXT_PUBLIC_WHATSAPP_TECHCON || "";
  if (slug === "line-follower") return process.env.NEXT_PUBLIC_WHATSAPP_LINE_FOLLOWER || "";
  return process.env.NEXT_PUBLIC_WHATSAPP_WEBDEV || "";
}
