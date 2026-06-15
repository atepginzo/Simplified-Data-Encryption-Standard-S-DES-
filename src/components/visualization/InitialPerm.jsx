import { IP as IP_TABLE } from '../../lib/sdes-core';
import BitDisplay from '../shared/BitDisplay';
import StepCard from '../shared/StepCard';
import ArrowDown from '../shared/ArrowDown';

export default function InitialPerm({ steps }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold uppercase text-base-100 mb-4 flex items-center gap-2">
        <span className="as-badge bg-teal-500/15 border-teal-500/40 text-teal-400">B</span>
        Initial Permutation (IP)
      </h3>

      <StepCard number="1" title="Input Asli (8-bit)">
        <BitDisplay bits={steps.inputPlaintext || steps.inputCiphertext} />
      </StepCard>
      <ArrowDown />

      <StepCard number="2" title="Setelah IP" description={`Tabel IP: [${IP_TABLE.join(', ')}]`}>
        <BitDisplay bits={steps.afterIP} />
      </StepCard>
      <ArrowDown />

      <StepCard number="3" title="Split (Bagi 2)">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-base-400 mb-1 font-mono">L0 (4-bit)</p>
            <BitDisplay bits={steps.L0} />
          </div>
          <div>
            <p className="text-xs text-base-400 mb-1 font-mono">R0 (4-bit)</p>
            <BitDisplay bits={steps.R0} />
          </div>
        </div>
      </StepCard>
    </div>
  );
}
