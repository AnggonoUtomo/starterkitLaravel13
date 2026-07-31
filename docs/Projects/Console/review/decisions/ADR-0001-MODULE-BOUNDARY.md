# ADR-0001: Console Module Boundary & DDD-Lite Structure

## Status

Accepted

## Context

Executive Console membutuhkan pemisahan domain yang jelas antar fitur admin
(User Management, Access Control, Audit Log, Profile, System Setting) agar
setiap submodule dapat dikembangkan, diuji, dan di-maintain secara independen.
Arsitektur DDD-Lite Modular dari SAKAAI (`LAR001`) menjadi acuan utama.

## Decision

Setiap submodule Console berada di `app/Modules/Console/{SubmoduleName}/` dengan
struktur standar DDD-Lite:

- Module owner: Saka (semua submodule)
- Public contracts: `{Module}ModuleContract.php` di folder `Contracts/`
- Events: Hanya menggunakan `Domain/Events/` (sesuai spesifikasi SAKAAI LAR001 section 3.3). Folder duplikat `Events/` di tingkat root submodule telah dihapus (Resolusi OD-002).
- Permission identity: Didaftarkan via `permissions.php` per submodule, auto-discovered oleh `ModuleServiceProvider`
- Controller Standard: Setiap controller bersifat `final class`. Berkas duplikat/deprecated `UserManagementController.php` telah dihapus (Resolusi OD-001).
- System Setting Boundary: Modul `SystemSetting` tetap terpisah sebagai submodule tersendiri untuk mengelola 10 kategori konfigurasi sistem (Resolusi OD-003).

## Data Ownership

- `AccessControl` → Spatie `roles`, `permissions` tables
- `UserManagement` → `users` table
- `AuditLog` → File log harian / audit record
- `Profile` → `users` table (profil attributes)
- `SystemSetting` → `system_settings` table, `media` table

## Consequences

### Positive

- Setiap submodule dapat diuji secara terisolasi.
- Single source of truth untuk Event dispatching di `Domain/Events/`.
- Menghilangkan kebingungan penamaan controller dengan menghapus class deprecated.
- Standar penataan file 100% patuh pada spesifikasi SAKAAI LAR001.

### Negative

- Overhead navigasi file untuk submodule yang sederhana.

## Verification

- Berkas `UserManagementController.php` telah dibersihkan.
- Seluruh folder duplikat `app/Modules/Console/*/Events/` telah dihapus.
- `Domain/Events/` digunakan secara konsisten.
