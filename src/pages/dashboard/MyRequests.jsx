// pages/dashboard/MyRequests.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaTimes } from "react-icons/fa";
import axiosSecure from "../../api/axiosSecure";
import Spinner from "../../components/Spinner";
import ConfirmDialog from "../../components/ConfirmDialog";

const statusStyles = {
  pending: "bg-amber/20 text-amber",
  approved: "bg-moss/20 text-moss",
  rejected: "bg-red-500/10 text-red-500",
};

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchRequests = () => {
    setLoading(true);
    axiosSecure
      .get("/api/requests/mine")
      .then((res) => setRequests(res.data))
      .catch(() => toast.error("Could not load your requests"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCancel = async () => {
    if (!cancelTarget) return;
    try {
      setCancelling(true);
      await axiosSecure.delete(`/api/requests/${cancelTarget._id}`);
      toast.success("Request cancelled");
      setCancelTarget(null);
      fetchRequests();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel request");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Spinner label="Loading your requests..." />;

  return (
    <div>
      <h1 className="font-display text-3xl text-ink dark:text-paper mb-1">My Requests</h1>
      <p className="text-charcoal/60 dark:text-paper/60 mb-8">Track the adoption requests you've submitted.</p>

      {requests.length === 0 ? (
        <div className="index-card bg-white dark:bg-charcoal/60 p-10 text-center">
          <p className="text-charcoal/60 dark:text-paper/60 mb-4">You haven't requested to adopt any pets yet.</p>
          <Link to="/all-pets" className="btn-primary">Browse Pets</Link>
        </div>
      ) : (
        <div className="overflow-x-auto index-card bg-white dark:bg-charcoal/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-ink/10 dark:border-paper/10 text-charcoal/50 dark:text-paper/50">
                <th className="p-4">Pet</th>
                <th className="p-4">Requested On</th>
                <th className="p-4">Pickup Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id} className="border-b border-ink/5 dark:border-paper/5 last:border-0">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={r.petImage}
                      alt={r.petName}
                      className="w-10 h-10 rounded-card object-cover"
                      onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100?text=Pet")}
                    />
                    <span className="font-medium text-charcoal dark:text-paper">{r.petName}</span>
                  </td>
                  <td className="p-4 text-charcoal/70 dark:text-paper/70">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-charcoal/70 dark:text-paper/70">{r.pickupDate}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-card capitalize ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/pets/${r.petId}`}
                        className="w-8 h-8 grid place-items-center rounded-card border border-ink/20 dark:border-paper/20 text-charcoal dark:text-paper hover:bg-ink/5 dark:hover:bg-paper/10"
                        title="View pet"
                      >
                        <FaEye size={12} />
                      </Link>
                      {r.status === "pending" && (
                        <button
                          onClick={() => setCancelTarget(r)}
                          className="w-8 h-8 grid place-items-center rounded-card border border-red-300 text-red-500 hover:bg-red-50"
                          title="Cancel request"
                        >
                          <FaTimes size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        confirming={cancelling}
        title="Cancel this request?"
        message={`Your adoption request for "${cancelTarget?.petName}" will be removed.`}
      />
    </div>
  );
};

export default MyRequests;
