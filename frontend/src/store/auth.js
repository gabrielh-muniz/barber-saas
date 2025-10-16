import { create } from "zustand";
import { auth } from "@/lib/firebase";
import { to } from "@/lib/errorHandler";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const defaultStates = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

/**
 * Zustand store for authentication state management
 */
const useAuthStore = create((set) => ({
  ...defaultStates,

  /**
   * Set user and auth state (used by listener)
   * @param {Object|null} user - Firebase user object or null
   */
  setUser: (user) =>
    set({
      user,
      isLoading: false,
      isAuthenticated: !!user,
      error: null,
    }),

  /**
   * Clear error message
   */
  clearError: () => set({ error: null }),

  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<[Error|null, Object|null]>} [error, user] tuple
   */
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const [error, userCredential] = await to(
      signInWithEmailAndPassword(auth, email, password),
    );

    if (error) {
      set({ isLoading: false, error: error.message || "Failed to sign in" });
      return [error, null];
    }

    set({
      user: userCredential.user,
      isLoading: false,
      isAuthenticated: true,
      error: null,
    });
    return [null, userCredential.user];
  },

  /**
   * Sign out the current user
   * @returns {Promise<[Error|null, boolean|null]>} [error, success] tuple
   */
  signOut: async () => {
    set({ isLoading: true, error: null });
    const [error, _] = await to(firebaseSignOut(auth));

    if (error) {
      set({ isLoading: false, error: error.message || "Failed to sign out" });
      return [error, null];
    }

    set({ ...defaultStates, isLoading: false });
    return [null, true];
  },

  /**
   * Sign up with email and password (create user)
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} displayName - User display name
   * @returns {Promise<[Error|null, Object|null]>} [error, user] tuple
   */
  signUp: async (email, password, displayName) => {
    set({ isLoading: true, error: null });
    const [error, userCredential] = await to(
      createUserWithEmailAndPassword(auth, email, password),
    );

    if (error) {
      set({ isLoading: false, error: error.message || "Failed to sign up" });
      return [error, null];
    }

    // Update profile with display name if provided
    if (displayName && userCredential.user) {
      const [updateError, _] = await to(
        updateProfile(userCredential.user, { displayName }),
      );

      if (updateError) {
        set({
          isLoading: false,
          error: updateError.message || "Failed to update profile",
        });
        return [updateError, null];
      }
    }

    set({
      user: userCredential.user,
      isLoading: false,
      isAuthenticated: true,
      error: null,
    });
    return [null, userCredential.user];
  },
}));

// Set up Firebase auth state listener (runs once on module load)
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});

export default useAuthStore;
