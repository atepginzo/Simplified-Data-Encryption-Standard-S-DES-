/**
 * S-DES (Simplified Data Encryption Standard) Core Logic
 * Implementasi murni vanilla JavaScript -- tanpa library kriptografi eksternal.
 *
 * Referensi standar S-DES:
 * - Plaintext/Ciphertext: 8 bit
 * - Key: 10 bit
 * - 2 putaran Feistel
 * - S-Box S0 dan S1 (masing-masing 4x4)
 */

// =============================================
// TABEL PERMUTASI (1-indexed dalam literatur, dikonversi ke 0-indexed di sini)
// =============================================

// P10: Permutasi 10-bit kunci awal
export const P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];

// P8: Seleksi 8 bit dari 10 bit (untuk menghasilkan subkunci)
export const P8 = [6, 3, 7, 4, 8, 5, 10, 9];

// IP: Initial Permutation (8-bit)
export const IP = [2, 6, 3, 1, 4, 8, 5, 7];

// IP_INV: Inverse Initial Permutation (8-bit)
export const IP_INV = [4, 1, 3, 5, 7, 2, 8, 6];

// EP: Expansion Permutation (4-bit -> 8-bit)
export const EP = [4, 1, 2, 3, 2, 3, 4, 1];

// P4: Permutasi 4-bit
export const P4 = [2, 4, 3, 1];

// S-Box S0 (4x4)
export const S0 = [
  [1, 0, 3, 2],
  [3, 2, 1, 0],
  [0, 2, 1, 3],
  [3, 1, 3, 2],
];

// S-Box S1 (4x4)
export const S1 = [
  [0, 1, 2, 3],
  [2, 0, 1, 3],
  [3, 0, 1, 0],
  [2, 1, 0, 3],
];

// =============================================
// FUNGSI UTILITAS
// =============================================

/**
 * Melakukan permutasi pada array bit berdasarkan tabel permutasi.
 * Tabel menggunakan 1-indexed (sesuai literatur S-DES).
 */
export function permute(bits, table) {
  return table.map((pos) => bits[pos - 1]);
}

/**
 * Circular left shift pada array bit sebanyak n posisi.
 */
export function leftShift(bits, n) {
  const len = bits.length;
  const shift = n % len;
  return [...bits.slice(shift), ...bits.slice(0, shift)];
}

/**
 * Operasi XOR pada dua array bit.
 */
export function xor(a, b) {
  return a.map((bit, i) => bit ^ b[i]);
}

/**
 * Lookup S-Box: menerima 4-bit input dan matriks S-Box.
 * Mengembalikan objek { row, col, value, valueBits }.
 *
 * row = bit[0]bit[3] (2 bit -> 0-3)
 * col = bit[1]bit[2] (2 bit -> 0-3)
 */
export function sboxLookup(bits4, sbox) {
  const row = (bits4[0] << 1) | bits4[3];
  const col = (bits4[1] << 1) | bits4[2];
  const value = sbox[row][col];
  const valueBits = [(value >> 1) & 1, value & 1];
  return { row, col, value, valueBits, inputBits: [...bits4] };
}

/**
 * Mengkonversi string biner ke array bit.
 */
export function stringToBits(str) {
  return str.split('').map(Number);
}

/**
 * Mengkonversi array bit ke string biner.
 */
export function bitsToString(bits) {
  return bits.join('');
}

// =============================================
// KEY GENERATION (Pembangkitan Kunci)
// =============================================

/**
 * Menghasilkan subkunci K1 dan K2 dari kunci 10-bit.
 * Mengembalikan objek berisi seluruh langkah intermediate.
 */
export function generateKeys(key10Bits) {
  const steps = {};

  // Langkah 1: P10
  steps.originalKey = [...key10Bits];
  steps.afterP10 = permute(key10Bits, P10);

  // Langkah 2: Split menjadi kiri (5-bit) dan kanan (5-bit)
  steps.leftAfterP10 = steps.afterP10.slice(0, 5);
  steps.rightAfterP10 = steps.afterP10.slice(5);

  // Langkah 3: LS-1 (Left Shift 1 posisi)
  steps.leftAfterLS1 = leftShift(steps.leftAfterP10, 1);
  steps.rightAfterLS1 = leftShift(steps.rightAfterP10, 1);

  // Langkah 4: Gabung dan P8 -> K1
  steps.combinedForK1 = [...steps.leftAfterLS1, ...steps.rightAfterLS1];
  steps.K1 = permute(steps.combinedForK1, P8);

  // Langkah 5: LS-2 (Left Shift 2 posisi dari hasil LS-1)
  steps.leftAfterLS2 = leftShift(steps.leftAfterLS1, 2);
  steps.rightAfterLS2 = leftShift(steps.rightAfterLS1, 2);

  // Langkah 6: Gabung dan P8 -> K2
  steps.combinedForK2 = [...steps.leftAfterLS2, ...steps.rightAfterLS2];
  steps.K2 = permute(steps.combinedForK2, P8);

  return { K1: steps.K1, K2: steps.K2, steps };
}

// =============================================
// ROUND FUNCTION (Fungsi Putaran Feistel)
// =============================================

/**
 * Satu putaran fungsi Feistel pada 4-bit kanan.
 * Mengembalikan hasil 4-bit dan seluruh langkah intermediate.
 */
export function feistelRound(right4, subkey8) {
  const detail = {};

  // Langkah 1: Expansion Permutation (4-bit -> 8-bit)
  detail.inputRight = [...right4];
  detail.afterEP = permute(right4, EP);

  // Langkah 2: XOR dengan subkunci (8-bit)
  detail.subkey = [...subkey8];
  detail.afterXORKey = xor(detail.afterEP, subkey8);

  // Langkah 3: Split menjadi dua bagian 4-bit
  detail.leftHalf = detail.afterXORKey.slice(0, 4);
  detail.rightHalf = detail.afterXORKey.slice(4);

  // Langkah 4: S-Box lookup
  detail.s0Lookup = sboxLookup(detail.leftHalf, S0);
  detail.s1Lookup = sboxLookup(detail.rightHalf, S1);

  // Langkah 5: Gabung hasil S-Box (4-bit)
  detail.sboxCombined = [...detail.s0Lookup.valueBits, ...detail.s1Lookup.valueBits];

  // Langkah 6: P4
  detail.afterP4 = permute(detail.sboxCombined, P4);

  return { result: detail.afterP4, detail };
}

// =============================================
// ENKRIPSI S-DES
// =============================================

/**
 * Enkripsi S-DES: plaintext 8-bit + key 10-bit -> ciphertext 8-bit.
 * Mengembalikan { output, steps } dengan seluruh history langkah.
 */
export function sdesEncrypt(plaintext8, key10) {
  const ptBits = typeof plaintext8 === 'string' ? stringToBits(plaintext8) : [...plaintext8];
  const keyBits = typeof key10 === 'string' ? stringToBits(key10) : [...key10];

  const allSteps = {};

  // Key Generation
  const keyResult = generateKeys(keyBits);
  allSteps.keyGeneration = keyResult.steps;
  const K1 = keyResult.K1;
  const K2 = keyResult.K2;

  // Initial Permutation
  allSteps.inputPlaintext = [...ptBits];
  allSteps.afterIP = permute(ptBits, IP);
  allSteps.L0 = allSteps.afterIP.slice(0, 4);
  allSteps.R0 = allSteps.afterIP.slice(4);

  // Round 1: menggunakan K1
  const round1 = feistelRound(allSteps.R0, K1);
  allSteps.round1 = round1.detail;
  allSteps.round1.xorWithLeft = xor(allSteps.L0, round1.result);
  allSteps.round1.leftInput = [...allSteps.L0];

  // Setelah Round 1: merge dan swap
  allSteps.beforeSwap = [...allSteps.round1.xorWithLeft, ...allSteps.R0];
  allSteps.afterSwap = [...allSteps.R0, ...allSteps.round1.xorWithLeft]; // SW: tukar L dan R

  // Round 2: menggunakan K2
  const L1 = allSteps.afterSwap.slice(0, 4); // = R0 asli
  const R1 = allSteps.afterSwap.slice(4);     // = hasil XOR round1
  allSteps.L1 = [...L1];
  allSteps.R1 = [...R1];

  const round2 = feistelRound(R1, K2);
  allSteps.round2 = round2.detail;
  allSteps.round2.xorWithLeft = xor(L1, round2.result);
  allSteps.round2.leftInput = [...L1];

  // Gabung tanpa swap
  allSteps.beforeIP_INV = [...allSteps.round2.xorWithLeft, ...R1];

  // Inverse Initial Permutation
  allSteps.afterIP_INV = permute(allSteps.beforeIP_INV, IP_INV);

  return {
    output: allSteps.afterIP_INV,
    outputString: bitsToString(allSteps.afterIP_INV),
    mode: 'encrypt',
    steps: allSteps,
  };
}

// =============================================
// DEKRIPSI S-DES
// =============================================

/**
 * Dekripsi S-DES: ciphertext 8-bit + key 10-bit -> plaintext 8-bit.
 * Sama seperti enkripsi tetapi kunci dibalik (K2 di round 1, K1 di round 2).
 */
export function sdesDecrypt(ciphertext8, key10) {
  const ctBits = typeof ciphertext8 === 'string' ? stringToBits(ciphertext8) : [...ciphertext8];
  const keyBits = typeof key10 === 'string' ? stringToBits(key10) : [...key10];

  const allSteps = {};

  // Key Generation
  const keyResult = generateKeys(keyBits);
  allSteps.keyGeneration = keyResult.steps;
  const K1 = keyResult.K1;
  const K2 = keyResult.K2;

  // Initial Permutation
  allSteps.inputCiphertext = [...ctBits];
  allSteps.afterIP = permute(ctBits, IP);
  allSteps.L0 = allSteps.afterIP.slice(0, 4);
  allSteps.R0 = allSteps.afterIP.slice(4);

  // Round 1: menggunakan K2 (bukan K1)
  const round1 = feistelRound(allSteps.R0, K2);
  allSteps.round1 = round1.detail;
  allSteps.round1.xorWithLeft = xor(allSteps.L0, round1.result);
  allSteps.round1.leftInput = [...allSteps.L0];

  // Setelah Round 1: merge dan swap
  allSteps.beforeSwap = [...allSteps.round1.xorWithLeft, ...allSteps.R0];
  allSteps.afterSwap = [...allSteps.R0, ...allSteps.round1.xorWithLeft];

  // Round 2: menggunakan K1 (bukan K2)
  const L1 = allSteps.afterSwap.slice(0, 4);
  const R1 = allSteps.afterSwap.slice(4);
  allSteps.L1 = [...L1];
  allSteps.R1 = [...R1];

  const round2 = feistelRound(R1, K1);
  allSteps.round2 = round2.detail;
  allSteps.round2.xorWithLeft = xor(L1, round2.result);
  allSteps.round2.leftInput = [...L1];

  // Gabung tanpa swap
  allSteps.beforeIP_INV = [...allSteps.round2.xorWithLeft, ...R1];

  // Inverse Initial Permutation
  allSteps.afterIP_INV = permute(allSteps.beforeIP_INV, IP_INV);

  return {
    output: allSteps.afterIP_INV,
    outputString: bitsToString(allSteps.afterIP_INV),
    mode: 'decrypt',
    steps: allSteps,
  };
}

// =============================================
// AUTOMATED TEST
// =============================================

export function runAutomatedTest() {
  // Test vector: PT=10101010, Key=1010101010
  const enc = sdesEncrypt('10101010', '1010101010');
  const dec = sdesDecrypt(enc.outputString, '1010101010');

  const encPass = enc.outputString === '01101011';
  const decPass = dec.outputString === '10101010';

  console.log(`[S-DES Test] Encrypt 10101010 -> ${enc.outputString} (expected 01101011) [${encPass ? 'PASS' : 'FAIL'}]`);
  console.log(`[S-DES Test] Decrypt ${enc.outputString} -> ${dec.outputString} (expected 10101010) [${decPass ? 'PASS' : 'FAIL'}]`);

  return encPass && decPass;
}
