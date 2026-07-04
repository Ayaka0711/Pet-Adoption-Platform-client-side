// components/ConfirmDialog.jsx
import Modal from "./Modal";

const ConfirmDialog = ({ open, onClose, onConfirm, title = "Are you sure?", message, confirming }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-charcoal/70 dark:text-paper/70 mb-6">{message}</p>
      <div className="flex gap-3">
        <button onClick={onClose} className="btn-secondary flex-1">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={confirming}
          className="flex-1 bg-red-600 text-white font-medium px-5 py-2.5 rounded-card hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {confirming ? "Please wait..." : "Yes, Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
