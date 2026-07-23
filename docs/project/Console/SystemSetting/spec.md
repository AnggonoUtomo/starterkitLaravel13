# Submodule Spec: Console/SystemSetting

## Objective
Display system health indicators (Database, Redis, PHP, Laravel, Queue) and auto-discovered module registry status.

## Tech Stack & Dependencies
- Backend: `SystemSettingController`, `SystemHealthService`
- Integration: Database PDO ping, Redis ping, `ModuleServiceProvider`
- Frontend Page: `resources/js/pages/Console/SystemSetting/Index.tsx`

## Acceptance Criteria
- [x] Displays health cards for Database, Redis infrastructure, PHP version, and Queue driver.
- [x] Gracefully handles disconnected Redis or DB without throwing fatal uncaught exceptions.
- [x] Lists auto-discovered DDD-Lite modules and submodules with permission counts.

## Verification Steps
- Run feature test: `php artisan test --filter=ModuleSystemTest`
