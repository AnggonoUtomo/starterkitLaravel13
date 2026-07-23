# Submodule Plan: Console/SystemSetting

## Overview
Implement System Health Monitoring and Module Registry dashboard.

## Architecture
- `Services/SystemHealthService.php`: Safely pings Database & Redis, collects environment config, and aggregates discovered module permissions.
- `Http/Controllers/SystemSettingController.php`: Renders Inertia response.
- `routes.php`: Registers `console/system-settings` routes.
- `permissions.php`: Declares `system.view`, `system.manage`.

## Task Breakdown
- [x] Task 1: Create `SystemHealthService.php`
- [x] Task 2: Create `SystemSettingController.php`
- [x] Task 3: Declare `routes.php` and `permissions.php`
- [x] Task 4: Create React page `resources/js/pages/Console/SystemSetting/Index.tsx`
