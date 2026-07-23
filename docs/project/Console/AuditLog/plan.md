# Submodule Plan: Console/AuditLog

## Overview
Implement the Audit Log domain slice for tracking and displaying security events.

## Architecture
- `DTO/AuditLogDTO.php`: Data object for log records.
- `Services/AuditLogQueryService.php`: Reads and paginates log entries.
- `Http/Controllers/AuditLogController.php`: Handles index request and Inertia render.
- `routes.php`: Defines `console/audit-logs` endpoint.
- `permissions.php`: Declares `audit-logs.view` and `audit-logs.export`.

## Task Breakdown
- [ ] Task 1: Create `AuditLogDTO.php`
- [ ] Task 2: Create `AuditLogQueryService.php`
- [ ] Task 3: Create `AuditLogController.php`
- [ ] Task 4: Create `routes.php` and `permissions.php`
- [ ] Task 5: Create React page `resources/js/pages/Console/AuditLog/Index.tsx` with Framer Motion drawer
