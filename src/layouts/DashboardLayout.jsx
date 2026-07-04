// layouts/DashboardLayout.jsx
import { NavLink, Outlet, Link } from "react-router-dom";
import { FaPaw, FaPlus, FaList, FaClipboardList, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-card text-sm font-medium transition-colors ${
    isActive
      ? "bg-ink text-paper"
      : "text-charcoal/70 dark:text-paper/70 hover:bg-ink/10 dark:hover:bg-paper/10"
  }`;

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-paper dark:bg-charcoal transition-colors">
      <aside className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-ink/10 dark:border-paper/10 p-4 md:p-6">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <span className="grid place-items-center w-8 h-8 rounded-card bg-ink text-paper">
            <FaPaw size={14} />
          </span>
          <span className="font-display text-lg text-ink dark:text-paper">PawHome</span>
        </Link>

        {user && (
          <div className="index-card p-3 mb-6 flex items-center gap-3 bg-white dark:bg-charcoal/60">
            <img
              src={user.image || "https://api.dicebear.com/7.x/initials/svg?seed=" + (user.name || user.email)}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-charcoal dark:text-paper truncate">{user.name}</p>
              <p className="text-xs text-charcoal/50 dark:text-paper/50 truncate">{user.email}</p>
            </div>
          </div>
        )}

        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <NavLink to="/dashboard/add-pet" className={linkClass}>
            <FaPlus size={14} /> <span className="whitespace-nowrap">Add Pet</span>
          </NavLink>
          <NavLink to="/dashboard/my-listings" className={linkClass}>
            <FaList size={14} /> <span className="whitespace-nowrap">My Listings</span>
          </NavLink>
          <NavLink to="/dashboard/my-requests" className={linkClass}>
            <FaClipboardList size={14} /> <span className="whitespace-nowrap">My Requests</span>
          </NavLink>
        </nav>

        <Link
          to="/"
          className="hidden md:flex items-center gap-2 text-sm text-charcoal/60 dark:text-paper/60 hover:text-ink dark:hover:text-amber mt-8"
        >
          <FaArrowLeft size={12} /> Back to site
        </Link>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
