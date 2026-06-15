# S-DES Simulator (Simplified Data Encryption Standard)

Sebuah simulator interaktif berbasis web untuk memvisualisasikan cara kerja algoritma **Simplified Data Encryption Standard (S-DES)** langkah-demi-langkah. Aplikasi ini dirancang khusus untuk keperluan edukasi dan pembelajaran kriptografi.

## Fitur Utama

- **Enkripsi & Dekripsi**: Mengamankan atau memulihkan 8-bit blok data menggunakan 10-bit kunci.
- **Visualisasi Tahap-demi-Tahap (Interactive Tabs)**: Mengikuti setiap proses matematis S-DES melalui antarmuka tab yang ramah pengguna.
- **Pembangkitan Kunci (Key Generation)**: Melihat langsung proses P10, Left-Shift, dan P8 dalam membentuk Subkunci K1 dan K2.
- **Jaringan Feistel (Round Function)**: Memvisualisasikan tabel Ekspansi (EP), operasi XOR, pencarian nilai S-Box (S0 & S1), dan Permutasi P4.
- **UI Cyber Neon**: Antarmuka modern, gelap, dan profesional (menggunakan font Michroma & Inter) tanpa elemen visual yang mengganggu (bebas emoji).
- **100% Vanilla JS Logic**: Perhitungan murni dibangun dari awal (Scratch) tanpa dependensi library kriptografi eksternal (terbuka di `src/lib/sdes-core.js`).

## Teknologi yang Digunakan

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Custom Cyber Neon Theme)
- **State Management**: Zustand (Global state untuk mode, input, dan hasil)
- **Animasi & Ikon**: Framer Motion & Lucide React
- **Logika Kriptografi**: Vanilla JavaScript

## Struktur Direktori

```text
S-DES/
├── public/                 # Aset statis publik
├── src/
│   ├── components/         # Komponen UI React
│   │   ├── hero/           # Bagian Header/Hero utama
│   │   ├── input/          # Panel kontrol input (Plaintext, Key, Mode)
│   │   ├── layout/         # Komponen kerangka (Navbar, Footer)
│   │   ├── output/         # Penampil hasil akhir Ciphertext/Plaintext
│   │   ├── shared/         # Komponen dapat digunakan ulang (BitDisplay, StepCard)
│   │   └── visualization/  # Panel visualisasi algoritma S-DES (Tab Navigasi, IP, Round 1 & 2)
│   ├── lib/
│   │   └── sdes-core.js    # LOGIKA UTAMA S-DES (Keygen, Enkripsi, Dekripsi, Tabel Konstanta)
│   ├── store/
│   │   └── useSDESStore.js # Manajemen state global menggunakan Zustand
│   ├── App.jsx             # Titik kumpul utama antarmuka
│   ├── main.jsx            # Entry point React
│   └── index.css           # Variabel Tema Global Tailwind (Cyber Neon Palette)
├── index.html              # Entry point HTML & Konfigurasi Google Fonts
├── package.json            # Daftar dependensi & NPM scripts
├── vite.config.js          # Konfigurasi bundler Vite
└── README.md               # Dokumentasi proyek
```

## Persyaratan Sistem

- Node.js versi 20 atau lebih baru (Disarankan v22+).
- NPM atau Yarn.

## Cara Menjalankan Secara Lokal

1. **Kloning Repositori**
   Buka terminal Anda dan jalankan:
   ```bash
   git clone <url-repositori-anda>
   cd S-DES
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan (Dev Server)**
   ```bash
   npm run dev
   ```
   Buka peramban (browser) dan akses `http://localhost:5173`.

4. **Build untuk Produksi (Vercel / Netlify / Dll)**
   ```bash
   npm run build
   ```
   Perintah ini akan membuat folder `dist` yang berisi file statis siap untuk di-*deploy* ke hosting manapun. Proyek ini sepenuhnya kompatibel dan terotomatisasi jika Anda menghubungkan repositori GitHub langsung ke **Vercel**.

## Cara Menggunakan Aplikasi

1. Pada **Panel Input**, pilih mode operasi (Enkripsi atau Dekripsi).
2. Masukkan 8-bit data dengan menekan kotak-kotak bit (mengubah 0 menjadi 1 atau sebaliknya).
3. Masukkan 10-bit kunci enkripsi rahasia Anda.
4. (Opsional) Tekan "Isi Contoh" untuk menggunakan *test-vector* otomatis (`10101010` untuk data, `1010101010` untuk kunci).
5. Tekan tombol **Jalankan Simulasi**.
6. Lihat hasil akhir, lalu tekan tombol **Buka Solusi Penyelesaian Tahap-demi-Tahap** untuk mempelajari secara presisi bagaimana data Anda bertransformasi melalui operasi Permutasi dan S-Box.

## Penafian (Disclaimer)
Aplikasi ini ditujukan **murni untuk keperluan edukasi dan pembelajaran**. Algoritma S-DES (*Simplified Data Encryption Standard*) tidak dirancang untuk keamanan data pada level produksi nyata di dunia modern karena ukuran kuncinya yang sangat kecil (10-bit) membuatnya sangat rentan terhadap serangan *brute-force*.

---
Dikembangkan untuk mendemonstrasikan fondasi kriptografi blok modern dengan antarmuka web interaktif yang modern.
