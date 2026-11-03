# BacaCerdas v0.1 — MVP Local-First

BacaCerdas membantu membaca PDF secara aktif: **Baca → Ingat → Praktik**.

## Fitur yang sudah aktif

- Tambah PDF milik sendiri.
- PDF tersimpan lokal di browser melalui IndexedDB.
- Reader PDF.js dengan canvas nyata, prev/next, dan lompat halaman.
- Progres halaman tersimpan dan dilanjutkan setelah reload.
- Timer sesi membaca 20 menit.
- Analisis lokal evidence-only: setiap poin adalah kutipan teks asli dan memiliki nomor halaman.
- Tombol evidence membuka halaman sumber.
- Active recall, catatan penting, dan satu tindakan praktis.
- Recall/catatan/tindakan tersimpan lokal dan pulih setelah reload.
- Buku demo untuk mencoba alur tanpa mengunggah PDF.
- Layout responsif desktop dan mobile.

## Batasan v0.1

- PDF scan tanpa text layer belum diproses OCR; aplikasi menampilkan status jujur bahwa OCR diperlukan.
- AI online opsional belum diaktifkan.
- Belum ada akun atau sinkronisasi antarperangkat.
- Menghapus data situs/browser juga menghapus buku dan catatan lokal.
- Backup/restore terstruktur dan review 1–7–30 hari masuk tahap berikutnya.

## Menjalankan source

Memerlukan Node.js modern.

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite.

## Build produksi

```bash
npm run typecheck
npm test -- --run
npm run build
npm run preview
```

Folder hasil produksi: `dist/`.

## Privasi

PDF yang dipilih tidak dikirim ke server oleh fitur v0.1. Buku dan data belajar tersimpan di browser/perangkat pengguna. Jangan membuka `dist/index.html` langsung melalui `file://`; layani melalui HTTP/Vercel/static hosting agar PDF.js worker berjalan benar.

## Hasil verifikasi

- Unit test shell UI dan grounded analyzer.
- TypeScript typecheck.
- Vite production build.
- Browser flow: buku demo → canvas PDF nyata → halaman 6 → analisis berbukti → klik halaman sumber → simpan recall/catatan/tindakan → reload → progres dan data tetap tersedia.
