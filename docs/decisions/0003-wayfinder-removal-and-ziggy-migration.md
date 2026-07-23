# ADR-003: Removal of Wayfinder and Migration to Ziggy

## Status
Accepted

## Date
2026-07-23

## Context
The project initially included `@laravel/vite-plugin-wayfinder` and `laravel/wayfinder`. However, Wayfinder enforces specific code-generation patterns that collided with the custom DDD-Lite submodule route auto-discovery mechanism.

## Decision
1. Remove `laravel/wayfinder` from Composer and `@laravel/vite-plugin-wayfinder` from NPM.
2. Adopt `tightenco/ziggy` and `ziggy-js` as the client-side route helper engine for Inertia React pages (`route()`).
3. Configure Vite resolution aliases to support clean imports from `@Modules`.

## Alternatives Considered
- **Keeping Wayfinder alongside Ziggy:** Rejected due to duplicate route generation overhead and typescript compilation conflicts.

## Consequences
- Clean, familiar `route('console.user-management.index')` syntax in Inertia React.
- Seamless compatibility with dynamic auto-discovered submodule routes.
