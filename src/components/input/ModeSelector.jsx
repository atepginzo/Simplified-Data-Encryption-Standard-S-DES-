import { Lock, Unlock } from 'lucide-react';

export default function ModeSelector({ mode, setMode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body font-semibold text-sm text-base-300 uppercase tracking-wide">Mode:</span>
      <div className="flex">
        <button
          className={`as-mode-btn ${mode === 'encrypt' ? 'selected' : ''}`}
          onClick={() => setMode('encrypt')}
        >
          <Lock className="w-3.5 h-3.5 inline mr-1.5" />
          Enkripsi
        </button>
        <button
          className={`as-mode-btn ${mode === 'decrypt' ? 'selected' : ''}`}
          onClick={() => setMode('decrypt')}
        >
          <Unlock className="w-3.5 h-3.5 inline mr-1.5" />
          Dekripsi
        </button>
      </div>
    </div>
  );
}
