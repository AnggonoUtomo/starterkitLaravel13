# Spesifikasi Backend: Console / AccessControl

## 1. Ringkasan
Spesifikasi backend untuk pengelolaan Role Spatie, Otorisasi RBAC, dan Pendaftaran Izin Otomatis per-submodul (*Permission Auto-Discovery*).

## 2. Arsitektur & Teknologi
- **Controller:** `app/Modules/Console/AccessControl/Http/Controllers/RoleController.php`
- **Services:** `app/Modules/Console/AccessControl/Services/RoleService.php`
- **Package:** `spatie/laravel-permission`
- **Role Proteksi:** `Super System` (Dilarang dihapus atau diubah izin inti-nya).

## 3. Kriteria Keberhasilan
- [x] Auto-discovery izin submodul otomatis tersinkronisasi ke DB Spatie.
- [x] Endpoint `POST /console/access-control/roles` dapat membuat role baru.
- [x] Endpoint `PUT /console/access-control/roles/{role}/permissions` dapat memperbarui matriks izin role.
- [x] Endpoint `DELETE /console/access-control/roles/{role}` memblokir penghapusan role `Super System`.
- [x] Seluruh pengujian fitur Pest (`ModuleSystemTest`) lulus 100%.
