/**
 * BitInput -- Komponen input bit interaktif.
 * Setiap bit dirender sebagai kotak terpisah yang bisa diklik untuk toggle 0/1.
 */
export default function BitInput({ bits, onToggle, label, count }) {
  return (
    <div>
      <label className="block font-display font-semibold text-sm uppercase tracking-wide text-base-300 mb-2">
        {label}
        <span className="text-base-500 font-mono text-xs ml-2">({count}-bit)</span>
      </label>
      <div className="flex gap-1.5 flex-wrap">
        {bits.map((bit, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onToggle(i, bit === '1' ? '0' : '1')}
            className={`as-bit-cell clickable ${bit === '1' ? 'active' : ''}`}
          >
            {bit}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5 flex-wrap mt-1">
        {bits.map((_, i) => (
          <span key={i} className="inline-flex items-center justify-center w-[2.5rem] text-center text-[0.6rem] text-base-500 font-mono">
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
