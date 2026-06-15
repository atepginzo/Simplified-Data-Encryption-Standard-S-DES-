import { create } from 'zustand';
import { sdesEncrypt, sdesDecrypt } from '../lib/sdes-core';

const useSDESStore = create((set, get) => ({
  // Input State
  mode: 'encrypt',
  plaintext: ['0','0','0','0','0','0','0','0'],
  key: ['0','0','0','0','0','0','0','0','0','0'],

  // Processing State
  result: null,
  showSteps: false,

  // UI State
  toast: { message: '', visible: false },

  // Actions
  setMode: (mode) => set({ mode, result: null }),

  setPlaintextBit: (index, value) => {
    const pt = [...get().plaintext];
    pt[index] = value;
    set({ plaintext: pt });
  },

  setKeyBit: (index, value) => {
    const k = [...get().key];
    k[index] = value;
    set({ key: k });
  },

  toggleSteps: () => set((s) => ({ showSteps: !s.showSteps })),

  showToast: (message) => {
    set({ toast: { message, visible: true } });
    setTimeout(() => set({ toast: { message: '', visible: false } }), 2500);
  },

  process: () => {
    const { mode, plaintext, key, showToast } = get();
    const ptStr = plaintext.join('');
    const keyStr = key.join('');

    if (ptStr.length !== 8 || !/^[01]+$/.test(ptStr)) {
      showToast('Plaintext harus tepat 8 bit biner');
      return;
    }
    if (keyStr.length !== 10 || !/^[01]+$/.test(keyStr)) {
      showToast('Kunci harus tepat 10 bit biner');
      return;
    }

    try {
      let result;
      if (mode === 'encrypt') {
        result = sdesEncrypt(ptStr, keyStr);
      } else {
        result = sdesDecrypt(ptStr, keyStr);
      }
      set({ result, showSteps: false });
      showToast(mode === 'encrypt' ? 'Enkripsi berhasil' : 'Dekripsi berhasil');
    } catch (err) {
      console.error('S-DES Error:', err);
      showToast('Terjadi kesalahan: ' + err.message);
    }
  },

  reset: () => {
    set({
      plaintext: ['0','0','0','0','0','0','0','0'],
      key: ['0','0','0','0','0','0','0','0','0','0'],
      result: null,
      showSteps: false,
    });
    get().showToast('Data telah direset');
  },

  fillExample: () => {
    set({
      plaintext: ['1','0','1','0','1','0','1','0'],
      key: ['1','0','1','0','1','0','1','0','1','0'],
    });
    get().showToast('Contoh data telah diisi');
  },
}));

export default useSDESStore;
