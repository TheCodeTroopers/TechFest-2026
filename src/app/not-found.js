import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24">
      <h1 className="font-display text-5xl font-extrabold">Page not found</h1>
      <p className="mt-4 text-neutral-700">
        That link does not point anywhere on the fest site.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to competitions
      </Link>
    </div>
  );
}
