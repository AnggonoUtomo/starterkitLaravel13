# Discovery Plan

- [x] Source repository dan branch teridentifikasi: `c:\laragon\www\laravel13`, branch utama.
- [x] Laravel/PHP/starter kit terdeteksi: Laravel 13, PHP 8.4+, Starter Kit terinstal penuh.
- [x] Package dan module inventory selesai:
  - Backend: 5 submodule di `app/Modules/Console/` (AccessControl, UserManagement, AuditLog, Profile, SystemSetting)
  - Frontend: 5 page groups di `resources/js/pages/Console/` + `ConsoleLayout.tsx`
  - Shared: `ToastNotification`, `ImpersonationBanner`, `CommandPalette`, `UserHeaderDropdown`
  - Hooks: `use-appearance`, `use-flash-toast`, `use-clipboard`, `use-initials`
- [x] Existing routes, migrations, permissions, events, dan settings dicatat:
  - Routes: 22 endpoint total (AC 4, UM 6, AL 1, Profile 1, SS 10)
  - Permissions: 15 izin total (AC 4, UM 5, AL 2, Profile 2, SS 2)
  - Migrations: `system_settings` table, `media` table
  - Events: 8 domain events (UserCreated/Updated/Deleted, UserImpersonated/Stopped, ProfileUpdated, AuditLogViewed, SystemSettingUpdated)
- [x] Mode project ditetapkan: Module Extension (extending starter kit).
- [x] Scope dan out of scope disetujui: Console admin only, no business domain modules.

## Findings During Discovery

1. **SystemSetting backend** — Kode lebih lengkap dari yang didokumentasikan sebelumnya, tapi perlu re-verifikasi fungsionalitas.
2. **Duplikasi controller** — `UserManagement` punya `UserController.php` dan `UserManagementController.php`.
3. **Duplikasi events** — Setiap submodule punya `Domain/Events/` dan `Events/` dengan class serupa.
4. **Test coverage** — 5 test files: `ModuleSystemTest`, `AuditLogTest`, `ProfileTest`, `SystemSettingTest`, `UserManagementTest` + `ProfileUpdateTest` (settings).
