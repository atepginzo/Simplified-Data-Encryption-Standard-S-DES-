/**
 * SBoxTable -- Render matriks S-Box 4x4 dengan highlight baris/kolom aktif.
 */
export default function SBoxTable({ sbox, name, lookup }) {
  return (
    <div className="as-card-inner p-3">
      <p className="font-display font-bold text-xs uppercase text-teal-400 mb-2">{name}</p>
      {lookup && (
        <p className="text-xs text-base-400 mb-2 font-mono">
          Input: {lookup.inputBits.join('')} | Baris: {lookup.row} | Kolom: {lookup.col} | Output: {lookup.value} ({lookup.valueBits.join('')})
        </p>
      )}
      <table className="as-sbox-table">
        <thead>
          <tr>
            <th>B\K</th>
            <th>00</th>
            <th>01</th>
            <th>10</th>
            <th>11</th>
          </tr>
        </thead>
        <tbody>
          {sbox.map((row, r) => (
            <tr key={r}>
              <th>{r.toString(2).padStart(2, '0')}</th>
              {row.map((val, c) => (
                <td
                  key={c}
                  className={lookup && lookup.row === r && lookup.col === c ? 'highlighted' : ''}
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
