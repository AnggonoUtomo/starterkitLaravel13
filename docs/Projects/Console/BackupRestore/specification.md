# Submodule: Console / BackupRestore

## Context

| Item | Value |
|---|---|
| Slug | `console.backup-restore` |
| Route Prefix | `/console/backups` |
| Status | 🔲 Planned |

## Intake Summary

- Existing code: Tidak ada
- Requested: Backup & restore database dan files — scheduled backup, manual backup, restore, download
- Dependencies: `spatie/laravel-backup` (rekomendasi) atau custom artisan commands

## Scope

### In Scope

- Manual backup trigger dari UI (database + files)
- Scheduled backup configuration
- Daftar backup history (tanggal, ukuran, status)
- Download backup file
- Restore dari backup tertentu
- Cleanup backup lama (retention policy)

### Out of Scope

- Remote backup destination management (S3, GCS config dari UI)
- Incremental backup
- Point-in-time recovery

## Module Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| BKP-001 | Admin dapat trigger backup manual | Must | Backup file tercipta |
| BKP-002 | Menampilkan daftar backup history | Must | Tabel backup tampil |
| BKP-003 | Admin dapat download backup file | Must | File terunduh |
| BKP-004 | Admin dapat restore dari backup | Must | Database/files ter-restore |
| BKP-005 | Retention policy (auto-cleanup) | Should | Backup lama terhapus |
| BKP-006 | Scheduled backup configuration | Should | Backup berjalan sesuai jadwal |

## Module Boundary

- Owner: Saka
- Public contract: `BackupRestoreModuleContract`
- Events: `BackupCreated`, `BackupRestored`, `BackupDeleted`
- Permissions: `backups.view`, `backups.create`, `backups.restore`, `backups.delete`
- Data ownership: `backups` table (metadata), filesystem backup disk
- Dependencies: `spatie/laravel-backup` (TBD), Laravel Filesystem

## Open Decisions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| BKP-OD-001 | Gunakan `spatie/laravel-backup` atau custom? | Dev speed vs flexibility | Saka | Open |
| BKP-OD-002 | Backup destination: local disk atau cloud storage? | Infrastructure | Saka | Open |
| BKP-OD-003 | Apakah restore membutuhkan konfirmasi 2 langkah (safety)? | Security | Saka | Open |
