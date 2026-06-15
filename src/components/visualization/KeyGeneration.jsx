import { P10, P8 } from '../../lib/sdes-core';
import BitDisplay from '../shared/BitDisplay';
import StepCard from '../shared/StepCard';
import ArrowDown from '../shared/ArrowDown';

export default function KeyGeneration({ steps }) {
  const kg = steps.keyGeneration;
  if (!kg) return null;

  return (
    <div>
      <h3 className="font-display text-lg font-bold uppercase text-base-100 mb-6 flex items-center gap-3">
        <span className="as-badge as-badge-teal">01</span>
        Pembangkitan Kunci (Key Generation)
      </h3>

      {/* Kunci Asli */}
      <StepCard number="1" title="Kunci Asli (10-bit)">
        <BitDisplay bits={kg.originalKey} />
      </StepCard>
      <ArrowDown />

      {/* P10 */}
      <StepCard number="2" title="Permutasi P10" description={`Tabel P10: [${P10.join(', ')}]`}>
        <BitDisplay bits={kg.afterP10} />
      </StepCard>
      <ArrowDown />

      {/* Split */}
      <StepCard number="3" title="Split (Bagi 2)">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-base-400 mb-1 font-mono">Kiri (5-bit)</p>
            <BitDisplay bits={kg.leftAfterP10} />
          </div>
          <div>
            <p className="text-xs text-base-400 mb-1 font-mono">Kanan (5-bit)</p>
            <BitDisplay bits={kg.rightAfterP10} />
          </div>
        </div>
      </StepCard>
      <ArrowDown />

      {/* LS-1 */}
      <StepCard number="4" title="Left Shift 1 (LS-1)" description="Geser kiri sirkuler 1 posisi">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-base-400 mb-1 font-mono">Kiri setelah LS-1</p>
            <BitDisplay bits={kg.leftAfterLS1} />
          </div>
          <div>
            <p className="text-xs text-base-400 mb-1 font-mono">Kanan setelah LS-1</p>
            <BitDisplay bits={kg.rightAfterLS1} />
          </div>
        </div>
      </StepCard>
      <ArrowDown />

      {/* P8 -> K1 */}
      <StepCard number="5" title="Permutasi P8 -- Subkunci K1" description={`Tabel P8: [${P8.join(', ')}]`}>
        <p className="text-xs text-base-400 mb-1 font-mono">Gabungan (10-bit)</p>
        <BitDisplay bits={kg.combinedForK1} className="mb-3" />
        <p className="text-xs text-teal-400 mb-1 font-mono font-bold">K1 (8-bit)</p>
        <BitDisplay bits={kg.K1} />
      </StepCard>
      <ArrowDown />

      {/* LS-2 */}
      <StepCard number="6" title="Left Shift 2 (LS-2)" description="Geser kiri sirkuler 2 posisi dari hasil LS-1">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-base-400 mb-1 font-mono">Kiri setelah LS-2</p>
            <BitDisplay bits={kg.leftAfterLS2} />
          </div>
          <div>
            <p className="text-xs text-base-400 mb-1 font-mono">Kanan setelah LS-2</p>
            <BitDisplay bits={kg.rightAfterLS2} />
          </div>
        </div>
      </StepCard>
      <ArrowDown />

      {/* P8 -> K2 */}
      <StepCard number="7" title="Permutasi P8 -- Subkunci K2" description={`Tabel P8: [${P8.join(', ')}]`}>
        <p className="text-xs text-base-400 mb-1 font-mono">Gabungan (10-bit)</p>
        <BitDisplay bits={kg.combinedForK2} className="mb-3" />
        <p className="text-xs text-violet-400 mb-1 font-mono font-bold">K2 (8-bit)</p>
        <BitDisplay bits={kg.K2} />
      </StepCard>
    </div>
  );
}
