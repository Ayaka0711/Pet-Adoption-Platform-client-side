import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-6xl text-ink mb-2">404</h1>
      <p className="text-charcoal/60 mb-6">This page doesn't exist — the card isn't in the catalog.</p>
      <Link to="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
