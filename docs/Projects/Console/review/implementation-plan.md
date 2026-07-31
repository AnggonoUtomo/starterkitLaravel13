# Console Implementation Plan

## Delivery Strategy

Urutan setiap increment: specify, plan, implement, test, review, document,
verify. Jangan mencampur beberapa capability besar dalam satu increment.
Setiap submodule diimplementasikan secara vertikal (backend + frontend sekaligus).

## Phases & Increments

### Phase 1: Foundation (Existing — Review & Stabilize)

| Increment | Scope | Status |
|---|---|---|
| INC-001 | ConsoleLayout (Collapsible Sidebar, Tooltip, Theme, Toast) | ✅ Done |
| INC-002 | UserManagement Backend (CRUD, Impersonation, DTO, Filter) | ✅ Done — needs review |
| INC-003 | UserManagement Frontend (Table, Workspace, Modals, Shortcuts) | ✅ Done — needs review |
| INC-004 | AccessControl Backend (Role RBAC, Auto-discovery, Proteksi) | ✅ Done — needs review |
| INC-005 | AccessControl Frontend (Split Workspace, Permission Matrix) | ✅ Done — needs review |
| INC-006 | AuditLog Backend + Frontend | ✅ Done — needs review |
| INC-007 | Profile Backend + Frontend | ✅ Done — needs review |
| INC-008 | SystemSetting Backend + Frontend | ⚠️ Needs Review |

### Checkpoint: Foundation

- [ ] All existing tests pass (`php artisan test`)
- [ ] ESLint 0 error (`npm run lint`)
- [ ] Vite build sukses (`npm run build`)
- [ ] Open Decisions OD-001, OD-002, OD-003 resolved

### Phase 2: Core New Submodules

| Increment | Scope | Depends On | Status |
|---|---|---|---|
| INC-009 | Dashboard (metrik, health, quick links) | INC-008 (SystemHealthService) | ✅ Done |
| INC-010 | MenuManagement (CRUD menu, drag & drop, permissions) | INC-001 (sidebar) | 🔲 Planned |
| INC-011 | Notification (inbox, broadcast, preferences) | INC-002 (UserManagement) | 🔲 Planned |
| INC-012 | ActivityLog (recording, viewer, diff) | INC-006 (AuditLog pattern) | 🔲 Planned |

### Checkpoint: Core New Submodules

- [ ] 4 submodule baru berfungsi
- [ ] Tests lulus 100%
- [ ] ESLint + Vite build clean

### Phase 3: Infrastructure Submodules

| Increment | Scope | Depends On | Status |
|---|---|---|---|
| INC-013 | FileStorage (browser, upload, delete, disk usage) | - | 🔲 Planned |
| INC-014 | Scheduler (task list, history, trigger) | - | 🔲 Planned |
| INC-015 | Queue (dashboard, failed jobs, retry) | - | 🔲 Planned |
| INC-016 | BackupRestore (backup, download, restore) | INC-013 (FileStorage) | 🔲 Planned |

### Checkpoint: Complete

- [ ] All 10 submodules berfungsi
- [ ] Full test suite passes
- [ ] Documentation lengkap
- [ ] Ready for review

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| SystemSetting backend gap | High | Re-verify dengan test sebelum Phase 2 |
| Duplikasi controller/events | Medium | Resolve di Checkpoint Foundation |
| Scope creep (terlalu banyak submodule sekaligus) | High | Strict vertical slicing per increment |
| Package dependency decisions (Spatie packages) | Medium | Resolve OD per submodule sebelum implement |
