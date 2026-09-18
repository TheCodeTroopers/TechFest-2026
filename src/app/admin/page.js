import Link from "next/link";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { requireAdmin, getSettings } from "@/lib/server";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function AdminPage() {
  const { user, admin } = await requireAdmin();

  if (!user) redirect("/login?next=/admin");

  if (!admin) {
    // Non-admins get a dead end, not a hint that they were close.
    return (
      <div className="mx-auto max-w-lg px-5 py-24">
        <h1 className="font-display text-4xl font-extrabold">Not found</h1>
        <p className="mt-4 text-neutral-700">
          This page is not available for {user.email}.
        </p>
        <Link href="/" className="btn-quiet mt-8">
          Back to the fest
        </Link>
      </div>
    );
  }

  const settings = await getSettings();
  return <AdminDashboard initialSettings={settings} adminEmail={user.email} />;
}
