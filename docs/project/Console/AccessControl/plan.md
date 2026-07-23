# Rencana Submodul: Console/AccessControl

## Ringkasan
Mengimplementasikan UI Grid Matrix Izin dan logika Spatie Role pada backend.

## Arsitektur
- `Services/RoleService.php`: Menyinkronkan izin dari `ModuleServiceProvider` dan mengambil data matrix.
- `Http/Controllers/RoleController.php`: Menangani CRUD role dan endpoint pengubahan izin.
- `routes.php`: Mendaftarkan rute `console/access-control`.
- `permissions.php`: Mengklarifikasikan izin `roles.view`, `roles.create`, `roles.edit`, `roles.delete`.

## Rincian Tugas
- [x] Tugas 1: Membuat `RoleService.php` dengan logika auto-sync
- [x] Tugas 2: Membuat `RoleController.php`
- [x] Tugas 3: Deklarasi `routes.php` dan `permissions.php`
- [x] Tugas 4: Membuat halaman React `resources/js/pages/Console/AccessControl/Index.tsx`
