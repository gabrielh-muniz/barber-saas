import { config } from "dotenv";
import admin from "firebase-admin";

config();

/**
 * Initialize Firebase Admin SDK
 */
try {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL)
    throw new Error("Missing Firebase configuration. Required env vars");

  if (!admin.apps.length)
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
} catch (error) {
  console.error("Firebase Admin initialization error:", error);
  throw error;
}

export { admin };
