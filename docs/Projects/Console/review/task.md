# Console Master Task Plan

Task plan ini adalah ringkasan lintas submodule. Detail task per submodule ada di masing-masing folder.

## Phase 1: Foundation Review & Stabilize

| ID | Submodule | Task | Status |
|---|---|---|---|
| CON-001 | Cross-cutting | Resolve OD-001: Hapus duplikasi UserManagementController | ✅ Done |
| CON-002 | Cross-cutting | Resolve OD-002: Standarisasi Events ke Domain/Events/ | ✅ Done |
| CON-003 | Cross-cutting | Resolve OD-003: SystemSetting tetap terpisah | ✅ Done |
| CON-004 | UserManagement | Review & verify backend + frontend | 🔲 Planned |
| CON-005 | AuditLog | Review & verify backend + frontend | 🔲 Planned |
| CON-006 | Cross-cutting | Run full test suite & lint verification | 🔲 Planned |

## Phase 2: Core New Submodules

| ID | Submodule | Task | Status |
|---|---|---|---|
| CON-007 | Dashboard | Implement dashboard | ✅ Done |
| CON-008 | MenuManagement | Implement menu management | 🔲 Planned |
| CON-009 | Notification | Implement notification system | 🔲 Planned |
| CON-010 | ActivityLog | Implement activity log | 🔲 Planned |

## Phase 3: Infrastructure Submodules

| ID | Submodule | Task | Status |
|---|---|---|---|
| CON-011 | FileStorage | Implement file storage | 🔲 Planned |
| CON-012 | Scheduler | Implement scheduler monitoring | 🔲 Planned |
| CON-013 | Queue | Implement queue monitoring | 🔲 Planned |
| CON-014 | BackupRestore | Implement backup & restore | 🔲 Planned |

## Definition of Done (Per Submodule)

- [x] Specification accepted.
- [x] Backend: Controller, Service, DTO, Routes, Permissions implemented.
- [x] Frontend: Page + components implemented.
- [x] Feature tests written and passing.
- [x] ESLint 0 error, Vite build sukses.
- [x] Authorization & security impact ditinjau.
- [x] Documentation diperbarui.
