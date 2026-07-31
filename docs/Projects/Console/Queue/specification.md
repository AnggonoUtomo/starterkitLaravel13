# Submodule: Console / Queue

## Context

| Item | Value |
|---|---|
| Slug | `console.queue` |
| Route Prefix | `/console/queues` |
| Status | 🔲 Planned |

## Intake Summary

- Existing code: Tidak ada (queue driver info ada di SystemHealthService)
- Requested: Monitoring & pengelolaan queue jobs — daftar jobs, retry failed, clear queue
- Dependencies: Laravel Queue, `Horizon` (opsional)

## Scope

### In Scope

- Dashboard queue status (pending, processing, completed, failed counts)
- Daftar failed jobs dengan detail error
- Retry failed jobs (individual atau batch)
- Clear/flush queue
- Queue worker status monitoring

### Out of Scope

- Laravel Horizon full replacement
- Custom queue driver implementation
- Job scheduling/creation dari UI

## Module Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| QUEUE-001 | Menampilkan dashboard status queue (pending, failed, dsb.) | Must | Metrik tampil |
| QUEUE-002 | Menampilkan daftar failed jobs dengan detail | Must | Tabel failed jobs tampil |
| QUEUE-003 | Retry failed jobs | Must | Job di-retry dan berpindah status |
| QUEUE-004 | Clear/flush queue | Should | Queue bersih |
| QUEUE-005 | Queue worker status monitoring | Should | Worker status tampil |

## Module Boundary

- Owner: Saka
- Public contract: `QueueModuleContract`
- Events: `FailedJobRetried`, `QueueFlushed`
- Permissions: `queue.view`, `queue.manage`
- Data ownership: Laravel `failed_jobs` table, `jobs` table
- Dependencies: Laravel Queue, database/redis driver

## Open Decisions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| QUEUE-OD-001 | Apakah menggunakan Laravel Horizon atau custom monitoring? | Dependency & feature set | Saka | Open |
| QUEUE-OD-002 | Queue driver: database vs redis? | Performance & infrastructure | Saka | Open |
