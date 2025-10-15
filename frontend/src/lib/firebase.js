import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

/**
 * Initialize Firebase app
 * @return {[Error | null, any | null]} A promise that resolves to an array containing an error (if any) and the Firebase app instance
 */
function firebaseInit() {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    return [null, auth];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
}

const [firebaseInitError, auth] = firebaseInit();
if (firebaseInitError) {
  console.error("Firebase initialization error:", firebaseInitError);
  throw firebaseInitError;
}

export { auth };
