# ADR-005: CI/CD Quality Pipeline and Observability Instrumentation

## Status
Accepted

## Date
2026-07-23

## Context
To prepare for enterprise production shipping and automated code quality validation:
1. Every commit and pull request must be verified by automated GitHub Actions CI.
2. System health, Redis status, and performance metrics must be visible via observability endpoints.
3. Pre-launch shipping checklists must be documented and verified.

## Decision
1. **GitHub Actions CI/CD Pipeline (`.github/workflows/ci.yml`)**:
   - Runs on PHP 8.4 with Redis 7 service container.
   - Quality Gates: Composer & NPM Dependency Caching, Pint Formatting Check, ESLint & TypeScript Checking, Vite Asset Build, and Pest Feature Test Suite (46+ tests).
2. **Observability & Health Instrumentation**:
   - `App\Shared\Services\ObservabilityService`: Tracks system metrics (request latency, memory usage, Redis status, DB connection status).
   - `/up` and `/console/system-settings` health routes.
3. **Shipping & Production Readiness Checklist (`docs/shipping-checklist.md`)**:
   - Pre-deployment quality checks, environment secret handling, and zero-downtime deployment guidance.

## Consequences
- No broken code reaches `main` branch.
- Instant visibility into application health and resource consumption.
- Reliable, repeatable automated shipping process.
