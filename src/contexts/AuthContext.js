import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

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

  // Function to handle logout
  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  // Auto-logout after one hour of inactivity
  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logOut, 60 * 60 * 1000); // 1 hour
    };

    if (user) {
      // Set up event listeners for user activity
      window.addEventListener("mousemove", resetInactivityTimer);
      window.addEventListener("keypress", resetInactivityTimer);
      resetInactivityTimer();
    }

    return () => {
      // Clean up event listeners and timer
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keypress", resetInactivityTimer);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [user, logOut]);

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
    <AuthContext.Provider value={{ logIn, logOut, user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
