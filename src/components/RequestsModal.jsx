// components/RequestsModal.jsx
// Shown from My Listings -> "Requests" button on a pet card. Lets the
// pet owner approve/reject requests. Once one request is approved, the
// server rejects all other pending requests for that pet automatically.

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosSecure from "../api/axiosSecure";
import Modal from "./Modal";
import Spinner from "./Spinner";

const statusStyles = {
  pending: "bg-amber/20 text-amber",
  approved: "bg-moss/20 text-moss",
  rejected: "bg-red-500/10 text-red-500",
};

const RequestsModal = ({ pet, open, onClose, onDecisionMade }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState(null);

  const fetchRequests = () => {
    if (!pet) return;
    setLoading(true);
    axiosSecure
      .get(`/api/requests/pet/${pet._id}`)
      .then((res) => setRequests(res.data))
      .catch(() => toast.error("Could not load requests"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (open) fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pet]);

  const decide = async (requestId, status) => {
    try {
      setActingId(requestId);
      await axiosSecure.patch(`/api/requests/${requestId}`, { status });
      toast.success(`Request ${status}`);
      fetchRequests();
      onDecisionMade?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update request");
    } finally {
      setActingId(null);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Requests for ${pet?.name || ""}`} wide>
      {loading ? (
        <Spinner label="Loading requests..." />
      ) : requests.length === 0 ? (
        <p className="text-sm text-charcoal/50 dark:text-paper/50">No adoption requests yet.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r._id} className="index-card p-4 bg-paper dark:bg-charcoal/60 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-charcoal dark:text-paper">{r.requesterName}</p>
                <p className="text-xs text-charcoal/50 dark:text-paper/50">{r.requesterEmail}</p>
                <p className="text-xs text-charcoal/50 dark:text-paper/50 mt-1">Pickup: {r.pickupDate}</p>
                {r.message && <p className="text-sm text-charcoal/70 dark:text-paper/70 mt-1 italic">"{r.message}"</p>}
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-card capitalize ${statusStyles[r.status]}`}>
                  {r.status}
                </span>
                {r.status === "pending" && (
                  <>
                    <button
                      onClick={() => decide(r._id, "approved")}
                      disabled={actingId === r._id}
                      className="text-xs font-medium px-3 py-1.5 rounded-card bg-moss text-white hover:brightness-95 disabled:opacity-60"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => decide(r._id, "rejected")}
                      disabled={actingId === r._id}
                      className="text-xs font-medium px-3 py-1.5 rounded-card border border-red-400 text-red-500 hover:bg-red-50 disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default RequestsModal;
