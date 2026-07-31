# Submodule: Console / Dashboard

## Context

| Item | Value |
|---|---|
| Slug | `console.dashboard` |
| Route Prefix | `/console/dashboard` |
| Status | 🔲 Planned |

## Intake Summary

- Existing code: Sebagian fungsionalitas health monitoring ada di `SystemSetting` (`SystemHealthService`)
- Requested: Halaman utama dashboard Console dengan ringkasan statistik, status kesehatan sistem, dan quick links
- Dependencies: Perlu data dari modul lain (user count, audit log summary, queue status, scheduler status)

## Scope

### In Scope

- Dashboard overview dengan metrik statistik (total user, total role, total log, dll.)
- System Health indicators (Database, Redis, PHP version, Queue driver)
- Quick links ke submodule lain
- Widget ringkasan aktivitas terbaru

### Out of Scope

- Analytics chart yang kompleks
- Real-time websocket dashboard
- Custom widget builder

## Existing Capability Contract

| Capability | Source | Reused |
|---|---|---|
| SystemHealthService | `app/Modules/Console/SystemSetting/Services/SystemHealthService.php` | ✅ Ya — perlu dipindahkan atau di-share |
| Module discovery | `ModuleServiceProvider` | ✅ Ya |

## Module Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| DASH-001 | Menampilkan metrik ringkasan (user, role, log, dll.) | Must | Kartu metrik tampil dengan data akurat |
| DASH-002 | Menampilkan indikator kesehatan sistem | Must | Status DB, Redis, PHP, Queue tampil |
| DASH-003 | Quick links ke submodule Console | Should | Navigasi cepat ke setiap submodule |
| DASH-004 | Widget aktivitas terbaru | Should | 5 aktivitas terakhir tampil |

## Module Boundary

- Owner: Saka
- Public contract: `DashboardModuleContract`
- Events: —
- Permissions: `dashboard.view`
- Data ownership: Tidak memiliki tabel sendiri (read-only aggregator)
- Dependencies: `UserManagement`, `AuditLog`, `SystemSetting` (read contracts)

## Open Decisions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| DASH-OD-001 | Apakah SystemHealthService dipindahkan dari SystemSetting ke Dashboard? | Arsitektur module boundary | Saka | Open |
| DASH-OD-002 | Apakah dashboard menjadi landing page Console (redirect dari `/console`)? | Routing strategy | Saka | Open |
