// components/PrivateRoute.jsx
// Wraps any route that requires login. Crucially: while `loading` is true
// (Firebase is still checking if a session exists) we show a spinner
// instead of redirecting — this is what stops a logged-in user from
// getting bounced to /login on a page refresh, which is a common bug.

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-paper">
        <span className="loading loading-spinner w-10 h-10 text-ink"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  // Send them to login, but remember where they were trying to go
  // so we can send them back after a successful login.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
