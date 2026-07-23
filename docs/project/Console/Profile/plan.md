# Rencana Submodul: Console/Profile

## Ringkasan
Mengimplementasikan domain Profil Pengguna dan Keamanan Akun di dalam Console Admin.

## Arsitektur
- `Http/Controllers/ProfileController.php`: Menangani rendring profil & pendelegasian pembaruan ke action Fortify.
- `routes.php`: Mendefinisikan endpoint `console/profile`.
- `permissions.php`: Deklarasi `profile.view`, `profile.edit`.

## Rincian Tugas
- [x] Tugas 1: Membuat `ProfileController.php`
- [x] Tugas 2: Deklarasi `routes.php` dan `permissions.php`
- [x] Tugas 3: Membuat halaman React `resources/js/pages/Console/Profile/Index.tsx`
