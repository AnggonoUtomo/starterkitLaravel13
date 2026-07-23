# ADR-002: Spatie RBAC and Redis Infrastructure Integration

## Status
Accepted

## Date
2026-07-23

## Context
The application requires enterprise-grade access control (Roles and Permissions) and high-speed infrastructure for sessions, caching, and background events.

## Decision
1. **Authorization:** Use `spatie/laravel-permission` for Role-Based Access Control (RBAC).
2. **Permission Registration:** Permissions are declared per submodule in `permissions.php` and auto-discovered into database tables.
3. **Redis Integration:** Use Redis (`predis/predis`) for:
   - `CACHE_STORE=redis`: Fast caching of Spatie roles/permissions and module registries.
   - `SESSION_DRIVER=redis`: Scalable, high-performance user session storage.
   - `QUEUE_CONNECTION=redis`: Asynchronous processing of domain events and audit logs.

## Alternatives Considered
- **Custom Database Role System:** Rejected because Spatie Permission is battle-tested, widely supported, and natively handles direct permissions and role caching.
- **File/Array Cache:** Rejected due to performance limits under concurrent multi-user production workloads.

## Consequences
- Fast permission checks cached in Redis.
- Easy integration with Inertia React props via `HandleInertiaRequests` middleware.
