# Submodule Plan: Console/Profile

## Overview
Implement the Profile & Account Security domain slice inside Console Admin.

## Architecture
- `Http/Controllers/ProfileController.php`: Handles profile render & update delegating to Fortify actions.
- `routes.php`: Defines `console/profile` endpoints.
- `permissions.php`: Declares `profile.view`, `profile.edit`.

## Task Breakdown
- [ ] Task 1: Create `ProfileController.php`
- [ ] Task 2: Create `routes.php` and `permissions.php`
- [ ] Task 3: Create React page `resources/js/pages/Console/Profile/Index.tsx`
