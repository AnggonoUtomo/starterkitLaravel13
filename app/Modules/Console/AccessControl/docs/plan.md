# Submodule Plan: Console/AccessControl

## Overview
Implement Spatie Role and Permission Matrix Grid UI and backend logic.

## Architecture
- `Services/RoleService.php`: Syncs permissions from `ModuleServiceProvider` and fetches matrix data.
- `Http/Controllers/RoleController.php`: Manages role CRUD and permission toggle endpoints.
- `routes.php`: Registers `console/access-control` routes.
- `permissions.php`: Declares `roles.view`, `roles.create`, `roles.edit`, `roles.delete`.

## Task Breakdown
- [x] Task 1: Create `RoleService.php` with auto-sync logic
- [x] Task 2: Create `RoleController.php`
- [x] Task 3: Declare `routes.php` and `permissions.php`
- [x] Task 4: Create React page `resources/js/pages/Console/AccessControl/Index.tsx`
