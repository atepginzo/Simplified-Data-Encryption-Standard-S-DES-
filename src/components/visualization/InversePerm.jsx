import { IP_INV } from '../../lib/sdes-core';
import BitDisplay from '../shared/BitDisplay';
import StepCard from '../shared/StepCard';
import ArrowDown from '../shared/ArrowDown';

export default function InversePerm({ steps }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold uppercase text-base-100 mb-4 flex items-center gap-2">
        <span className="as-badge bg-teal-500/15 border-teal-500/40 text-teal-400">F</span>
        Inverse Initial Permutation (IP-1)
      </h3>

      <StepCard number="1" title="Input IP-1 (8-bit)" description="Gabungan hasil Round 2 (tanpa swap)">
        <BitDisplay bits={steps.beforeIP_INV} />
      </StepCard>
      <ArrowDown />

      <StepCard number="2" title="Setelah IP-1" description={`Tabel IP-1: [${IP_INV.join(', ')}]`}>
        <BitDisplay bits={steps.afterIP_INV} />
      </StepCard>
      <ArrowDown />

      <StepCard number="3" title="Output Akhir">
        <div className="text-center">
          <div className="flex justify-center">
            <BitDisplay bits={steps.afterIP_INV} size="lg" />
          </div>
          <p className="font-mono text-xl font-bold text-teal-400 mt-3">
            {steps.afterIP_INV.join('')}
          </p>
        </div>
      </StepCard>
    </div>
  );
}
