import { useEffect } from "react";
import { RiStarSmileLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const PointToast = ({ points = 5, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Auto-close after 2s
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 px-6 py-4 bg-zinc-900 border border-orange-400 rounded-2xl shadow-xl text-center text-white flex flex-col items-center gap-2"
        >
          <RiStarSmileLine className="text-orange-400 text-4xl animate-bounce" />
          <h3 className="text-lg font-semibold text-orange-300">
            +{points} Points Gained!
          </h3>
          <p className="text-sm text-zinc-300">
            Great job! Keep progressing 🚀
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PointToast;
