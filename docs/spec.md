# Project Specification: Modular DDD-Lite Laravel 13 Starterkit

## Objective
Build an enterprise-grade, modular Laravel 13 + Inertia v3 React 19 starterkit featuring a Console Administrator module (`UserManagement`, `AccessControl` Spatie RBAC, `SystemSetting`), a CLI Module Generator tool (`php artisan make:module`), Redis infrastructure, and reactive micro-animations via Framer Motion.

## Tech Stack
- **Framework:** PHP 8.4 & Laravel 13
- **Frontend SPA:** Inertia.js v3 + React 19 + TypeScript
- **Authentication:** Laravel Fortify
- **Authorization & RBAC:** `spatie/laravel-permission` (Cached via Redis)
- **Cache, Session & Queue:** Redis (`predis/predis`)
- **Styling & Animation:** Tailwind CSS v4 + Framer Motion
- **Client Routing:** Ziggy (`tightenco/ziggy`)

## Commands
- **Dev Server:** `npm run dev` / `php artisan serve`
- **Build Production:** `npm run build`
- **Run Tests:** `php artisan test`
- **Run Pest Filter:** `php artisan test --filter=ModuleSystemTest`
- **PHP Code Formatter:** `vendor/bin/pint --format agent`
- **JS/TS Linter & Format:** `npm run lint` & `npm run format`
- **Module Generator CLI:** `php artisan make:module {Module}/{Submodule}`

## Project Structure
```text
app/
├── Shared/                      <-- Shared Kernel (Contracts, DTOs, Event Bus, Audit Logger)
│   ├── Contracts/
│   ├── DTO/
│   ├── Providers/               <-- ModuleServiceProvider (Route & Permission Discovery)
│   └── Services/
└── Modules/
    └── Console/                 <-- Module Namespace
        ├── UserManagement/      <-- Submodule (Database, DTO, Http, Integration, Models, Policies, Providers, Services, Support, Transactions, routes.php, permissions.php, docs/)
        ├── AccessControl/       <-- Submodule
        └── SystemSetting/       <-- Submodule

resources/js/
├── layouts/                     <-- Shared UI Layouts (ConsoleLayout.tsx)
├── components/                  <-- Shared UI Components (CommandPalette.tsx, ImpersonationBanner.tsx)
├── types/                       <-- Shared TypeScript Contracts & Global Types
└── pages/
    └── Console/                 <-- Mirrored Frontend Pages
        ├── UserManagement/
        ├── AccessControl/
        └── SystemSetting/

docs/
├── decisions/                   <-- Architecture Decision Records (ADRs)
└── spec.md                      <-- Global Project Specification
```

## Code Style & Conventions
- **PHP 8.4:** Constructor property promotion, strict typing, scalar hints, PHPDoc shape annotations.
- **Strict Formatting:** Follow Pint (`vendor/bin/pint --format agent`) and ESLint (`npm run lint`).
- **DDD-Lite Isolation:** Each submodule contains its own `routes.php` and `permissions.php`.
- **Frontend Mirroring:** Frontend React page folders mirror backend submodule paths exactly (`pages/Console/UserManagement/Index.tsx`).

## Testing Strategy
- **Framework:** Pest PHP 4 (`pestphp/pest`).
- **Feature Tests:** Located in `tests/Feature/`. Covers route auto-discovery, CLI generator, and submodule endpoints.
- **Coverage Gate:** 100% test pass rate required before committing changes.

## Boundaries
- **Always do:** Run `vendor/bin/pint --format agent` and `php artisan test` before committing; ensure `.gitignore` excludes secrets.
- **Ask first:** Adding heavy external UI libraries (e.g. MUI/Antd) or modifying core Laravel dependencies.
- **Never do:** Commit `.env` secrets, delete unit tests to hide failures, or break API contracts without updating callers.

## Success Criteria
1. Wayfinder removed and replaced by Ziggy route helpers.
2. CLI generator `make:module` scaffolds complete backend & frontend structures.
3. Spatie RBAC Permission Matrix Grid functions with real-time toggle.
4. User Impersonation Mode functions with Framer Motion alert bar.
5. All Pest feature tests pass clean (100%).
