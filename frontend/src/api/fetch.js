import { auth } from "@/lib/firebase";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get Firebase ID token of the currently authenticated user.
 */
async function getIdToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  return await user.getIdToken();
}

/**
 * Fetch wrapper to make authenticated API requests to the backend.
 * @param {string} endpoint - API endpoint (relative to API_URL)
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} - Fetch response
 */
async function fetchWithAuth(endpoint, options = {}) {
  const idToken = await getIdToken();

  return fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      ...options.headers,
    },
  });
}

export { fetchWithAuth };
