// pages/dashboard/UpdatePet.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import axiosSecure from "../../api/axiosSecure";
import PetForm from "../../components/PetForm";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/AuthContext";

const UpdatePet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/api/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch(() => toast.error("Could not load this listing"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner label="Loading listing..." />;

  if (!pet) {
    return <p className="text-charcoal/60 dark:text-paper/60">Listing not found.</p>;
  }

  if (pet.ownerEmail !== user?.email) {
    return <p className="text-charcoal/60 dark:text-paper/60">You don't have permission to edit this listing.</p>;
  }

  const handleUpdate = async (data) => {
    try {
      setSubmitting(true);
      await axiosSecure.patch(`/api/pets/${id}`, data);
      toast.success("Listing updated!");
      navigate("/dashboard/my-listings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update listing");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Link to="/dashboard/my-listings" className="flex items-center gap-2 text-sm text-charcoal/60 dark:text-paper/60 hover:text-ink dark:hover:text-amber mb-4">
        <FaArrowLeft size={12} /> Back to My Listings
      </Link>
      <h1 className="font-display text-3xl text-ink dark:text-paper mb-1">Update {pet.name}'s Listing</h1>
      <p className="text-charcoal/60 dark:text-paper/60 mb-8">Make changes and save when you're ready.</p>

      <div className="index-card bg-white dark:bg-charcoal/60 p-6">
        <PetForm initialData={pet} onSubmit={handleUpdate} submitting={submitting} submitLabel="Save Changes" />
      </div>
    </div>
  );
};

export default UpdatePet;
