import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle login
  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  useEffect(() => {
    let inactivityTimer;
    let sessionTimer;

    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logOut, 60 * 60 * 1000); // 1 hour of inactivity
    };

    const setupSessionTimeout = () => {
      sessionTimer = setTimeout(logOut, 8 * 60 * 60 * 1000); // 8 hours max session time
    };

    // Check for multiple tabs
    const checkMultipleTabs = () => {
      const tabCount = parseInt(localStorage.getItem("tabCount") || "0");
      if (tabCount > 1) {
        logOut();
      }
    };

    // Check for network status
    const checkNetworkStatus = () => {
      if (!navigator.onLine) {
        logOut();
      }
    };

    if (user) {
      // Set up event listeners for user activity
      window.addEventListener("mousemove", resetInactivityTimer);
      window.addEventListener("keypress", resetInactivityTimer);
      window.addEventListener("scroll", resetInactivityTimer);
      window.addEventListener("click", resetInactivityTimer);

      // Set up session timeout
      setupSessionTimeout();

      localStorage.setItem(
        "tabCount",
        (parseInt(localStorage.getItem("tabCount") || "0") + 1).toString()
      );
      window.addEventListener("storage", checkMultipleTabs);

      window.addEventListener("offline", checkNetworkStatus);

      resetInactivityTimer();
    }

    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keypress", resetInactivityTimer);
      window.removeEventListener("scroll", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
      window.removeEventListener("storage", checkMultipleTabs);
      window.removeEventListener("offline", checkNetworkStatus);

      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (sessionTimer) clearTimeout(sessionTimer);

      if (user) {
        const tabCount = parseInt(localStorage.getItem("tabCount") || "0");
        localStorage.setItem("tabCount", (tabCount - 1).toString());
      }
    };
  }, [user, logOut]);

  // Add this new function for password reset
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Provide auth context to children components
  return (
    <AuthContext.Provider value={{ logIn, logOut, user, loading, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
