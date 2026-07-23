# Modular DDD-Lite Laravel 13 Starterkit (`Console` Module & Module Generator)

## Problem Statement
> *How might we build an enterprise-grade modular Laravel 13 + Inertia React starterkit featuring a Console Administrator module (User, RBAC, System Settings), a CLI Module Generator tool, DDD-Lite directory architecture, Redis infrastructure, and reactive micro-animations?*

---

## Recommended Direction

Aplikasi dibangun sebagai **Modular DDD-Lite Starterkit** berbasis **Laravel 13** dan **Inertia v3 + React 19**. Arsitektur membagi aplikasi ke dalam hirarki **Module / Submodule** yang mandiri dan tercermin sama (*mirrored*) antara Backend (PHP) dan Frontend (React TypeScript).

Setiap submodule didesain memiliki *domain layout* internal yang lengkap: `Database/`, `DTO/`, `Http/`, `Integration/`, `Models/`, `Policies/`, `Providers/`, `Services/`, `Support/`, `Transactions/`, `routes.php`, dan `permissions.php`.

Untuk mempercepat pengembangan modul-modul di masa mendatang, dibuatkan **CLI Module Generator** (`php artisan make:module`) yang secara otomatis membuat scaffold backend & frontend serta mengaitkan route dan permission submodule ke sistem.

---

## Technical Stack & Architecture

### **Tech Stack**
- **Backend Framework:** PHP 8.4 & Laravel 13
- **Cache, Session & Queue Engine:** Redis (`predis/predis` / `phpredis`)
- **Frontend Stack:** Inertia.js v3 + React 19 + TypeScript
- **Authentication:** Laravel Fortify
- **Authorization & RBAC:** `spatie/laravel-permission` (Cache via Redis)
- **Styling & Animation:** Tailwind CSS v4 + Framer Motion
- **Routing Engine:** Ziggy (`tightenco/ziggy`)
- **Developer Tooling:** CLI Module Generator (`php artisan make:module`)

### **Detailed Submodule Anatomy (Backend & Frontend Mirror)**
```text
[BACKEND SUBMODULE STRUCTURE]
app/Modules/Console/UserManagement/
├── Database/          <-- Migrations, Seeders, Factories
├── DTO/               <-- Data Transfer Objects
├── Http/              <-- Controllers, Requests, Resources
├── Integration/       <-- Inter-module interfaces / Contracts
├── Models/            <-- Eloquent Models
├── Policies/          <-- Authorization Policies
├── Providers/         <-- Submodule Service Provider
├── Services/          <-- Business Logic Services
├── Support/           <-- Submodule Helpers, Constants, Enums
├── Transactions/      <-- DB Transaction / Action Classes
├── routes.php         <-- Route definitions khusus submodule ini
└── permissions.php    <-- Daftar Permission Spatie khusus submodule ini

[FRONTEND SUBMODULE STRUCTURE]
resources/js/pages/Console/UserManagement/
├── components/        <-- Component khusus submodule ini
├── types/             <-- TypeScript types khusus submodule ini
└── Index.tsx          <-- Halaman utama submodule
```

---

## MVP Scope & Key Features

1. **Wayfinder Removal & Ziggy Migration:**
   - Uninstall `@laravel/vite-plugin-wayfinder` & `laravel/wayfinder`.
   - Install & configure `tightenco/ziggy` untuk typed route helper di Inertia React (`route()`).

2. **CLI Module Generator Tool (`php artisan make:module`):**
   - Command Artisan untuk meng-generate struktur folder lengkap submodule (Backend & Frontend mirror).
   - Meng-generate file skeleton `routes.php` dan `permissions.php`.
   - Auto-register permission submodule ke `Console/AccessControl` dan auto-discover route ke Laravel.

3. **Core Module `Console`:**
   - **`Console/UserManagement`**: CRUD User, assign role, status toggle, dan **User Impersonation Mode** (dengan floating bar Framer Motion).
   - **`Console/AccessControl`**: CRUD Role & Permission (Spatie) dengan **Visual Permission Matrix Grid** interaktif.
   - **`Console/SystemSetting`**: Dashboard konfigurasi sistem, **Module Auto-Registry**, dan **System Health Check Widget**.

4. **Shared UX & Infrastructure:**
   - **Command Palette (`Ctrl + K` / `Cmd + K`)**: Navigasi cepat dan pencarian pintar seluruh modul Console.
   - **Audit Trail via Domain Events**: Subskripsi event otomatis di Shared Kernel saat terjadi aktivitas perubahan role/user/setting.
   - **Framer Motion Micro-animations**: Page transitions, modal slide-over, dropdown, dan feedback visual.
   - **Redis Infrastructure**: Integrasi Caching, Session, dan Queue via Redis.

---

## Key Assumptions to Validate
- [ ] Submodule Route Auto-Discovery dapat memuat file `routes.php` dari tiap-tiap submodule secara otomatis via Shared Service Provider.
- [ ] Permission Auto-Discovery dapat membaca file `permissions.php` dari tiap submodule dan meng-sync-nya ke Spatie Database Permission.
- [ ] Command Artisan `make:module` berfungsi mulus untuk membuat template folder backend & frontend.
- [ ] Redis service berjalan dan terhubung dengan lancar untuk session, cache, dan queue.

---

## Not Doing (and Why)
- **Modul Bisnis Non-Console (misal: E-commerce, Inventory, Billing)** — *Bukan fokus starterkit awal.*
- **Autentikasi Lanjutan 2FA/Passkeys** — *Cukup login/logout/profile standar Fortify.*
- **Library UI Berat (MUI/Antd)** — *Menggunakan Tailwind v4 + Framer Motion custom components.*
