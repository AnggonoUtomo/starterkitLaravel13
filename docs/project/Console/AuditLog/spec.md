# Submodule Spec: Console/AuditLog

## Objective
Provide a visual Audit Trail / Activity Log viewer for System Administrators to monitor security actions (user registration, role assignment, permission changes, impersonation events).

## Tech Stack & Dependencies
- Backend: `AuditLogController`, `AuditLogService`, `AuditLogDTO`
- Storage: Daily log / Database audit records
- Shared Contract: `DomainEventContract`
- Frontend Page: `resources/js/pages/Console/AuditLog/Index.tsx`

## Acceptance Criteria
- [ ] Admin can view paginated audit logs with user info, action name, payload, and timestamp.
- [ ] Admin can filter logs by action type or search by user email.
- [ ] Log entry details can be expanded via Framer Motion slide-over drawer.
- [ ] Submodule route `console/audit-logs` registered under `console.audit-log.` name prefix.
- [ ] Permissions `audit-logs.view` and `audit-logs.export` declared in `permissions.php`.

## Verification Steps
- Pest Feature Test: `php artisan test --filter=AuditLogTest`
- Manual check: Trigger user action and verify log entry appears in Audit Log UI.
