# ADR-001: Modular DDD-Lite Architecture and ServiceProvider Auto-Discovery

## Status
Accepted

## Date
2026-07-23

## Context
As the Laravel application grows, placing all Controllers, Services, and Models flat inside `app/Http/Controllers` and `app/Models` creates tight coupling and monolithic friction. We need an extensible structure where features can be isolated into self-contained Modules and Submodules, with mirrored frontend React structures.

## Decision
Adopt a **Modular DDD-Lite (Domain-Driven Design Lite)** directory architecture:
1. Modules live in `app/Modules/{Module}/{Submodule}/`.
2. Each submodule is self-contained with: `Database/`, `DTO/`, `Http/`, `Integration/`, `Models/`, `Policies/`, `Providers/`, `Services/`, `Support/`, `Transactions/`, `routes.php`, and `permissions.php`.
3. Auto-Discovery: `App\Shared\Providers\ModuleServiceProvider` automatically scans and registers `routes.php` and `permissions.php` across all submodules.
4. Frontend Mirroring: React page files live in `resources/js/pages/{Module}/{Submodule}/`.
5. CLI Automation: `php artisan make:module` command generates the full backend and frontend scaffold.

## Alternatives Considered
- **Nwidart/laravel-modules Package:** Rejected due to heavy opinionated overhead and extra package dependencies.
- **Flat Standard Laravel Structure:** Rejected due to lack of modular boundary isolation.

## Consequences
- Clean separation of concerns per submodule.
- Adding new features requires minimal configuration — simply run `php artisan make:module`.
- Code changes in one submodule do not pollute other domain areas.
