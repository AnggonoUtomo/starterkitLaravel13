# Master Architecture & Implementation Plan

## Overview
Decompose the starterkit development into 4 distinct phases: Infrastructure, Shared Kernel, Module Generator Tooling, and Core Console Submodules (`UserManagement`, `AccessControl`, `SystemSetting`).

## Architecture Decisions
- **DDD-Lite Structure:** Modules organized under `app/Modules/{Module}/{Submodule}`.
- **Auto-Discovery:** Routes and permissions automatically discovered via `ModuleServiceProvider`.
- **Frontend Mirroring:** React pages stored under `resources/js/pages/{Module}/{Submodule}`.

## Task Breakdown

### Phase 1: Infrastructure & Dependencies Setup
- [x] Task 1.1: Remove Wayfinder (`laravel/wayfinder` & `@laravel/vite-plugin-wayfinder`).
- [x] Task 1.2: Install Ziggy (`tightenco/ziggy` & `ziggy-js`), Spatie Permission (`spatie/laravel-permission`), and Redis (`predis/predis`).
- [x] Task 1.3: Install Framer Motion (`framer-motion`) and update `vite.config.ts`.
- [x] Task 1.4: Update `.env` to configure Redis for Cache, Session, and Queue.

### Phase 2: Shared Kernel Architecture
- [x] Task 2.1: Create `ModuleServiceProvider` for auto-discovering routes and permissions.
- [x] Task 2.2: Create Base DTO (`BaseDTO`), Domain Event Contract (`DomainEventContract`), and `AuditLogService`.
- [x] Task 2.3: Register `ModuleServiceProvider` in `bootstrap/providers.php`.

### Phase 3: CLI Module Generator Tool
- [x] Task 3.1: Create `php artisan make:module` command.
- [x] Task 3.2: Implement auto-scaffolding of backend directories & frontend React pages.

### Phase 4: Core Console Module Implementation
- [x] Task 4.1: Build `Console/UserManagement` (User CRUD, Impersonation Mode, DTOs, Services, Controller, Routes, Permissions, React UI).
- [x] Task 4.2: Build `Console/AccessControl` (Spatie Role CRUD, Visual Permission Matrix Grid, Controller, Routes, Permissions, React UI).
- [x] Task 4.3: Build `Console/SystemSetting` (System Health Checks, Module Registry, Controller, Routes, Permissions, React UI).
- [x] Task 4.4: Build `ConsoleLayout`, `CommandPalette` (`Ctrl+K`), and `ImpersonationBanner` with Framer Motion.

### Phase 5: Console Expansion (AuditLog, Profile, Theme Management)
- [ ] Task 5.1: Build `Console/AuditLog` (Domain Event logger integration, AuditLogQueryService, Controller, Routes, Permissions, React UI with detail drawer).
- [ ] Task 5.2: Build `Console/Profile` (Fortify profile & security integration inside `ConsoleLayout`, Controller, Routes, Permissions, React UI).
- [ ] Task 5.3: Add Dark/Light/System Theme Switcher in `ConsoleLayout` header.

## Verification Checkpoints
- [x] Checkpoint 1: Database migrated & seeded (`php artisan migrate:fresh --seed`).
- [x] Checkpoint 2: Vite assets built cleanly (`npm run build`).
- [x] Checkpoint 3: Pest test suite passed 100% (`php artisan test`).
- [x] Checkpoint 4: Code formatted cleanly via Pint and ESLint (`vendor/bin/pint --format agent` & `npm run lint`).
- [ ] Checkpoint 5: AuditLog and Profile submodules pass Pest feature tests.
