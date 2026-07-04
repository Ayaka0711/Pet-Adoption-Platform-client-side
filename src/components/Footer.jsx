// components/Footer.jsx
import { Link } from "react-router-dom";
import { FaPaw, FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-paper mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center w-8 h-8 rounded-card bg-amber text-charcoal">
              <FaPaw size={14} />
            </span>
            <span className="font-display text-lg">PawHome</span>
          </Link>
          <p className="text-sm text-paper/60">
            Connecting loving homes with pets who need one — one adoption at a time.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-paper/60">
            <li><Link to="/" className="hover:text-amber">Home</Link></li>
            <li><Link to="/all-pets" className="hover:text-amber">All Pets</Link></li>
            <li><Link to="/dashboard/add-pet" className="hover:text-amber">Add a Pet</Link></li>
            <li><Link to="/dashboard/my-requests" className="hover:text-amber">My Requests</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-paper/60">
            <li className="flex items-center gap-2"><FaEnvelope /> hello@pawhome.org</li>
            <li className="flex items-center gap-2"><FaPhone /> +880 1234-567890</li>
            <li>Narayanganj, Dhaka, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-3">Follow Us</h3>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center rounded-card bg-paper/10 hover:bg-amber hover:text-charcoal transition-colors">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center rounded-card bg-paper/10 hover:bg-amber hover:text-charcoal transition-colors">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center rounded-card bg-paper/10 hover:bg-amber hover:text-charcoal transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10 py-4 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} PawHome. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
