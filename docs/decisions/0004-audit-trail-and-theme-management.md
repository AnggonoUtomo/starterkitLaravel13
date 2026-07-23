# ADR-004: Audit Trail Submodule via Domain Events and Theme Management

## Status
Accepted

## Date
2026-07-23

## Context
As the Console Admin module expands, administrators need:
1. Visual inspection of system events (user created, role assigned, permission toggled, settings updated).
2. Account profile & security management integrated directly into `ConsoleLayout`.
3. Seamless Dark/Light/System theme toggling in the Console Admin interface.

## Decision
1. **Audit Trail Submodule (`Console/AuditLog`)**:
   - Create submodule `Console/AuditLog` with `AuditLogController`, `AuditLogService`, `routes.php`, and `permissions.php`.
   - Store domain activity logs using `AuditLogService` listening to system events.
   - Provide a paginated, filterable Activity Log table UI with Framer Motion details drawer.

2. **Console Profile Integration (`Console/Profile`)**:
   - Create submodule `Console/Profile` wrapping Fortify user profile update, password change, and security settings inside `ConsoleLayout`.

3. **Theme Management**:
   - Store theme preference (`dark` | `light` | `system`) in `localStorage` & cookie.
   - Provide a quick toggle control in `ConsoleLayout` header.

## Alternatives Considered
- **Spatie Activitylog Package:** Rejected to keep the starterkit lightweight and demonstrate native Laravel Domain Event logging via `AuditLogService`.

## Consequences
- Full visibility of security events for administrators.
- Consistent user experience across Profile, Console Settings, and Audit Trail.
