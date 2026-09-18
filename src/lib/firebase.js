// Client-side Firebase. Used for Google Sign-In only — every read and write
// to Firestore goes through a server route, so the browser never touches the DB.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length ? getApp() : initializeApp(config);
export const auth = getAuth(app);

export function googleProvider() {
  const provider = new GoogleAuthProvider();
  // Nudges the Google account chooser toward college accounts.
  provider.setCustomParameters({
    hd: process.env.NEXT_PUBLIC_COLLEGE_DOMAIN || "sode-edu.in",
    prompt: "select_account",
  });
  return provider;
}
