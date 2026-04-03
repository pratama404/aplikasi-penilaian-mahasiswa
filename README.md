# Sistem Aplikasi Penilaian Mahasiswa

Diinisialisasi dengan menggunakan teknologi **Vite + React**. Proyek ini adalah purwarupa (prototype) halaman penilaian dosen yang dibangun khusus untuk menjamin **performa** (menggunakan *Uncontrolled Component* meminimalkan React Re-render log-time) dan **user experience** yang tangguh lewat implementasi basis data internal lokal.

## Pembaruan Utama (Versi CRUD)

Aplikasi kini telah dilengkapi dengan **Simulasi C-R-U-D** secara utuh menggunakan *Browser LocalStorage* sebagai basis data dummy yang menampung Riwayat Akses.
- **Create (Buat):** Menyimpan formulir tabel penilaian JSON gabungan dari semua Mahasiswa langsung ke Storage lokal saat tombol *Simpan* ditekan.
- **Read (Baca):** Riwayat evaluasi akan muncul pada Card spesifik ("Kumpulan Penilaian"), dan dosen dapat mem-preview kembali rincian data per history yang dipilih.
- **Delete (Hapus):** Sistem menyajikan fitur hapus untuk membatalkan arsip evaluasi jika terdeteksi ada yang salah input.

## Analisa Proses Bisnis dan System Design Document

Berdasarkan permintaan *System Analyst* profesional, dokumentasi arsitektur perangkat lunak tidak digabung dalam file bacaan awal ini agar strukturnya rapi. Seluruh rancangan bisnis (Flowchart), Arsitektur Komponen, Panduan UI Guidelines, dan DDL (Data Dictionary Language) Skema Database dituang secara ekstensif di file terpisah. 

**👉 BACA SELENGKAPNYA: [Dokumentasi System Analyst & Skema Blueprint](docs/SYSTEM_DESIGN.md)**

Silakan klik / pelajari dokumen tersebut untuk memahami alur DFD, Flowchart Mermaid, dan pemecahan JSON menjadi Relasional Tabel MySQL.

## Panduan Instalasi dan Reproduksi (Developer Setup)

Jika *Developer Frontend/Backend* berikutnya ingin menggunakan atau mengembangkan proyek ini:

1. Pastikan Anda menggunakan versi NodeJS yang stabil, contohnya `v20.x`. *(Aplikasi didesain mendukung Native Bind Vite v5).*
2. Pastikan Anda berada dalam environment terminal (c:\Users\ageng\Downloads\aplikasi penilaian mahasiswa\penilaian-mahasiswa\).
3. Jalankan sintaks ini di *root folder* untuk menarik library:
   ```bash
   npm install
   ```
4. Melakukan serving HTTP lokal untuk *developing* menggunakan Fast Refresh Mode:
   ```bash
   npm run dev
   ```

Aplikasi saat ini telah siap dibongkar dan disesuaikan lebih jauh sebagai *Template Minimum Viable Product* bagi Institusi manapun.
