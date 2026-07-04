// pages/dashboard/MyListings.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaEye, FaClipboardList } from "react-icons/fa";
import axiosSecure from "../../api/axiosSecure";
import Spinner from "../../components/Spinner";
import RequestsModal from "../../components/RequestsModal";
import ConfirmDialog from "../../components/ConfirmDialog";

const MyListings = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsPet, setRequestsPet] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPets = () => {
    setLoading(true);
    axiosSecure
      .get("/api/pets/mine")
      .then((res) => setPets(res.data))
      .catch(() => toast.error("Could not load your listings"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await axiosSecure.delete(`/api/pets/${deleteTarget._id}`);
      toast.success("Listing deleted");
      setDeleteTarget(null);
      fetchPets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete listing");
    } finally {
      setDeleting(false);
    }
  };

  const stats = {
    total: pets.length,
    available: pets.filter((p) => !p.adopted).length,
    adopted: pets.filter((p) => p.adopted).length,
  };

  if (loading) return <Spinner label="Loading your listings..." />;

  return (
    <div>
      <h1 className="font-display text-3xl text-ink dark:text-paper mb-1">My Listings</h1>
      <p className="text-charcoal/60 dark:text-paper/60 mb-6">Manage the pets you've listed for adoption.</p>

      <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg">
        <div className="index-card bg-white dark:bg-charcoal/60 p-4 text-center">
          <p className="text-2xl font-display text-ink dark:text-paper">{stats.total}</p>
          <p className="text-xs text-charcoal/50 dark:text-paper/50">Total</p>
        </div>
        <div className="index-card bg-white dark:bg-charcoal/60 p-4 text-center">
          <p className="text-2xl font-display text-moss">{stats.available}</p>
          <p className="text-xs text-charcoal/50 dark:text-paper/50">Available</p>
        </div>
        <div className="index-card bg-white dark:bg-charcoal/60 p-4 text-center">
          <p className="text-2xl font-display text-amber">{stats.adopted}</p>
          <p className="text-xs text-charcoal/50 dark:text-paper/50">Adopted</p>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="index-card bg-white dark:bg-charcoal/60 p-10 text-center">
          <p className="text-charcoal/60 dark:text-paper/60 mb-4">You haven't listed any pets yet.</p>
          <Link to="/dashboard/add-pet" className="btn-primary">Add Your First Pet</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="index-card bg-white dark:bg-charcoal/60 overflow-hidden flex flex-col">
              <div className="relative h-40">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=Pet+Photo")}
                />
                {pet.adopted && (
                  <span className="absolute top-2 left-2 bg-charcoal/80 text-paper text-xs font-medium px-2 py-1 rounded-card">
                    Adopted
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-medium text-charcoal dark:text-paper">{pet.name}</h3>
                <p className="text-sm text-moss dark:text-amber mb-3">
                  {pet.adoptionFee > 0 ? `৳${pet.adoptionFee}` : "Free"}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setRequestsPet(pet)}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-card border border-ink/20 dark:border-paper/20 text-charcoal dark:text-paper hover:bg-ink/5 dark:hover:bg-paper/10"
                  >
                    <FaClipboardList size={12} /> Requests
                  </button>
                  <Link
                    to={`/pets/${pet._id}`}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-card border border-ink/20 dark:border-paper/20 text-charcoal dark:text-paper hover:bg-ink/5 dark:hover:bg-paper/10"
                  >
                    <FaEye size={12} /> View
                  </Link>
                  <Link
                    to={`/dashboard/update-pet/${pet._id}`}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-card border border-ink/20 dark:border-paper/20 text-charcoal dark:text-paper hover:bg-ink/5 dark:hover:bg-paper/10"
                  >
                    <FaEdit size={12} /> Edit
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(pet)}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-card border border-red-300 text-red-500 hover:bg-red-50"
                  >
                    <FaTrash size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <RequestsModal
        pet={requestsPet}
        open={!!requestsPet}
        onClose={() => setRequestsPet(null)}
        onDecisionMade={fetchPets}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        confirming={deleting}
        title="Delete this listing?"
        message={`"${deleteTarget?.name}" and all of its adoption requests will be permanently removed.`}
      />
    </div>
  );
};

export default MyListings;
