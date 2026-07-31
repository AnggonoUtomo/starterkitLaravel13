# ActivityLog Task Plan

| ID | Task | Acceptance Criteria | Verification | Status |
|---|---|---|---|---|
| ACT-001 | Resolve OD: `spatie/laravel-activitylog` vs custom | Keputusan terdokumentasi | ADR | 🔲 Planned |
| ACT-002 | Resolve OD: Retention period default | Keputusan terdokumentasi | ADR | 🔲 Planned |
| ACT-003 | Define ActivityLogModuleContract, permissions, migration | Contract file tersedia | Code review | 🔲 Planned |
| ACT-004 | Implement ActivityLog recording (auto-record CRUD) | Log tersimpan otomatis | Feature test | 🔲 Planned |
| ACT-005 | Implement ActivityLogController (viewer + filter) | Endpoint berfungsi | Feature test | 🔲 Planned |
| ACT-006 | Implement frontend (table + filter + diff drawer) | UI berfungsi | ESLint + Vite build | 🔲 Planned |
| ACT-007 | Implement retention policy (artisan command cleanup) | Log lama terhapus | Artisan command test | 🔲 Planned |

## Definition of Done

- [ ] Scope task selesai.
- [ ] Test positif/negatif relevan tersedia.
- [ ] Authorization, audit, migration, dan security impact ditinjau.
- [ ] Verification evidence tersimpan.
- [ ] Documentation dan execution log diperbarui.
