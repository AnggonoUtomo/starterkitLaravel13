# Rencana Submodul: Console/SystemSetting

## Ringkasan
Mengimplementasikan Pemantauan Kesehatan Sistem dan Dasbor Registrasi Modul.

## Arsitektur
- `Services/SystemHealthService.php`: Memeriksa koneksi Database & Redis dengan aman, mengumpulkan konfigurasi lingkungan, dan merekap izin modul.
- `Http/Controllers/SystemSettingController.php`: Rendring respons Inertia.
- `routes.php`: Mendaftarkan rute `console/system-settings`.
- `permissions.php`: Mengklarifikasikan izin `system.view`, `system.manage`.

## Rincian Tugas
- [x] Tugas 1: Membuat `SystemHealthService.php`
- [x] Tugas 2: Membuat `SystemSettingController.php`
- [x] Tugas 3: Deklarasi `routes.php` dan `permissions.php`
- [x] Tugas 4: Membuat halaman React `resources/js/pages/Console/SystemSetting/Index.tsx`
