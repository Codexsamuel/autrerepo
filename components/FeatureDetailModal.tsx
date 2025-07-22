import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface FeatureDetail {
  label: string;
  description: string;
  icon: string;
}

export default function FeatureDetailModal({ feature, onClose }: { feature: FeatureDetail; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg bg-[#181f2a] rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center overflow-hidden"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow-lg focus:outline-none"
            aria-label="Fermer le détail"
          >
            <X className="w-6 h-6" />
          </button>
          {/* Icône et titre */}
          <div className="flex flex-col items-center mb-6">
            <span className="text-5xl mb-2">{feature.icon}</span>
            <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              {feature.label}
            </h3>
          </div>
          {/* Illustration placeholder */}
          <div className="w-full h-40 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-4xl text-white/30">[Illustration]</span>
          </div>
          {/* Description */}
          <p className="text-lg text-gray-200 text-center mb-2">{feature.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 