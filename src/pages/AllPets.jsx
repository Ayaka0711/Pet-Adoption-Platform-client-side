// pages/AllPets.jsx
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axiosSecure from "../api/axiosSecure";
import PetCard from "../components/PetCard";
import Spinner from "../components/Spinner";

const SPECIES_OPTIONS = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState([]);
  const [sort, setSort] = useState("");
  const [hideAdopted, setHideAdopted] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (speciesFilter.length) params.species = speciesFilter.join(",");
      if (sort) params.sort = sort;
      if (hideAdopted) params.hideAdopted = "true";

      axiosSecure
        .get("/api/pets", { params })
        .then((res) => setPets(res.data))
        .catch(() => setPets([]))
        .finally(() => setLoading(false));
    }, 300); // debounce search typing

    return () => clearTimeout(timeout);
  }, [search, speciesFilter, sort, hideAdopted]);

  const toggleSpecies = (s) => {
    setSpeciesFilter((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl text-ink dark:text-paper mb-2">All Pets</h1>
      <p className="text-charcoal/60 dark:text-paper/60 mb-8">Find your future best friend.</p>

      {/* Search / Filter / Sort controls */}
      <div className="index-card bg-white dark:bg-charcoal/60 p-5 mb-8 flex flex-col gap-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pets by name..."
            className="input-field pl-11"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {SPECIES_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => toggleSpecies(s)}
              className={`text-sm px-3 py-1.5 rounded-card border transition-colors ${
                speciesFilter.includes(s)
                  ? "bg-ink text-paper border-ink"
                  : "border-ink/20 text-charcoal/70 dark:text-paper/70 hover:bg-ink/5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-charcoal/70 dark:text-paper/70">
            <input
              type="checkbox"
              checked={hideAdopted}
              onChange={(e) => setHideAdopted(e.target.checked)}
              className="accent-ink"
            />
            Hide already-adopted pets
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field !w-auto text-sm"
          >
            <option value="">Sort by: Newest</option>
            <option value="fee_asc">Adoption Fee: Low to High</option>
            <option value="fee_desc">Adoption Fee: High to Low</option>
            <option value="age_asc">Age: Youngest First</option>
            <option value="age_desc">Age: Oldest First</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Spinner label="Fetching pets..." />
      ) : pets.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-charcoal/50 dark:text-paper/50">No pets match your search. Try a different filter.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPets;
