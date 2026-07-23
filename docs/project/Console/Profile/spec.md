# Spesifikasi Submodul: Console/Profile

## Tujuan
Mengintegrasikan Pengaturan Profil Pengguna & Keamanan Akun (nama, email, pembaruan kata sandi) secara langsung di dalam `ConsoleLayout`.

## Teknologi & Dependensi
- Backend: Action Fortify Informasi Profil & Pembaruan Kata Sandi
- Halaman Frontend: `resources/js/pages/Console/Profile/Index.tsx`
- Layout: `ConsoleLayout.tsx`

## Kriteria Keberhasilan
- [x] Pengguna dapat melihat dan memperbarui nama serta email di dalam `ConsoleLayout`.
- [x] Pengguna dapat memperbarui kata sandi dengan verifikasi kata sandi lama.
- [x] Rute submodul `console/profile` terdaftar di bawah prefix nama `console.profile.`.
- [x] Izin `profile.view` dan `profile.edit` diklarifikasikan pada `permissions.php`.

## Langkah Verifikasi
- Pengujian Fitur Pest: `php artisan test --filter=ModuleSystemTest`
