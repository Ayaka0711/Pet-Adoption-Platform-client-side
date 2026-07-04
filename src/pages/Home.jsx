// pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaHandsHelping, FaShieldAlt, FaSearch, FaHome, FaSyringe } from "react-icons/fa";
import axiosSecure from "../api/axiosSecure";
import PetCard from "../components/PetCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/api/pets/featured")
      .then((res) => setFeatured(res.data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ---- Banner / Hero ---- */}
      <section className="relative overflow-hidden bg-ink dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-6xl text-paper leading-tight"
          >
            Every pet deserves <span className="text-amber">a loving home</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-paper/70 max-w-xl mx-auto"
          >
            Browse dogs, cats, birds, rabbits and more waiting for a family. Adopt, don't shop —
            give a rescued pet its happy ending.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <Link to="/all-pets" className="bg-amber text-charcoal font-medium px-6 py-3 rounded-card hover:brightness-95 transition">
              Adopt Now
            </Link>
            <Link to="/dashboard/add-pet" className="border border-paper/30 text-paper px-6 py-3 rounded-card hover:bg-paper/10 transition">
              List a Pet
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---- Featured Pets ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl text-ink dark:text-paper">Featured Pets</h2>
            <p className="text-charcoal/60 dark:text-paper/60 mt-1">Meet a few friends looking for a home right now.</p>
          </div>
          <Link to="/all-pets" className="hidden sm:block text-ink dark:text-amber font-medium hover:underline">
            See all pets →
          </Link>
        </div>

        {loading ? (
          <Spinner label="Fetching featured pets..." />
        ) : featured.length === 0 ? (
          <p className="text-charcoal/50 dark:text-paper/50">No pets listed yet — be the first to add one!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </section>

      {/* ---- Why Adopt Pets ---- */}
      <section className="bg-white dark:bg-charcoal/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl text-ink dark:text-paper mb-10 text-center">Why Adopt a Pet?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <FaHeart />, title: "Save a Life", text: "Every adoption frees up space and resources for another animal in need." },
              { icon: <FaHandsHelping />, title: "Unconditional Love", text: "Rescued pets are known to form deep bonds with the people who give them a second chance." },
              { icon: <FaShieldAlt />, title: "Health Checked", text: "Listed pets come with health and vaccination status so you know exactly what to expect." },
            ].map((item, i) => (
              <div key={i} className="index-card p-6 bg-paper dark:bg-charcoal/60">
                <div className="w-10 h-10 rounded-card bg-ink/10 dark:bg-amber/10 text-ink dark:text-amber grid place-items-center mb-4 text-lg">
                  {item.icon}
                </div>
                <h3 className="font-medium text-charcoal dark:text-paper mb-1">{item.title}</h3>
                <p className="text-sm text-charcoal/60 dark:text-paper/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How Adoption Works (extra static section) ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-3xl text-ink dark:text-paper mb-10 text-center">How Adoption Works</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: <FaSearch />, step: "1. Browse", text: "Explore profiles of pets available for adoption near you." },
            { icon: <FaHandsHelping />, step: "2. Request", text: "Fill out a short adoption form with your pickup date." },
            { icon: <FaHome />, step: "3. Welcome Home", text: "Once approved, arrange pickup and welcome your new companion." },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-ink text-paper grid place-items-center text-xl mb-3">
                {item.icon}
              </div>
              <h3 className="font-medium text-charcoal dark:text-paper">{item.step}</h3>
              <p className="text-sm text-charcoal/60 dark:text-paper/60 mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Success Stories ---- */}
      <section className="bg-ink/5 dark:bg-paper/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl text-ink dark:text-paper mb-10 text-center">Success Stories</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: "Rima & Tuni", text: "Tuni was shy at first, but within a week she was following Rima everywhere. Best decision we've made." },
              { name: "Farhan & Bruno", text: "Bruno was overlooked for months because of his age. Now he's the happiest senior dog on the block." },
              { name: "The Islam Family", text: "We adopted two bunnies together so they'd never be lonely — they're inseparable, and so are we now." },
            ].map((s, i) => (
              <div key={i} className="index-card p-6 bg-white dark:bg-charcoal/60">
                <p className="text-sm text-charcoal/70 dark:text-paper/70 italic mb-3">"{s.text}"</p>
                <p className="text-sm font-medium text-ink dark:text-amber">— {s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Pet Care Tips ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-3xl text-ink dark:text-paper mb-10 text-center">Pet Care Tips</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: <FaSyringe />, title: "Keep Vaccinations Current", text: "Schedule regular vet visits and keep booster shots on time." },
            { icon: <FaHeart />, title: "Daily Exercise", text: "Even small pets need playtime — it keeps them healthy and happy." },
            { icon: <FaHome />, title: "Safe Environment", text: "Pet-proof your home: secure cords, small objects, and toxic plants." },
          ].map((tip, i) => (
            <div key={i} className="index-card p-6 bg-white dark:bg-charcoal/60">
              <div className="w-10 h-10 rounded-card bg-moss/10 text-moss grid place-items-center mb-4 text-lg">
                {tip.icon}
              </div>
              <h3 className="font-medium text-charcoal dark:text-paper mb-1">{tip.title}</h3>
              <p className="text-sm text-charcoal/60 dark:text-paper/60">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Adoption FAQs (extra static section) ---- */}
      <section className="bg-white dark:bg-charcoal/40 py-16 mb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl text-ink dark:text-paper mb-10 text-center">Adoption FAQs</h2>
          <div className="space-y-4">
            {[
              { q: "Is there an adoption fee?", a: "Some listings include a small fee to cover vet costs; many pets are free to adopt." },
              { q: "Can I meet the pet before adopting?", a: "Yes — coordinate a pickup date and time directly with the pet owner through your request." },
              { q: "What if my request is rejected?", a: "You can browse other pets any time — owners may reject a request for reasons like distance or a better match found." },
            ].map((f, i) => (
              <div key={i} className="index-card p-5 bg-paper dark:bg-charcoal/60">
                <p className="font-medium text-charcoal dark:text-paper mb-1">{f.q}</p>
                <p className="text-sm text-charcoal/60 dark:text-paper/60">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
