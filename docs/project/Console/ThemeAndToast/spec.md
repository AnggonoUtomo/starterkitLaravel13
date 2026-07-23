# Spesifikasi Fitur: Theme Switcher & Toast Notification System

## Tujuan
Menambahkan komponen pengubah tema tampilan (Dark / Light / System) dan sistem notifikasi toast real-time beranimasi pada Console Admin.

## Teknologi & Dependensi
- Frontend: Tailwind CSS v4, Framer Motion, Lucide Icons (`Sun`, `Moon`, `Monitor`, `CheckCircle2`, `AlertCircle`, `X`)
- State Management: React Hook `useAppearance`, Inertia Flash props (`flash.success`, `flash.error`)
- Layout: `resources/js/layouts/ConsoleLayout.tsx`

## Kriteria Keberhasilan
- [ ] Pengguna dapat mengubah tema antara **Dark**, **Light**, atau **System** melalui tombol header Console.
- [ ] Preferensi tema tersimpan di `localStorage` & cookie tanpa efek kedipan saat *refresh*.
- [ ] Notifikasi toast muncul otomatis saat ada pesan flash dari server (contoh: "User berhasil dibuat").
- [ ] Toast otomatis menghilang setelah 4 detik atau saat tombol silang (X) diklik.
- [ ] Animasi toast menggunakan Framer Motion yang halus (*slide-in* dari kanan atas).

## Langkah Verifikasi
- Pengujian tampilan pada browser untuk pergantian tema Dark/Light.
- Mengirim pesan flash via controller dan memastikan Toast muncul di UI.
