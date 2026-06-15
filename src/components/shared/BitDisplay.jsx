/**
 * BitDisplay -- Render array bit dalam kotak-kotak terpisah.
 * Digunakan di seluruh komponen visualisasi.
 */
export default function BitDisplay({ bits, size = 'sm', highlightIndices, className = '' }) {
  return (
    <div className={`flex gap-1 flex-wrap ${className}`}>
      {bits.map((bit, i) => {
        const isHighlighted = highlightIndices?.includes(i);
        const cellClass = size === 'sm'
          ? `as-bit-sm ${bit === 1 || bit === '1' ? 'is-one' : ''} ${isHighlighted ? 'is-one' : ''}`
          : `as-bit-cell ${bit === 1 || bit === '1' ? 'active' : ''}`;
        return (
          <span key={i} className={cellClass}>
            {bit}
          </span>
        );
      })}
    </div>
  );
}
