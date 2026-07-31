# Submodule: MenuManagement

## Submodule Context

| Item | Value |
|---|---|
| Slug | `console.menu-management` |
| Module Owner | Console (`app/Modules/Console/`) |
| Backend Namespace | `App\Modules\Console\MenuManagement` |
| Frontend Path | `resources/js/pages/Console/MenuManagement` |
| Mode | Module Extension |
| Owner | Saka |
| Status | 🔲 Planned |

## Intake Summary

- **Existing Capability**: Static Sidebar Navigation (`ConsoleLayout.tsx`) berbasis array `navItems` & permission check.
- **Requested Capability**: Pengelolaan navigasi menu dinamis berbasis database (hierarki parent-child, ordering, icon selection, route mapping, dan permission binding Spatie `*.view`).
- **Baseline Documents**: `docs/03-IMPLEMENTATION/03.04-FOLDER-STRUCTURE.md`, `docs/03-IMPLEMENTATION/03.07-MODULES.md`
- **Out of scope**: Multi-tenant menu isolation, dynamic menu builder drag-and-drop untuk end-user publik non-admin.

## Related Files

- [Specification](./specification.md)
- [Implementation Plan](./implementation-plan.md)
- [Roadmap](./roadmap.md)
- [Task List](./task.md)
- [Execution Log](./planning/execution-log.md)

## Working Rules

Gunakan baseline global sebagai source of truth. Setiap increment wajib mengikuti pola DDD-lite modular, `declare(strict_types=1);`, slim controllers (< 50 baris), serta 0 placeholder (`// TODO`).
