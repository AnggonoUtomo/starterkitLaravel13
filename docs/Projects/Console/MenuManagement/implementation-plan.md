# Implementation Plan: MenuManagement

## Delivery Strategy

Pengembangan dilakukan secara vertikal bertahap (incremental) mengikuti standar DDD-lite SAKAAI.

## Phases & Increments

### Phase 1: Backend Foundation

| Increment | Scope | Status |
|---|---|---|
| INC-M01 | Migration `create_menu_items_table`, Entity `MenuItem`, Seeder | 🔲 Planned |
| INC-M02 | DTO, Contracts (`MenuServiceContract`), Service (`MenuService`) | 🔲 Planned |
| INC-M03 | Slim Controller (`MenuItemController`), Form Requests, permissions.php | 🔲 Planned |
| INC-M04 | Feature Tests (`MenuItemTest`) & Contract Verification | 🔲 Planned |

### Phase 2: Frontend UI & Dynamic Integration

| Increment | Scope | Status |
|---|---|---|
| INC-M05 | Frontend Pages (`resources/js/pages/Console/MenuManagement/Index.tsx`) | 🔲 Planned |
| INC-M06 | Interactive Menu Tree & Reorder Component | 🔲 Planned |
| INC-M07 | Modal Form Create/Edit & Icon Selector Component | 🔲 Planned |
| INC-M08 | Integrasi `ConsoleLayout.tsx` ke `MenuService` dinamis | 🔲 Planned |

## Risk & Mitigation

| Risk | Mitigation |
|---|---|
| Circular parent-child reference | Validation rule pada Form Request untuk mencegah item menjadi parent dari dirinya sendiri atau descendant-nya. |
| Broken navigation jika menu aktif dinonaktifkan | Fallback route redirect ke `/console/dashboard` jika URL target tidak valid. |
