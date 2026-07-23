# Submodule Plan: Console/UserManagement

## Overview
Build the User Management domain slice following DDD-Lite architecture rules.

## Architecture
- `DTO/UserDTO.php`: Transforms Eloquent User Model into clean data array.
- `Services/UserService.php`: Encapsulates pagination, CRUD operations, and session impersonation logic.
- `Http/Controllers/UserController.php`: Handles request validation and Inertia response rendering.
- `routes.php`: Registers `console/users` routes with `console.user-management.` name prefix.
- `permissions.php`: Declares `users.view`, `users.create`, `users.edit`, `users.delete`, `users.impersonate`.

## Task Breakdown
- [x] Task 1: Create `UserDTO.php`
- [x] Task 2: Create `UserService.php`
- [x] Task 3: Create `UserController.php`
- [x] Task 4: Create `routes.php` and `permissions.php`
- [x] Task 5: Create React page `resources/js/pages/Console/UserManagement/Index.tsx`
