# Production Shipping & Launch Checklist

## 1. Pre-Flight Quality Gates
- [x] All Pest unit and feature tests pass 100% (`php artisan test`).
- [x] Code style strictly adheres to Pint (`vendor/bin/pint --test`).
- [x] ESLint & Prettier checks pass (`npm run lint` & `npm run format`).
- [x] GitHub Actions CI pipeline configured and passing on `main` branch.

## 2. Infrastructure & Environment Security
- [ ] Application Key generated (`php artisan key:generate`).
- [ ] Production secrets set in environment manager (never committed to repository).
- [ ] `APP_DEBUG` explicitly set to `false` in production `.env`.
- [ ] Redis configured for Cache (`CACHE_STORE=redis`), Session (`SESSION_DRIVER=redis`), and Queue (`QUEUE_CONNECTION=redis`).
- [ ] SSL / HTTPS configured and enforced.

## 3. Database & Migrations
- [ ] Production database backup taken before running migrations.
- [ ] Database migrations executed in non-interactive mode (`php artisan migrate --force`).
- [ ] Spatie permission matrix auto-synced via `ModuleServiceProvider`.

## 4. Observability & Monitoring
- [ ] Health check endpoint verified via `ObservabilityService::getMetrics()`.
- [ ] Log aggregation configured for daily audit trail and error logging.
- [ ] Queue worker processes monitored via Supervisor / Laravel Horizon.

## 5. Rollback Procedure
- [ ] In case of critical failure, execute git rollback to previous tagged release.
- [ ] Clear application cache: `php artisan cache:clear && php artisan config:clear`.
