import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import KeyGeneration from './KeyGeneration';
import InitialPerm from './InitialPerm';
import RoundFunction from './RoundFunction';
import InversePerm from './InversePerm';
import StepCard from '../shared/StepCard';
import BitDisplay from '../shared/BitDisplay';

export default function SolutionTabs({ steps, mode }) {
  const [activeTab, setActiveTab] = useState('kg');

  const tabs = [
    { id: 'kg', label: '1. Key Generation' },
    { id: 'ip', label: '2. Initial Permutation' },
    { id: 'r1', label: '3. Round 1' },
    { id: 'sw', label: '4. Swap' },
    { id: 'r2', label: '5. Round 2' },
    { id: 'ip_inv', label: '6. Inverse IP' },
  ];

  const round1Key = mode === 'encrypt' ? 'K1' : 'K2';
  const round2Key = mode === 'encrypt' ? 'K2' : 'K1';

  return (
    <div className="as-card overflow-hidden">
      {/* Header Tabs */}
      <div className="bg-base-950 border-b border-base-700 overflow-x-auto scrollbar-hide">
        <div className="flex px-4 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`as-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'kg' && <KeyGeneration steps={steps} />}
            {activeTab === 'ip' && <InitialPerm steps={steps} />}
            {activeTab === 'r1' && (
              <RoundFunction
                roundData={steps.round1}
                roundNumber={1}
                subkeyLabel={round1Key}
                leftInput={steps.round1.leftInput}
                xorWithLeft={steps.round1.xorWithLeft}
                mode={mode}
              />
            )}
            {activeTab === 'sw' && (
              <div>
                <h3 className="font-display text-lg font-bold uppercase text-base-100 mb-6 flex items-center gap-3">
                  <span className="as-badge as-badge-violet">SWAP</span>
                  Penukaran Posisi (Swap)
                </h3>
                <StepCard number="SW" title="Tukar Kiri dan Kanan" description="Menukar blok 4-bit kiri dengan blok 4-bit kanan untuk persiapan masuk ke Round 2.">
                  <div className="space-y-4 mt-2">
                    <div>
                      <p className="text-xs text-base-500 mb-2 font-mono uppercase tracking-wider">Sebelum Swap</p>
                      <BitDisplay bits={steps.beforeSwap} size="lg" />
                    </div>
                    <div className="flex justify-center py-2">
                      <div className="p-2 bg-violet-500/10 rounded-full border border-violet-500/30">
                        <ArrowLeftRight className="w-5 h-5 text-violet-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-violet-400 mb-2 font-mono uppercase font-bold tracking-wider">Setelah Swap</p>
                      <BitDisplay bits={steps.afterSwap} size="lg" className="violet" />
                    </div>
                  </div>
                </StepCard>
              </div>
            )}
            {activeTab === 'r2' && (
              <RoundFunction
                roundData={steps.round2}
                roundNumber={2}
                subkeyLabel={round2Key}
                leftInput={steps.round2.leftInput}
                xorWithLeft={steps.round2.xorWithLeft}
                mode={mode}
              />
            )}
            {activeTab === 'ip_inv' && <InversePerm steps={steps} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
