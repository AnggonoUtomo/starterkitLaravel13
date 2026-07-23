# Rencana Master Arsitektur & Pelaksanaan

## Ringkasan
Membagi pengembangan starterkit ke dalam 5 fase utama: Infrastruktur, Kernel Bersama, Alat CLI Generator, Submodul Utama Console, dan Ekosistem Observabilitas & CI/CD.

## Keputusan Arsitektur
- **Struktur DDD-Lite:** Modul diorganisir di bawah `app/Modules/{Module}/{Submodule}`.
- **Auto-Discovery:** Rute dan izin didaftarkan secara otomatis via `ModuleServiceProvider`.
- **Penyelarasan Frontend:** Halaman React disimpan di `resources/js/pages/{Module}/{Submodule}`.

## Rincian Perencanaan Tugas

### Fase 1: Setup Infrastruktur & Dependensi
- [x] Tugas 1.1: Mencopot Wayfinder (`laravel/wayfinder` & `@laravel/vite-plugin-wayfinder`).
- [x] Tugas 1.2: Menginstal Ziggy (`tightenco/ziggy` & `ziggy-js`), Spatie Permission (`spatie/laravel-permission`), dan Redis (`predis/predis`).
- [x] Tugas 1.3: Menginstal Framer Motion (`framer-motion`) dan mengonfigurasi `vite.config.ts`.
- [x] Tugas 1.4: Mengonfigurasi `.env` untuk Redis pada Cache, Session, dan Queue.

### Fase 2: Arsitektur Kernel Bersama (Shared Kernel)
- [x] Tugas 2.1: Membuat `ModuleServiceProvider` untuk auto-discovery rute dan izin.
- [x] Tugas 2.2: Membuat Base DTO (`BaseDTO`), Kontrak Event Domain (`DomainEventContract`), dan `AuditLogService`.
- [x] Tugas 2.3: Mendaftarkan `ModuleServiceProvider` pada `bootstrap/providers.php`.

### Fase 3: Alat CLI Module Generator
- [x] Tugas 3.1: Membuat perintah `php artisan make:module`.
- [x] Tugas 3.2: Mengimplementasikan pembuatan otomatis direktori backend, frontend React, dan dokumentasi submodul.

### Fase 4: Implementasi Submodul Utama Console Admin
- [x] Tugas 4.1: Membangun `Console/UserManagement` (CRUD User, Mode Impersonasi, DTO, Service, Controller, Rute, Izin, UI React).
- [x] Tugas 4.2: Membangun `Console/AccessControl` (CRUD Role Spatie, Visual Permission Matrix Grid, Controller, Rute, Izin, UI React).
- [x] Tugas 4.3: Membangun `Console/SystemSetting` (Pengecekan Kesehatan Sistem, Registry Modul, Controller, Rute, Izin, UI React).
- [x] Tugas 4.4: Membangun `ConsoleLayout`, `CommandPalette` (`Ctrl+K`), dan `ImpersonationBanner` dengan animasi Framer Motion.

### Phase 5: Console Expansion (AuditLog, Profile, Theme Management)
- [x] Task 5.1: Build `Console/AuditLog` (Domain Event logger integration, AuditLogQueryService, Controller, Routes, Permissions, React UI with detail drawer).
- [x] Task 5.2: Build `Console/Profile` (Fortify profile & security integration inside `ConsoleLayout`, Controller, Routes, Permissions, React UI).
- [x] Task 5.3: Add CI/CD GitHub Actions pipeline & ObservabilityService instrumentation.

### Phase 6: UI Enhancements (Theme Switcher & Real-time Toast Notifications)
- [x] Task 6.1: Build `ToastNotification.tsx` component with Framer Motion slide-in animation.
- [x] Task 6.2: Add Dark/Light/System Theme Switcher dropdown control in `ConsoleLayout` header.
- [x] Task 6.3: Integrate `ToastNotification` into `ConsoleLayout` listening to Inertia flash props.

## Titik Verifikasi (Verification Checkpoints)
- [x] Checkpoint 1: Database berhasil dimigrasi & di-seed (`php artisan migrate:fresh --seed`).
- [x] Checkpoint 2: Asset Vite terkompilasi bersih (`npm run build`).
- [x] Checkpoint 3: Seluruh unit test Pest PHP lolos 100% (46/46 passed).
- [x] Checkpoint 4: Kode terformat rapi via Pint dan ESLint (`vendor/bin/pint --format agent` & `npm run lint`).
- [x] Checkpoint 5: Pipeline CI/CD GitHub Actions dan Observabilitas siap rilis.
- [x] Checkpoint 6: Theme Switcher & Toast Notification System berfungsi sempurna.
