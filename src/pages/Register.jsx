import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    const strongEnough = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    if (!strongEnough) {
      return setError(
        "Password needs at least 6 characters, with one uppercase and one lowercase letter."
      );
    }

    if (password !== confirmPassword) {
      return setError("Password and Confirm Password do not match.");
    }

    try {
      setSubmitting(true);
      await registerUser(name, email, password, photoURL);
      toast.success("Account created — welcome to PawHome!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong creating your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google");
      navigate("/");
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4 py-12">
      <div className="index-card w-full max-w-md p-8">
        <h1 className="font-display text-3xl text-ink mb-1">Join PawHome</h1>
        <p className="text-charcoal/60 text-sm mb-6">
          Create an account to adopt pets and list pets for adoption.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-charcoal/80">Name</label>
            <input name="name" type="text" required className="input-field mt-1" placeholder="Ayaka Rahman" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80">Email</label>
            <input name="email" type="email" required className="input-field mt-1" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80">Photo URL</label>
            <input name="photoURL" type="text" className="input-field mt-1" placeholder="https://..." />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80">Password</label>
            <input name="password" type="password" required className="input-field mt-1" placeholder="••••••••" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80">Confirm Password</label>
            <input name="confirmPassword" type="password" required className="input-field mt-1" placeholder="••••••••" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? "Creating account..." : "Create account"}
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
          Already have an account?{" "}
          <Link to="/login" className="text-ink font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;