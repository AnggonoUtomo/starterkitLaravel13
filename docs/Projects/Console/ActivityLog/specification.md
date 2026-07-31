# Submodule: Console / ActivityLog

## Context

| Item | Value |
|---|---|
| Slug | `console.activity-log` |
| Route Prefix | `/console/activity-logs` |
| Status | 🔲 Planned |

## Intake Summary

- Existing code: `AuditLog` mencatat event keamanan (user creation, role assignment, permission changes). **ActivityLog berbeda** — mencatat aktivitas umum user (login, page visit, CRUD actions).
- Requested: Log aktivitas user yang lebih granular dari AuditLog
- Dependencies: Package `spatie/laravel-activitylog` (rekomendasi) atau custom implementation

## Scope

### In Scope

- Pencatatan otomatis aktivitas user (login, logout, CRUD pada setiap model)
- Halaman viewer log aktivitas dengan filter (user, model, action, date range)
- Detail perubahan (before/after diff) untuk update operations
- Retention policy (auto-cleanup log lama)

### Out of Scope

- Real-time activity stream
- Analytics/reporting dari activity log
- Activity tracking untuk guest/unauthenticated users

## Module Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| ACT-001 | Aktivitas CRUD pada model tercatat otomatis | Must | Log tersimpan di DB |
| ACT-002 | Admin dapat melihat daftar aktivitas dengan filter | Must | Halaman viewer berfungsi |
| ACT-003 | Detail perubahan (before/after diff) tersedia | Should | Diff tampil di drawer |
| ACT-004 | Retention policy untuk auto-cleanup | Should | Log lama terhapus otomatis |

## Module Boundary

- Owner: Saka
- Public contract: `ActivityLogModuleContract`
- Events: `ActivityRecorded`
- Permissions: `activity-logs.view`, `activity-logs.export`, `activity-logs.purge`
- Data ownership: `activity_log` table
- Dependencies: `spatie/laravel-activitylog` (TBD) atau custom

## Open Decisions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| ACT-OD-001 | Gunakan `spatie/laravel-activitylog` atau custom implementation? | Development speed vs flexibility | Saka | Open |
| ACT-OD-002 | Berapa lama retention period default? (30 hari? 90 hari?) | Storage & compliance | Saka | Open |
