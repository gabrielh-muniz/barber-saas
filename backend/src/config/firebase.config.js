import { config } from "dotenv";
import admin from "firebase-admin";

config();

/**
 * Initialize Firebase Admin SDK
 */
try {
  const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  if (!admin.apps.length)
    admin.initializeApp({
      credential: admin.credential.cert(creds),
    });
} catch (error) {
  console.error("Firebase Admin initialization error:", error);
  throw error;
}

export { admin };
