# ADR-006: Pengubah Tema Tampilan dan Sistem Notifikasi Toast Real-time

## Status
Diterima (Accepted)

## Tanggal
2026-07-23

## Konteks & Masalah
Untuk meningkatkan kenyamanan dan pengalaman pengguna (UX) pada Console Admin:
1. Pengguna memerlukan pengubah tema tampilan (**Dark / Light / System**) yang halus di Navbar header.
2. Pengguna membutuhkan notifikasi visual melayang (*Toast Notification*) saat ada pesan sukses atau error dari respons server (*Inertia Flash Data*).

## Keputusan

1. **Pengubah Tema Tampilan (Theme Switcher)**:
   - Membuat hook React `useAppearance` untuk mengelola mode `dark`, `light`, dan `system`.
   - Menyimpan preferensi di `localStorage` dan cookie agar tema tidak berkedip (*flash of unthemed content*) saat halaman dimuat ulang.
   - Menambahkan tombol menu dropdown interaktif di Header `ConsoleLayout.tsx` dengan ikon animasi Sun, Moon, dan Monitor.

2. **Sistem Notifikasi Toast Real-time (Toast Notification System)**:
   - Membuat komponen `ToastNotification.tsx` berbasis Framer Motion yang dipasang pada `ConsoleLayout.tsx`.
   - Mendengarkan data flash dari Inertia (`flash.success` & `flash.error`).
   - Notifikasi dapat ditutup secara otomatis setelah 4 detik atau ditutup secara manual oleh pengguna dengan animasi *slide-in / fade-out* yang mulus.

## Alternatif yang Dipertimbangkan
- **Library Toast Eksternal (Sonner/React-Toastify):** Ditolak untuk meminimalkan dependensi luar dan memanfaatkan potensi bawaan Tailwind CSS v4 + Framer Motion.

## Konsekuensi
- Tampilan Console Admin lebih interaktif, nyaman di mata, dan memberikan umpan balik visual (*feedback*) yang cepat atas setiap aksi pengguna.
