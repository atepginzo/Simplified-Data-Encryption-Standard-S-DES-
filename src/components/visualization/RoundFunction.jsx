import { EP, P4, S0, S1 } from '../../lib/sdes-core';
import BitDisplay from '../shared/BitDisplay';
import StepCard from '../shared/StepCard';
import ArrowDown from '../shared/ArrowDown';
import SBoxTable from './SBoxTable';

export default function RoundFunction({ roundData, roundNumber, subkeyLabel, leftInput, xorWithLeft, mode }) {
  const d = roundData;

  return (
    <div>
      <h3 className="font-display text-lg font-bold uppercase text-base-100 mb-4 flex items-center gap-2">
        <span className="as-badge bg-teal-500/15 border-teal-500/40 text-teal-400">
          {roundNumber === 1 ? 'C' : 'E'}
        </span>
        Round Function {roundNumber}
        <span className="text-xs text-base-400 font-mono font-normal ml-1">
          (menggunakan {subkeyLabel})
        </span>
      </h3>

      {/* EP */}
      <StepCard number="1" title="Expansion Permutation (EP)" description={`Tabel EP: [${EP.join(', ')}] -- 4-bit menjadi 8-bit`}>
        <p className="text-xs text-base-400 mb-1 font-mono">Input R (4-bit)</p>
        <BitDisplay bits={d.inputRight} className="mb-2" />
        <p className="text-xs text-base-400 mb-1 font-mono">Setelah EP (8-bit)</p>
        <BitDisplay bits={d.afterEP} />
      </StepCard>
      <ArrowDown />

      {/* XOR with Key */}
      <StepCard number="2" title={`XOR dengan ${subkeyLabel}`}>
        <div className="space-y-1 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base-400 w-16">EP:</span>
            <BitDisplay bits={d.afterEP} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base-400 w-16">{subkeyLabel}:</span>
            <BitDisplay bits={d.subkey} />
          </div>
          <div className="border-t border-base-600 pt-1 flex items-center gap-2">
            <span className="text-teal-400 w-16 font-bold">XOR:</span>
            <BitDisplay bits={d.afterXORKey} />
          </div>
        </div>
      </StepCard>
      <ArrowDown />

      {/* Split for S-Box */}
      <StepCard number="3" title="Split untuk S-Box">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-teal-400 mb-1 font-mono">Input S0 (4-bit)</p>
            <BitDisplay bits={d.leftHalf} />
          </div>
          <div>
            <p className="text-xs text-violet-400 mb-1 font-mono">Input S1 (4-bit)</p>
            <BitDisplay bits={d.rightHalf} />
          </div>
        </div>
      </StepCard>
      <ArrowDown />

      {/* S-Box Lookup */}
      <StepCard number="4" title="Substitusi S-Box">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SBoxTable sbox={S0} name="S-Box S0" lookup={d.s0Lookup} />
          <SBoxTable sbox={S1} name="S-Box S1" lookup={d.s1Lookup} />
        </div>
        <div className="mt-3">
          <p className="text-xs text-base-400 mb-1 font-mono">Gabungan hasil S-Box (4-bit)</p>
          <BitDisplay bits={d.sboxCombined} />
        </div>
      </StepCard>
      <ArrowDown />

      {/* P4 */}
      <StepCard number="5" title="Permutasi P4" description={`Tabel P4: [${P4.join(', ')}]`}>
        <BitDisplay bits={d.afterP4} />
      </StepCard>
      <ArrowDown />

      {/* XOR with Left */}
      <StepCard number="6" title="XOR dengan bagian Kiri">
        <div className="space-y-1 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base-400 w-16">L:</span>
            <BitDisplay bits={leftInput} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base-400 w-16">P4:</span>
            <BitDisplay bits={d.afterP4} />
          </div>
          <div className="border-t border-base-600 pt-1 flex items-center gap-2">
            <span className="text-teal-400 w-16 font-bold">XOR:</span>
            <BitDisplay bits={xorWithLeft} />
          </div>
        </div>
      </StepCard>
    </div>
  );
}
