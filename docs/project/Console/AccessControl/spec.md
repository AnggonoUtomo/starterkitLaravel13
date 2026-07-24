# Spesifikasi Submodul: Console/AccessControl

## Tujuan
Menyediakan pengelolaan Role Spatie dan tampilan Matrix Izin Visual (Role vs Izin yang dikelompokkan per Submodul).

## Teknologi & Dependensi
- Backend: `RoleController`, `RoleService`
- Package: `spatie/laravel-permission`
- Auto-Discovery: `ModuleServiceProvider::getDiscoveredPermissions()`
- Halaman Frontend: `resources/js/pages/Console/AccessControl/Index.tsx`

## Kriteria Keberhasilan
- [x] Izin submodul yang terdeteksi otomatis tersinkronisasi ke tabel `permissions` Spatie.
- [x] Admin dapat melihat grid matrix izin yang dikelompokkan berdasarkan submodul.
- [x] Admin dapat mengubah status izin pada role secara real-time.
- [x] Admin dapat membuat role baru dan menghapus role selain Super System.

## Langkah Verifikasi
- Pengujian Fitur Pest: `php artisan test --filter=ModuleSystemTest`
