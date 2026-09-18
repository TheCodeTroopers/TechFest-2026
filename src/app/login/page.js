import { Suspense } from "react";
import { redirect } from "next/navigation";
import LoginPanel from "@/components/LoginPanel";
import { getSessionUser } from "@/lib/server";
import { COLLEGE_DOMAIN } from "@/lib/competitions";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }) {
  const user = await getSessionUser().catch(() => null);
  const next = typeof searchParams?.next === "string" ? searchParams.next : "/";
  if (user) redirect(next.startsWith("/") ? next : "/");

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-20">
      <h1 className="font-display text-4xl font-extrabold">Sign in</h1>
      <p className="mt-3 text-neutral-700">
        Use your college Google account. Registration is open to{" "}
        <span className="font-semibold text-ink">@{COLLEGE_DOMAIN}</span> addresses only.
      </p>

      <div className="mt-8 border-2 border-ink p-6 shadow-hard">
        <Suspense fallback={null}>
          <LoginPanel />
        </Suspense>
      </div>

      <p className="mt-6 text-sm text-neutral-600">
        Only the team leader needs an account. Teammates are added on the registration form.
      </p>
    </div>
  );
}
