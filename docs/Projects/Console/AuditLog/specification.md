# Submodule: Console / AuditLog

## Context

| Item | Value |
|---|---|
| Slug | `console.audit-log` |
| Route Prefix | `/console/audit-logs` |
| Status | ✅ Existing — Needs Review |

## Intake Summary

- Existing code module: `app/Modules/Console/AuditLog/`
- Existing frontend: `resources/js/pages/Console/AuditLog/` (Index + 3 komponen)
- Scope: Pemantau Log Audit keamanan sistem (pembuatan user, penugasan role, perubahan izin, impersonasi)

## Module Inventory

| Component | Location | Status |
|---|---|---|
| AuditLogController | `app/Modules/Console/AuditLog/Http/Controllers/AuditLogController.php` | ✅ Existing |
| AuditLogQueryService | `app/Modules/Console/AuditLog/Services/AuditLogQueryService.php` | ✅ Existing |
| AuditLogDTO | `app/Modules/Console/AuditLog/DTO/AuditLogDTO.php` | ✅ Existing |
| AuditLogModuleContract | `app/Modules/Console/AuditLog/Contracts/AuditLogModuleContract.php` | ✅ Existing |
| AuditLogServiceProvider | `app/Modules/Console/AuditLog/Providers/AuditLogServiceProvider.php` | ✅ Existing |

## Permissions

| Permission | Description |
|---|---|
| `audit-logs.view` | Melihat daftar audit log |
| `audit-logs.export` | Mengekspor data audit log |

## Routes

- `GET /console/audit-logs` — Index (daftar log + filter)

## Frontend Components

- `AuditLog/Index.tsx` — Halaman utama
- `components/AuditLogHeader.tsx` — Header halaman
- `components/AuditLogTable.tsx` — Tabel log
- `components/AuditPayloadDrawer.tsx` — Drawer detail payload (Framer Motion)

## Tests

- `tests/Feature/Modules/AuditLogTest.php`

## Open Decisions

| ID | Question | Status |
|---|---|---|
| AL-001 | Apakah AuditLog perlu endpoint export (izin `audit-logs.export` ada tapi route belum) | Open |
| AL-002 | Apakah penyimpanan log berbasis file atau database? Perlu standardisasi. | Open |
