# Spesifikasi Submodul: Console/UserManagement

## Tujuan
Menyediakan fitur pengelolaan akun pengguna, penugasan role Spatie, pencarian/penyaringan user, serta fitur impersonasi akun ("Masuk sebagai pengguna lain").

## Teknologi & Dependensi
- Backend: `UserController`, `UserService`, `UserDTO`
- Trait Spatie: `HasRoles` pada Model `User`
- Halaman Frontend: `resources/js/pages/Console/UserManagement/Index.tsx`
- Komponen Bersama: `ImpersonationBanner.tsx` dengan animasi Framer Motion

## Kriteria Keberhasilan
- [x] Admin dapat melihat daftar pengguna dengan role Spatie yang ditugaskan.
- [x] Admin dapat membuat pengguna baru dan menugaskan role.
- [x] Admin dapat memperbarui informasi pengguna dan menyinkronkan role.
- [x] Admin dapat menghapus akun pengguna (kecuali akun sendiri).
- [x] Admin dapat mengimpersonasi pengguna lain, menampilkan banner melayang dengan tombol keluar.

## Langkah Verifikasi
- Pengujian Fitur Pest: `php artisan test --filter=ModuleSystemTest`
