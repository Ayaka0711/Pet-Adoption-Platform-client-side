// components/Modal.jsx
// Minimal, dependency-free modal (no DaisyUI) used for the adoption
// form, requests list, and update-pet dialogs.

import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ open, onClose, title, children, wide = false }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white dark:bg-charcoal rounded-card w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[90vh] overflow-y-auto p-6 relative`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-ink dark:text-paper">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 grid place-items-center rounded-card hover:bg-ink/10 dark:hover:bg-paper/10 text-charcoal dark:text-paper"
              >
                <FiX size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
