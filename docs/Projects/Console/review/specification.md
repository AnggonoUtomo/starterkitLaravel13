# Console Specification

## Scope

### In Scope

- **Dashboard** — Halaman utama Console, metrik ringkasan, system health
- **UserManagement** — CRUD user, impersonation, RBAC role & permission, profil & keamanan akun
- **MenuManagement** — Pengelolaan navigasi menu dinamis, drag & drop, permission-based visibility
- **Notification** — Sistem notifikasi in-app (inbox, broadcast, preferensi)
- **AuditLog** — Log keamanan sistem (event user, role, permission, impersonation)
- **ActivityLog** — Log aktivitas user umum (CRUD, login, page visit, before/after diff)
- **FileStorage** — Manajemen file & media (browser, upload, delete, disk usage)
- **Scheduler** — Monitoring & pengelolaan scheduled tasks Laravel
- **Queue** — Monitoring & pengelolaan queue jobs (failed jobs, retry, flush)
- **BackupRestore** — Backup & restore database/files (manual, scheduled, download, restore)
- **SystemSetting** — Pengaturan 10 kategori konfigurasi sistem (tetap terpisah)
- **Cross-cutting** — ConsoleLayout, Theme Switcher, Toast, Command Palette, Impersonation Banner

### Out of Scope

- Modul domain bisnis (Pesantren, Keuangan, Akademik, Tahfizh)
- Multi-tenancy dan tenant isolation
- Real-time websocket (tahap awal polling)
- SMS/push notification
- CDN management, video transcoding

## Existing Capability Contract

| Capability | Source | Reused |
|---|---|---|
| Authentication & Fortify | Laravel Starter Kit | ✅ Ya |
| Inertia React v3 | Laravel Starter Kit | ✅ Ya |
| Spatie Permission RBAC | `spatie/laravel-permission` | ✅ Ya |
| Tailwind CSS v4 | Laravel Starter Kit | ✅ Ya |
| Framer Motion | `framer-motion` | ✅ Ya |
| Radix UI Tooltip | `@radix-ui/react-tooltip` | ✅ Ya |
| DDD-Lite Modular Architecture | `ModuleServiceProvider` | ✅ Ya |

## Module Requirements Summary

| Submodule | Key Requirements | Priority |
|---|---|---|
| Dashboard | Metrik, health status, quick links | Must |
| UserManagement | CRUD user, RBAC, impersonate, profile | Must |
| MenuManagement | CRUD menu, drag & drop reorder, permission visibility | Must |
| Notification | Inbox, mark read, broadcast, preferences | Should |
| AuditLog | Security event viewer, filter, export | Must |
| ActivityLog | Activity recording, viewer, before/after diff | Should |
| FileStorage | File browser, upload, delete, disk usage | Should |
| Scheduler | Task list, history, manual trigger | Should |
| Queue | Status dashboard, failed jobs, retry | Should |
| BackupRestore | Manual/scheduled backup, download, restore | Should |
| SystemSetting | 10 Kategori Konfigurasi Sistem | Must |

## Resolved Open Decisions

| ID | Decision | Resolution | Status |
|---|---|---|---|
| OD-001 | Duplikasi `UserManagementController` | Dihapus karena deprecated & redundan dengan `UserController` | ✅ Resolved |
| OD-002 | Duplikasi events `Domain/Events/` vs `Events/` | Folder `Events/` dihapus, hanya menggunakan `Domain/Events/` sesuai SAKAAI LAR001 | ✅ Resolved |
| OD-003 | Status Submodule SystemSetting | Tetap terpisah sebagai submodule mandiri | ✅ Resolved |
