import { motion } from 'framer-motion';

/**
 * StepCard -- Wrapper card untuk setiap langkah visualisasi.
 */
export default function StepCard({ number, title, description, children }) {
  return (
    <motion.div
      className="as-step-card mb-4"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-3">
        {number && (
          <span className="as-badge bg-teal-500/15 border-teal-500/40 text-teal-400">
            {number}
          </span>
        )}
        <div>
          <h4 className="font-display font-bold text-sm uppercase text-base-100">{title}</h4>
          {description && <p className="text-xs text-base-400 mt-0.5">{description}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}
