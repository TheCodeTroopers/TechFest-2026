"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    setBusy(true);
    try {
      await signOut(auth).catch(() => {});
      await fetch("/api/auth/session", { method: "DELETE" });
      router.replace("/");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button onClick={handleSignOut} disabled={busy} className="btn-quiet px-3 py-2 text-sm">
      {busy ? "Signing out" : "Sign out"}
    </button>
  );
}
