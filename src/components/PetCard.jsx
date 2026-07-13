import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaSyringe } from "react-icons/fa";

const PetCard = ({ pet }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="index-card bg-white dark:bg-charcoal/60 overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=Pet+Photo";
          }}
        />
        {pet.adopted && (
          <span className="absolute top-3 left-3 bg-charcoal/80 text-paper text-xs font-medium px-2.5 py-1 rounded-card">
            Adopted
          </span>
        )}
        <span className="absolute top-3 right-3 bg-amber text-charcoal text-xs font-medium px-2.5 py-1 rounded-card">
          {pet.species}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl text-ink dark:text-paper mb-1">{pet.name}</h3>
        <p className="text-sm text-charcoal/60 dark:text-paper/60 mb-3">
          {pet.breed} · {pet.age} {pet.age === 1 ? "yr" : "yrs"} · {pet.gender}
        </p>

        <div className="flex items-center gap-4 text-xs text-charcoal/50 dark:text-paper/50 mb-4">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt /> {pet.location}
          </span>
          <span className="flex items-center gap-1">
            <FaSyringe /> {pet.vaccinationStatus}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-medium text-moss dark:text-amber">
            {pet.adoptionFee > 0 ? `Fee: ৳${pet.adoptionFee}` : "Free"}
          </span>
          <Link to={`/pets/${pet._id}`} className="btn-secondary !py-2 !px-4 text-sm">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;
