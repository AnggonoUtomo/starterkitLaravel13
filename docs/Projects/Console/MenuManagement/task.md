# Task Plan: MenuManagement

| ID | Task Description | Target File(s) | Status |
|---|---|---|---|
| MENU-001 | Buat dokumentasi spesifikasi & rencana implementasi | `docs/Projects/Console/MenuManagement/*` | ✅ Done |
| MENU-002 | Buat migration `create_menu_items_table` & Entity `MenuItem` | `Database/Migrations/*`, `Domain/Entities/MenuItem.php` | 🔲 Planned |
| MENU-003 | Buat DTO, Contracts, dan `MenuService` | `DTO/*`, `Contracts/*`, `Services/MenuService.php` | 🔲 Planned |
| MENU-004 | Buat `MenuItemController`, Requests, & `permissions.php` | `Http/Controllers/*`, `routes.php`, `permissions.php` | 🔲 Planned |
| MENU-005 | Implementasi unit & feature test `MenuItemTest` | `Tests/Feature/MenuItemTest.php` | 🔲 Planned |
| MENU-006 | Buat komponen Frontend (Tree View & Reorder UI) | `resources/js/pages/Console/MenuManagement/*` | 🔲 Planned |
| MENU-007 | Integrasikan `ConsoleLayout.tsx` dengan `MenuService` | `resources/js/layouts/ConsoleLayout.tsx` | 🔲 Planned |
| MENU-008 | Verifikasi build & update execution log | `planning/execution-log.md` | 🔲 Planned |

## Definition of Done

- [ ] Spesifikasi disetujui.
- [ ] Backend: Controller < 50 baris, Service, DTO, Entity, Transaction, Permissions.
- [ ] Frontend: Page + components implemented.
- [ ] Feature tests written and passing 100%.
- [ ] ESLint 0 error, Vite build sukses.
- [ ] Documentation diperbarui.
