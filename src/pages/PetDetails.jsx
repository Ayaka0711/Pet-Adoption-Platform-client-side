// pages/PetDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaSyringe, FaHeartbeat, FaVenusMars, FaBirthdayCake } from "react-icons/fa";
import axiosSecure from "../api/axiosSecure";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchPet = () => {
    setLoading(true);
    axiosSecure
      .get(`/api/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch(() => toast.error("Could not load this pet's details"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Spinner fullScreen label="Fetching pet details..." />;
  if (!pet) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-charcoal/60 dark:text-paper/60">Pet not found.</p>
      </div>
    );
  }

  const isOwner = user?.email === pet.ownerEmail;

  const handleAdopt = async (e) => {
    e.preventDefault();
    const form = e.target;
    const pickupDate = form.pickupDate.value;
    const message = form.message.value;

    try {
      setSubmitting(true);
      await axiosSecure.post("/api/requests", { petId: pet._id, pickupDate, message });
      toast.success("Adoption request submitted!");
      setShowAdoptModal(false);
      navigate("/dashboard/my-requests");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="index-card overflow-hidden h-80 md:h-full">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=Pet+Photo")}
          />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-4xl text-ink dark:text-paper">{pet.name}</h1>
            {pet.adopted && (
              <span className="bg-charcoal text-paper text-xs font-medium px-2.5 py-1 rounded-card">Adopted</span>
            )}
          </div>
          <p className="text-charcoal/60 dark:text-paper/60 mb-6">{pet.breed} · {pet.species}</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2 text-charcoal/70 dark:text-paper/70">
              <FaBirthdayCake className="text-ink dark:text-amber" /> {pet.age} years old
            </div>
            <div className="flex items-center gap-2 text-charcoal/70 dark:text-paper/70">
              <FaVenusMars className="text-ink dark:text-amber" /> {pet.gender}
            </div>
            <div className="flex items-center gap-2 text-charcoal/70 dark:text-paper/70">
              <FaMapMarkerAlt className="text-ink dark:text-amber" /> {pet.location}
            </div>
            <div className="flex items-center gap-2 text-charcoal/70 dark:text-paper/70">
              <FaSyringe className="text-ink dark:text-amber" /> {pet.vaccinationStatus}
            </div>
            <div className="flex items-center gap-2 text-charcoal/70 dark:text-paper/70 col-span-2">
              <FaHeartbeat className="text-ink dark:text-amber" /> Health: {pet.healthStatus}
            </div>
          </div>

          <p className="text-charcoal/80 dark:text-paper/80 leading-relaxed mb-8">{pet.description}</p>

          <div className="flex items-center gap-4">
            <span className="font-display text-2xl text-moss dark:text-amber">
              {pet.adoptionFee > 0 ? `৳${pet.adoptionFee}` : "Free"}
            </span>

            {isOwner ? (
              <span className="text-sm text-charcoal/50 dark:text-paper/50 italic">
                This is your own listing — manage it from My Listings.
              </span>
            ) : pet.adopted ? (
              <button disabled className="btn-secondary opacity-50 cursor-not-allowed">
                Already Adopted
              </button>
            ) : (
              <button onClick={() => setShowAdoptModal(true)} className="btn-primary">
                Adopt Now
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal open={showAdoptModal} onClose={() => setShowAdoptModal(false)} title={`Adopt ${pet.name}`}>
        <form onSubmit={handleAdopt} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Pet Name</label>
            <input value={pet.name} readOnly className="input-field mt-1 bg-ink/5 dark:bg-paper/5" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Your Name</label>
            <input value={user?.name || ""} readOnly className="input-field mt-1 bg-ink/5 dark:bg-paper/5" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Your Email</label>
            <input value={user?.email || ""} readOnly className="input-field mt-1 bg-ink/5 dark:bg-paper/5" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Pickup Date</label>
            <input
              type="date"
              name="pickupDate"
              required
              min={new Date().toISOString().split("T")[0]}
              className="input-field mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Message to Owner</label>
            <textarea
              name="message"
              rows={3}
              placeholder="Tell the owner why you'd be a great fit..."
              className="input-field mt-1"
            />
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? "Submitting..." : "Submit Adoption Request"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PetDetails;
