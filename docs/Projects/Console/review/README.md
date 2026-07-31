# Project: Console

## Project Context

| Item | Value |
|---|---|
| Slug | console |
| Source Repository | `app/Modules/Console/` |
| Mode | Module Extension |
| Laravel | 13 |
| Starter Kit Status | Installed |
| Owner | Saka |
| Status | Implementation (Ongoing) |

## Intake Summary

- Existing starter kit capability: Laravel 13 Starter Kit, Inertia React v3, Fortify Auth, Tailwind CSS v4
- Existing packages: `spatie/laravel-permission`, `framer-motion`, `@radix-ui/react-tooltip`, `lucide-react`
- Existing backend modules: `AccessControl`, `UserManagement`, `AuditLog`, `Profile`, `SystemSetting`
- Existing frontend layout: `ConsoleLayout.tsx` (collapsible sidebar, theme switcher, toast, command palette)
- Out of scope: Modul domain bisnis (Pesantren, Keuangan, Akademik)

## Submodule Inventory

| # | Submodule | Slug | Existing Code | Status | Notes |
|---|---|---|---|---|---|
| 1 | [Dashboard](./Dashboard/) | `console.dashboard` | ❌ Baru | 🔲 Planned | Halaman utama dashboard Console |
| 2 | [UserManagement](./UserManagement/) | `console.user-management` | ✅ Ada | ⚠️ Review | CRUD user, impersonation, RBAC. Maps: `UserManagement` + `AccessControl` + `Profile` |
| 3 | [MenuManagement](./MenuManagement/) | `console.menu-management` | ❌ Baru | 🔲 Planned | Pengelolaan navigasi menu dinamis berbasis database & permission |
| 4 | [Notification](./Notification/) | `console.notification` | ❌ Baru | 🔲 Planned | Sistem notifikasi (in-app, email, push) |
| 5 | [AuditLog](./AuditLog/) | `console.audit-log` | ✅ Ada | ⚠️ Review | Log keamanan. Maps: `AuditLog` |
| 6 | [ActivityLog](./ActivityLog/) | `console.activity-log` | ❌ Baru | 🔲 Planned | Log aktivitas user (berbeda dari AuditLog) |
| 7 | [FileStorage](./FileStorage/) | `console.file-storage` | ❌ Baru | 🔲 Planned | Manajemen file & media storage |
| 8 | [Scheduler](./Scheduler/) | `console.scheduler` | ❌ Baru | 🔲 Planned | Monitoring & pengelolaan scheduled tasks |
| 9 | [Queue](./Queue/) | `console.queue` | ❌ Baru | 🔲 Planned | Monitoring & pengelolaan queue jobs |
| 10 | [BackupRestore](./BackupRestore/) | `console.backup-restore` | ❌ Baru | 🔲 Planned | Backup & restore database/files |

## Existing Code Mapping

Kode backend existing yang perlu disinkronkan dengan struktur submodule baru:

| Existing Module | Maps To Submodule | Notes |
|---|---|---|
| `app/Modules/Console/UserManagement/` | **UserManagement** | CRUD user, impersonation, DTO, filter role |
| `app/Modules/Console/AccessControl/` | **UserManagement** | RBAC role management, digabung ke UserManagement |
| `app/Modules/Console/Profile/` | **UserManagement** | Profil & keamanan akun, digabung ke UserManagement |
| `app/Modules/Console/AuditLog/` | **AuditLog** | Log keamanan, drawer detail |
| `app/Modules/Console/SystemSetting/` | **Dashboard** | Health monitoring → Dashboard; System config → TBD |

## Cross-Cutting Concerns (Tertanam di Layout)

Fitur-fitur berikut bukan submodule tersendiri, melainkan tertanam di `ConsoleLayout.tsx`:

| Feature | Components | Status |
|---|---|---|
| Collapsible Sidebar | `ConsoleLayout.tsx` | ✅ Done |
| Theme Switcher (Dark/Light/System) | `use-appearance.tsx` | ✅ Done |
| Toast Notification | `ToastNotification.tsx`, `use-flash-toast.ts` | ✅ Done |
| Command Palette | `CommandPalette.tsx` | ✅ Done |
| Impersonation Banner | `ImpersonationBanner.tsx` | ✅ Done |
| User Header Dropdown | `UserHeaderDropdown.tsx` | ✅ Done |

## Working Rules

Gunakan baseline global sebagai source of truth. Jangan membangun ulang
capability existing tanpa keputusan eksplisit. Setiap task mengikuti incremental
implementation dan wajib memiliki verification evidence.
