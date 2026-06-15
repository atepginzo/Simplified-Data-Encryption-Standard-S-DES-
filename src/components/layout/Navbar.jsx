import { Terminal, Lock, CheckCircle2 } from 'lucide-react';
import useSDESStore from '../../store/useSDESStore';

export default function Navbar() {
  const mode = useSDESStore((s) => s.mode);

  return (
    <nav className="sticky top-0 z-50 bg-base-900/90 backdrop-blur-md border-b border-base-700">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="font-display font-bold text-base md:text-lg text-base-50 tracking-wide uppercase">S-DES SIMULATOR</h1>
            <p className="hidden sm:block text-[0.65rem] text-base-500 font-mono tracking-[0.15em] uppercase">Simplified Data Encryption Standard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-800 border border-base-700">
            {mode === 'encrypt' ? <Lock className="w-3.5 h-3.5 text-base-400" /> : <Lock className="w-3.5 h-3.5 text-base-400" />}
            <span className="text-xs font-mono text-base-300">{mode === 'encrypt' ? 'Enkripsi' : 'Dekripsi'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-xs font-mono font-bold text-teal-400">Aktif</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
