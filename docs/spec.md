# Spesifikasi Proyek: Starterkit Laravel 13 Modular DDD-Lite

## Tujuan Proyek
Membangun starterkit Laravel 13 + Inertia v3 React 19 berskala enterprise dengan struktur modular. Starterkit ini dilengkapi modul Administrator Console (`UserManagement`, `AccessControl` Spatie RBAC, `SystemSetting`, `AuditLog`, `Profile`), generator CLI modul (`php artisan make:module`), infrastruktur Redis, serta mikro-animasi via Framer Motion.

## Teknologi Utama (Tech Stack)
- **Framework Utama:** PHP 8.4 & Laravel 13
- **Frontend SPA:** Inertia.js v3 + React 19 + TypeScript
- **Autentikasi:** Laravel Fortify
- **Otorisasi & RBAC:** `spatie/laravel-permission` (Cache via Redis)
- **Cache, Sesi & Antrean:** Redis (`predis/predis`)
- **Tampilan & Animasi:** Tailwind CSS v4 + Framer Motion
- **Navigasi Rute Client:** Ziggy (`tightenco/ziggy`)

## Perintah Pengembangan
- **Menjalankan Dev Server:** `npm run dev` / `php artisan serve`
- **Build Produksi:** `npm run build`
- **Menjalankan Pengujian:** `php artisan test`
- **Pengujian Spesifik:** `php artisan test --filter=ModuleSystemTest`
- **Format Kode PHP:** `vendor/bin/pint --format agent`
- **Format & Linter JS/TS:** `npm run lint` & `npm run format`
- **Generator Modul CLI:** `php artisan make:module {Module}/{Submodule}`

## Struktur Direktori Proyek
```text
app/
├── Shared/                      <-- Kernel Bersama (Kontrak, DTO, Event Bus, Audit Logger)
│   ├── Contracts/
│   ├── DTO/
│   ├── Providers/               <-- ModuleServiceProvider (Auto-discovery Rute & Izin)
│   └── Services/
└── Modules/
    └── Console/                 <-- Namespace Modul Utama
        ├── UserManagement/      <-- Submodul (Database, DTO, Http, Integration, Models, Policies, Providers, Services, Support, Transactions, routes.php, permissions.php)
        ├── AccessControl/       <-- Submodul RBAC
        ├── SystemSetting/       <-- Submodul Health & Setting
        ├── AuditLog/            <-- Submodul Activity Log
        └── Profile/             <-- Submodul Profil Akun

resources/js/
├── layouts/                     <-- Layout Utama (ConsoleLayout.tsx)
├── components/                  <-- Komponen Bersama (CommandPalette.tsx, ImpersonationBanner.tsx)
├── types/                       <-- Tipe TypeScript & Kontrak Global
└── pages/
    └── Console/                 <-- Halaman Frontend (Mirroring Backend)
        ├── UserManagement/
        ├── AccessControl/
        ├── SystemSetting/
        ├── AuditLog/
        └── Profile/

docs/
├── decisions/                   <-- Catatan Keputusan Arsitektur (ADR)
├── project/                     <-- Dokumentasi Detail Per-Modul
└── spec.md                      <-- Spesifikasi Global Proyek
```

## Konvensi & Gaya Penulisan Kode
- **PHP 8.4:** Menggunakan *constructor property promotion*, *strict typing*, dan dokumentasi tipe array PHPDoc.
- **Standar Kode:** Mengikuti standar Pint (`vendor/bin/pint --format agent`) dan ESLint (`npm run lint`).
- **Isolasi DDD-Lite:** Setiap submodul memiliki `routes.php` dan `permissions.php` independen.
- **Penyelarasan Frontend:** Struktur folder halaman React mengikuti lokasi submodul backend secara langsung (`pages/Console/UserManagement/Index.tsx`).

## Strategi Pengujian
- **Framework Pengujian:** Pest PHP 4 (`pestphp/pest`).
- **Pengujian Fitur:** Berlokasi di `tests/Feature/`. Memastikan auto-discovery rute, generator CLI, dan semua endpoint submodul berfungsi 100%.
- **Syarat Lolos:** Seluruh unit test & feature test wajib lolos (100% PASS) sebelum commit.

## Batasan & Aturan
- **Wajib:** Jalankan `vendor/bin/pint --format agent` dan `php artisan test` sebelum melakukan commit; pastikan secret di `.env` tidak pernah ter-commit.
- **Konfirmasi Dulu:** Jika ingin menambah library UI berat baru atau mengubah dependensi inti Laravel.
- **Dilarang:** Mengubah atau merusak kontrak API tanpa memperbarui kode pemanggilnya.

## Kriteria Keberhasilan
1. Wayfinder digantikan sepenuhnya oleh helper rute Ziggy.
2. CLI Generator `make:module` berhasil membuat struktur backend, frontend, dan dokumentasi submodul secara otomatis.
3. Matrix Izin Spatie RBAC berfungsi interaktif secara real-time.
4. Fitur Impersonasi User berfungsi dengan banner animasi Framer Motion.
5. Seluruh pengujian Pest PHP lolos 100%.
