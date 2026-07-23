# Submodule Spec: Console/AccessControl

## Objective
Provide Spatie Role management and an interactive Visual Permission Matrix Grid (Roles vs Permissions grouped by Submodule).

## Tech Stack & Dependencies
- Backend: `RoleController`, `RoleService`
- Package: `spatie/laravel-permission`
- Auto-Discovery: `ModuleServiceProvider::getDiscoveredPermissions()`
- Frontend Page: `resources/js/pages/Console/AccessControl/Index.tsx`

## Acceptance Criteria
- [x] Auto-discovered submodule permissions are synced into Spatie `permissions` table.
- [x] Admin can view matrix grid showing permissions grouped by submodule vs roles.
- [x] Admin can toggle permission assignments on roles in real time.
- [x] Admin can create new roles and delete non-Super Admin roles.

## Verification Steps
- Run feature test: `php artisan test --filter=ModuleSystemTest`
