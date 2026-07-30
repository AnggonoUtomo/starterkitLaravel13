# SantriManagement Task Plan

Task harus kecil, dapat diverifikasi, dan tidak mencampur capability yang tidak berkaitan. Setiap task memiliki acceptance criteria, test, evidence, dan status.

| ID | Increment | Task | Depends On | Acceptance Criteria | Verification | Status |
|---|---|---|---|---|---|---|
| TASK-SAN-001 | INC-SAN-001 | Create Santri Entity & Migration | - | ULID primary key & schema ready | Pest migration test | Completed |
| TASK-SAN-002 | INC-SAN-002 | Create Service & Contract | TASK-SAN-001 | SantriService returns DTO | Larastan L7 pass | Completed |
| TASK-SAN-003 | INC-SAN-003 | Create Slim Controller & Route | TASK-SAN-002 | Controller < 50 lines | Route test pass | Completed |

## Definition of Done

- [x] Scope task selesai.
- [x] Test positif/negatif relevan tersedia.
- [x] Authorization, audit, migration, dan security impact ditinjau.
- [x] Verification evidence tersimpan.
- [x] Documentation dan execution log diperbarui.
