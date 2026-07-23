# Rencana Submodul: Console/UserManagement

## Ringkasan
Membangun domain pengelolaan pengguna mengikuti aturan arsitektur DDD-Lite.

## Arsitektur
- `DTO/UserDTO.php`: Mengubah Model Eloquent User menjadi struktur data DTO.
- `Services/UserService.php`: Membungkus logika paginasi, operasi CRUD, dan sesi impersonasi.
- `Http/Controllers/UserController.php`: Menangani validasi request dan respons Inertia.
- `routes.php`: Mendaftarkan rute `console/users` dengan prefix nama `console.user-management.`.
- `permissions.php`: Mengklarifikasikan izin `users.view`, `users.create`, `users.edit`, `users.delete`, `users.impersonate`.

## Rincian Tugas
- [x] Tugas 1: Membuat `UserDTO.php`
- [x] Tugas 2: Membuat `UserService.php`
- [x] Tugas 3: Membuat `UserController.php`
- [x] Tugas 4: Deklarasi `routes.php` dan `permissions.php`
- [x] Tugas 5: Membuat halaman React `resources/js/pages/Console/UserManagement/Index.tsx`
