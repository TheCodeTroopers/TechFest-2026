import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function SiteHeader({ user }) {
  return (
    <header className="border-b-2 border-ink">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight">
         TECH FEST<span className="bg-signal px-1">2026</span>
        </Link>

        <nav className="ml-auto flex items-center gap-1 text-sm font-semibold">
          <Link href="/" className="px-3 py-2 hover:bg-wash">
            Home
          </Link>
          <Link href="/#competitions" className="px-3 py-2 hover:bg-wash">
            Competitions
          </Link>
          <Link href="/rulebook" className="hidden px-3 py-2 hover:bg-wash sm:block">
            Rule book
          </Link>
          <Link href="/#faq" className="hidden px-3 py-2 hover:bg-wash lg:block">
            FAQ
          </Link>
          {user ? (
            <div className="ml-2 flex items-center gap-2 border-l-2 border-rule pl-3">
              <span className="hidden max-w-[14rem] truncate text-neutral-600 sm:block">
                {user.email}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <Link href="/login" className="btn-primary ml-2 px-4 py-2 text-sm">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}