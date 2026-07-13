import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      setSubmitting(true);
      await loginUser(email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4 py-12">
      <div className="index-card w-full max-w-md p-8">
        <h1 className="font-display text-3xl text-ink mb-1">Welcome back</h1>
        <p className="text-charcoal/60 text-sm mb-6">Log in to your PetHome account.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-charcoal/80">Email</label>
            <input name="email" type="email" required className="input-field mt-1" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80">Password</label>
            <input name="password" type="password" required className="input-field mt-1" placeholder="••••••••" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-ink/15 flex-1" />
          <span className="text-xs text-charcoal/40">OR</span>
          <div className="h-px bg-ink/15 flex-1" />
        </div>

        <button onClick={handleGoogle} className="btn-secondary w-full flex items-center justify-center gap-2">
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="text-sm text-charcoal/60 mt-6 text-center">
          New to PawHome?{" "}
          <Link to="/register" className="text-ink font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
