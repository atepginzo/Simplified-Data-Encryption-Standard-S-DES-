import { motion } from 'framer-motion';
import useSDESStore from '../../store/useSDESStore';
import BitDisplay from '../shared/BitDisplay';

export default function OutputResult() {
  const result = useSDESStore((s) => s.result);
  const mode = useSDESStore((s) => s.mode);

  if (!result) return null;

  const label = mode === 'encrypt' ? 'Ciphertext' : 'Plaintext';

  return (
    <section className="max-w-[1280px] mx-auto px-6 mb-8">
      <motion.div
        className="as-card p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-base-700">
          <span className="as-badge bg-violet-500/15 border-violet-400/40 text-violet-400">OUT</span>
          <div>
            <h2 className="font-display text-xl font-bold uppercase text-base-50">
              Hasil {label}
            </h2>
            <p className="text-sm text-base-400">
              Hasil proses {mode === 'encrypt' ? 'enkripsi' : 'dekripsi'} S-DES
            </p>
          </div>
        </div>

        <div className="as-card-inner p-5 text-center">
          <p className="text-xs text-base-400 font-body uppercase tracking-wide mb-3">{label} (8-bit)</p>
          <div className="flex justify-center">
            <BitDisplay bits={result.output} size="lg" />
          </div>
          <p className="font-mono text-2xl font-bold text-teal-400 mt-4">
            {result.outputString}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
