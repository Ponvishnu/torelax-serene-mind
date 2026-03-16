import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";

export default function FloatingOfferBadge() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ delay: 1.5 }}
          className="fixed bottom-4 right-4 z-40 max-w-xs"
        >
          <Link
            to="/auth"
            className="block relative bg-card rounded-xl p-4 pr-10 shadow-lg border border-accent/30 animate-amber-glow"
          >
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVisible(false); }}
              className="absolute top-2 right-2 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <Gift className="w-8 h-8 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body font-semibold text-sm text-foreground">₹1000 Cashback Offer</p>
                <p className="font-body text-xs text-muted mt-0.5">Ends April 15 — Subscribe now!</p>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
