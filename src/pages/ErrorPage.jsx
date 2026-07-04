// pages/ErrorPage.jsx
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-4xl text-ink mb-2">Something went wrong</h1>
      <p className="text-charcoal/60 mb-6">
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <Link to="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
};

export default ErrorPage;
