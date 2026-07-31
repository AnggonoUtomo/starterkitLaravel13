# Submodule: Console / Scheduler

## Context

| Item | Value |
|---|---|
| Slug | `console.scheduler` |
| Route Prefix | `/console/scheduler` |
| Status | 🔲 Planned |

## Intake Summary

- Existing code: Tidak ada
- Requested: Monitoring & pengelolaan scheduled tasks Laravel — daftar schedule, riwayat eksekusi, manual trigger
- Dependencies: Laravel `Schedule` facade, `Artisan`

## Scope

### In Scope

- Daftar semua scheduled tasks yang terdaftar di Kernel/Console
- Riwayat eksekusi task (last run, next run, duration, status)
- Manual trigger task dari UI
- Enable/disable individual task

### Out of Scope

- Membuat scheduled task baru dari UI (task didefinisikan di kode)
- Distributed scheduling (multi-server)
- Cron editor visual

## Module Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| SCHED-001 | Menampilkan daftar scheduled tasks dengan info jadwal | Must | Daftar task tampil |
| SCHED-002 | Menampilkan riwayat eksekusi (last run, status) | Must | History log tampil |
| SCHED-003 | Manual trigger task dari UI | Should | Task dieksekusi on-demand |
| SCHED-004 | Enable/disable individual task | Should | Status task berubah |

## Module Boundary

- Owner: Saka
- Public contract: `SchedulerModuleContract`
- Events: `ScheduledTaskTriggered`
- Permissions: `scheduler.view`, `scheduler.manage`
- Data ownership: `scheduled_task_logs` table (baru)
- Dependencies: Laravel Schedule, Artisan

## Open Decisions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| SCHED-OD-001 | Gunakan `spatie/laravel-schedule-monitor` atau custom? | Dev speed vs customization | Saka | Open |
