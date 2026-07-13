import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-150 ${
    isActive ? "text-ink dark:text-amber" : "text-charcoal/70 hover:text-ink dark:text-paper/70 dark:hover:text-amber"
  }`;

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      setProfileOpen(false);
      navigate("/");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  const links = (
    <>
      <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/all-pets" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        All Pets
      </NavLink>
      <NavLink to="/dashboard/my-requests" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        My Requests
      </NavLink>
      <NavLink to="/dashboard/add-pet" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Add Pet
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-40 bg-paper/95 dark:bg-charcoal/95 backdrop-blur border-b border-ink/10 dark:border-paper/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-card bg-ink text-paper">
            <FaPaw size={16} />
          </span>
          <span className="font-display text-xl text-ink dark:text-paper">PetHome</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">{links}</div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 grid place-items-center rounded-card border border-ink/20 dark:border-paper/20 text-charcoal dark:text-paper hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.image || "https://api.dicebear.com/7.x/initials/svg?seed=" + (user.name || user.email)}
                  alt={user.name || "Profile"}
                  className="w-9 h-9 rounded-full object-cover border border-ink/20"
                />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 index-card bg-white dark:bg-charcoal p-2"
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <p className="px-3 py-2 text-sm font-medium text-charcoal dark:text-paper truncate">
                    {user.name || user.email}
                  </p>
                  <Link
                    to="/dashboard/my-listings"
                    onClick={() => setProfileOpen(false)}
                    className="block px-3 py-2 text-sm rounded-card hover:bg-ink/5 dark:hover:bg-paper/10 text-charcoal dark:text-paper"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm rounded-card hover:bg-ink/5 dark:hover:bg-paper/10 text-charcoal dark:text-paper"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-charcoal dark:text-paper"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-paper dark:bg-charcoal border-t border-ink/10 dark:border-paper/10">
          {links}
          <button
            onClick={toggleTheme}
            className="text-sm text-left text-charcoal/70 dark:text-paper/70 flex items-center gap-2"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />} Toggle theme
          </button>
          {user ? (
            <>
              <Link to="/dashboard/my-listings" onClick={() => setMenuOpen(false)} className="text-sm text-charcoal/70 dark:text-paper/70">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary w-full">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-primary w-full text-center">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
