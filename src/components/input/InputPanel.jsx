import { motion } from 'framer-motion';
import { Play, RotateCcw, Wand2 } from 'lucide-react';
import useSDESStore from '../../store/useSDESStore';
import BitInput from './BitInput';
import ModeSelector from './ModeSelector';

export default function InputPanel() {
  const mode = useSDESStore((s) => s.mode);
  const plaintext = useSDESStore((s) => s.plaintext);
  const key = useSDESStore((s) => s.key);
  const setMode = useSDESStore((s) => s.setMode);
  const setPlaintextBit = useSDESStore((s) => s.setPlaintextBit);
  const setKeyBit = useSDESStore((s) => s.setKeyBit);
  const process = useSDESStore((s) => s.process);
  const reset = useSDESStore((s) => s.reset);
  const fillExample = useSDESStore((s) => s.fillExample);

  return (
    <section className="max-w-[1280px] mx-auto px-6 mb-8">
      <motion.div
        className="as-card p-6 md:p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative corner */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-base-700">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-md">
              <span className="font-display font-bold text-sm text-teal-400">IN</span>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold uppercase text-base-50 tracking-wider drop-shadow-md">Panel Input</h2>
              <p className="text-xs text-base-400 mt-1 font-body">Masukkan data dan kunci untuk diproses</p>
            </div>
          </div>
          <button onClick={fillExample} className="as-btn as-btn-ghost text-xs">
            <Wand2 className="w-4 h-4" />
            Isi Contoh
          </button>
        </div>

        {/* Mode Selector */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="font-mono text-xs text-base-400 uppercase tracking-widest">MODE:</span>
          <ModeSelector mode={mode} setMode={setMode} />
        </div>

        {/* Bit Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <BitInput
            bits={plaintext}
            onToggle={setPlaintextBit}
            label={mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
            count={8}
            isPrimary
          />
          <BitInput
            bits={key}
            onToggle={setKeyBit}
            label="Kunci Enkripsi"
            count={10}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-base-700/50">
          <button onClick={process} className="as-btn as-btn-primary flex-1">
            <Play className="w-4 h-4" />
            Jalankan Simulasi
          </button>
          <button onClick={reset} className="as-btn as-btn-secondary">
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </motion.div>
    </section>
  );
}
