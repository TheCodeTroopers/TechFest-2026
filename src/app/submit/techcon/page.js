import Link from "next/link";
import { redirect } from "next/navigation";
import SubmissionForm from "@/components/SubmissionForm";
import { getSessionUser, getSettings, findRegistration } from "@/lib/server";
import { formatDate } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function TechConSubmitPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/submit/techcon");

  const registration = await findRegistration("techcon", user.email);
  const settings = await getSettings();

  if (!registration) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20">
        <h1 className="font-display text-4xl font-extrabold">No TechCon team yet</h1>
        <p className="mt-4 text-neutral-700">
          Submissions open once you have registered a team under {user.email}.
        </p>
        <Link href="/register/techcon" className="btn-primary mt-8">
          Register for TechCon
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm font-semibold text-neutral-600">TechCon</p>
      <h1 className="font-display text-4xl font-extrabold">Paper and PPT submissions</h1>
      <p className="mt-3 text-neutral-700">
        Theme: <span className="font-semibold text-ink">{registration.theme}</span>. Paste share
        links — set both files to anyone-with-the-link so the judges can open them. You can
        replace a link any time before its deadline.
      </p>

      <div className="mt-10 space-y-6">
        <SubmissionForm
          kind="paper"
          title="Paper (IEEE format)"
          deadlineLabel={`Due ${formatDate(settings.techcon?.paperDeadline, true)}`}
          deadline={settings.techcon?.paperDeadline}
          currentLink={registration.paperLink || ""}
        />
        <SubmissionForm
          kind="ppt"
          title="Final presentation"
          deadlineLabel={`Due ${formatDate(settings.techcon?.pptDeadline, true)}`}
          deadline={settings.techcon?.pptDeadline}
          currentLink={registration.pptLink || ""}
        />
      </div>
    </div>
  );
}
