import { createContext, useContext } from "react";
import { authClient } from "../lib/auth-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // useSession() reactively tracks the current session — updates
  // automatically after login/logout, and on page refresh.
  const { data: session, isPending } = authClient.useSession();

  // ---- Register with email & password ----
  const registerUser = async (name, email, password, image) => {
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image, // optional photo URL
    });
    if (error) throw new Error(error.message || "Could not create account");
  };

  // ---- Login with email & password ----
  const loginUser = async (email, password) => {
    const { error } = await authClient.signIn.email({ email, password });
    if (error) throw new Error(error.message || "Invalid email or password");
  };

  const loginWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    // Must be an absolute URL back to the CLIENT app.
    callbackURL: window.location.origin,
  });
};

  // ---- Logout ----
  const logoutUser = async () => {
    await authClient.signOut();
  };

  const value = {
    user: session?.user || null,
    role: session?.user?.role || null,
    subscription: session?.user?.subscription || "free",
    loading: isPending,
    registerUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook — components call useAuth() instead of useContext(AuthContext) directly.
export const useAuth = () => useContext(AuthContext);
