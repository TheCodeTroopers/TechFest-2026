"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { COLLEGE_DOMAIN, isCollegeEmail } from "@/lib/competitions";

export default function LoginPanel() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSignIn() {
    setBusy(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider());

      // First gate: wrong domain never gets a session cookie.
      if (!isCollegeEmail(result.user.email)) {
        await signOut(auth);
        setError(`Please use your college email (@${COLLEGE_DOMAIN}).`);
        return;
      }

      const idToken = await result.user.getIdToken(true);
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        await signOut(auth);
        setError(data.error || "Sign-in failed. Try again.");
        return;
      }

      router.replace(next.startsWith("/") ? next : "/");
      router.refresh();
    } catch (err) {
      if (err?.code === "auth/popup-closed-by-user") {
        setError("The Google window closed before sign-in finished.");
      } else if (err?.code === "auth/unauthorized-domain") {
        setError("This domain is not on the Firebase authorised domains list yet.");
      } else {
        setError("Sign-in failed. Check your connection and try again.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button onClick={handleSignIn} disabled={busy} className="btn-primary w-full">
        {busy ? "Opening Google" : "Continue with Google"}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-4 border-2 border-ink bg-wash px-3 py-2 text-sm font-semibold"
        >
          {error}
        </p>
      )}
    </div>
  );
}
