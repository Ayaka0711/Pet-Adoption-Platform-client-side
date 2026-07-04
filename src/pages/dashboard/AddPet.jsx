// pages/dashboard/AddPet.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosSecure from "../../api/axiosSecure";
import PetForm from "../../components/PetForm";

const AddPet = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (data) => {
    try {
      setSubmitting(true);
      await axiosSecure.post("/api/pets", data);
      toast.success("Pet listed successfully!");
      navigate("/dashboard/my-listings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add pet listing");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl text-ink dark:text-paper mb-1">Add a Pet</h1>
      <p className="text-charcoal/60 dark:text-paper/60 mb-8">List a pet that's ready for adoption.</p>

      <div className="index-card bg-white dark:bg-charcoal/60 p-6">
        <PetForm onSubmit={handleAdd} submitting={submitting} submitLabel="Add Pet" />
      </div>
    </div>
  );
};

export default AddPet;
