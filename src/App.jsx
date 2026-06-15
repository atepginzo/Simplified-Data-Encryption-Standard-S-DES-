import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { runAutomatedTest } from './lib/sdes-core';
import useSDESStore from './store/useSDESStore';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/hero/Hero';
import InputPanel from './components/input/InputPanel';
import OutputResult from './components/output/OutputResult';
import SolutionTabs from './components/visualization/SolutionTabs';

export default function App() {
  const result = useSDESStore((s) => s.result);
  const showSteps = useSDESStore((s) => s.showSteps);
  const toggleSteps = useSDESStore((s) => s.toggleSteps);
  const toast = useSDESStore((s) => s.toast);
  const mode = useSDESStore((s) => s.mode);

  useEffect(() => {
    runAutomatedTest();
  }, []);

  return (
    <div className="min-h-screen bg-base-900">
      <Navbar />
      <Hero />

      <main>
        <InputPanel />
        <OutputResult />

        {result && (
          <section className="max-w-[1280px] mx-auto px-6 mb-12">
            {/* Toggle Button */}
            <motion.button
              className="as-btn as-btn-ghost w-full mb-6"
              onClick={toggleSteps}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {showSteps ? (
                <><EyeOff className="w-4 h-4" /> Tutup Solusi Penyelesaian</>
              ) : (
                <><Eye className="w-4 h-4" /> Buka Solusi Penyelesaian Tahap-demi-Tahap</>
              )}
            </motion.button>

            <AnimatePresence>
              {showSteps && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <SolutionTabs steps={result.steps} mode={mode} />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}
      </main>

      <Footer />

      {/* Toast */}
      <div className={`as-toast ${toast.visible ? 'show' : ''}`}>
        {toast.message}
      </div>
    </div>
  );
}
