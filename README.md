# Starter Kit Laravel 13 + Inertia.js v3 (React 19) + Modular DDD-Lite

Aplikasi starter kit modern, enterprise-ready, dan modular yang dibangun menggunakan ekosistem terbaru **Laravel 13**, **Inertia.js v3**, **React 19**, **Tailwind CSS v4**, serta **Spatie RBAC** dan **Laravel Fortify** (Support 2FA & Passkeys / WebAuthn).

---

## 🚀 Fitur Utama & Keunggulan

- **Arsitektur Modular DDD-Lite**: Pemisahan submodul domain yang terenkapsulasi di `app/Modules/{Module}/{Submodule}/` dan `resources/js/pages/{Module}/{Submodule}/`.
- **Generator Modul CLI (`php artisan make:module`)**: Otomasi pembuatan struktur lengkap backend, frontend React, dan dokumentasi submodul.
- **Sistem Otorisasi Multi-Peran (Spatie RBAC)**: Pengelolaan Peran (*Roles*) dan Izin (*Permissions*) dengan *Permission Matrix Table* interaktif dan penanganan otomatis *Super System Role*.
- **Autentikasi & Keamanan Lengkap (Laravel Fortify & Passkeys)**: Login, Register, Reset Password, 2FA (TOTP/QR Code/Recovery Codes), Passkeys (WebAuthn), dan Manajemen Impersonasi User.
- **Quality Gate Pipeline Terintegrasi**: Pengujian otomatis 6 lapis via `composer ci:check` (Pest 4, PHPStan Level 6, Laravel Pint, ESLint 9, Prettier 3, dan TypeScript Strict Check).

---

## 🛠️ Stack Teknologi & Dependensi Utama

### Backend (PHP 8.4 / Laravel 13)
- **Framework Core**: `laravel/framework` (^13.17)
- **PHP Version**: `php` (^8.4)
- **SPA Bridge**: `inertiajs/inertia-laravel` (^3.0)
- **Autentikasi & Keamanan**: `laravel/fortify` (^1.37), `@laravel/passkeys` (^0.2)
- **Role-Based Access Control (RBAC)**: `spatie/laravel-permission` (^8.3)
- **Routing Integration**: `tightenco/ziggy` (^2.6)
- **Caching & Session**: `predis/predis` (^3.5)
- **Development Tools**: `laravel/boost` (^2.2), `laravel/tinker` (^3.0), `laravel/pail` (^1.2)

### Frontend (React 19 / TypeScript 5)
- **UI Engine**: `react` (^19.2), `react-dom` (^19.2)
- **Client SPA Framework**: `@inertiajs/react` (^3.0), `@inertiajs/vite` (^3.0)
- **CSS Framework**: `tailwindcss` (^4.0), `@tailwindcss/vite` (^4.1)
- **UI Component Primitives**: `@radix-ui/react-*` (Avatar, Checkbox, Dialog, Dropdown, Select, Tooltip, dll.)
- **Animasi & Interaktivitas**: `framer-motion` (^12.42), `lucide-react` (^0.475), `sonner` (^2.0)
- **Bundler & Build Tool**: `vite` (^8.0), `laravel-vite-plugin` (^3.0)

### Testing & Quality Assurance
- **Automated Testing Suite**: `pestphp/pest` (^4.7), `pestphp/pest-plugin-laravel` (^4.1)
- **PHP Static Analysis**: `larastan/larastan` (^3.9 - Level 6)
- **PHP Code Formatter**: `laravel/pint` (^1.27)
- **JavaScript/TypeScript Linter**: `eslint` (^9.19)
- **Code Formatter**: `prettier` (^3.4)

---

## 🏛️ Pola Arsitektur Backend & Frontend

### 1. Backend Layered Architecture (`app/Modules/{Module}/{Submodule}/`)
 SETIAP submodul domain mengadopsi pola berlapis berikut:

```
app/Modules/{Module}/{Submodule}/
├── DTO/              # Data Transfer Objects imutabel (Data/Payload DTOs)
├── Database/         # Migrations, Factories, dan Seeders khusus submodul
├── Http/
│   ├── Controllers/  # Controller ringkas yang mengonsumsi Service & Policy
│   ├── Requests/     # Validasi Form Request yang menyediakan method toDto()
│   └── Resources/    # Eloquent API Resources
├── Models/           # Model Eloquent domain submodul
├── Policies/         # Laravel Authorization Policies (Proteksi Peran System)
├── Services/         # Logika Bisnis Utama, Cache Invalidation, & Audit Logging
├── Transactions/     # Transaction Wrappers (DB::transaction) untuk eksekusi atomik
├── module.php        # Manifest Metadata Submodul (nama, label, deskripsi)
├── navigation.php    # Konfigurasi Navigasi Sidebar
├── permissions.php   # Definisi Daftar Izin RBAC Spatie
└── routes.php        # Routing Rute Ternama Spesifik Submodul
```

### 2. Frontend Submodule Modularization (`resources/js/pages/{Module}/{Submodule}/`)
- **`Index.tsx`**: Halaman utama yang mengelola state lokal dan memanggil komponen submodul.
- **`components/`**: Komponen UI khusus submodul (seperti Header, Metric Cards, Table, Modals).
- **`types.ts`**: Terenkapsulasi untuk definisi tipe TypeScript khusus submodul (`Role`, `Permission`, dll.).

---

## 💻 Panduan Generator Modul CLI

Untuk membuat modul dan submodul baru secara otomatis, jalankan perintah Artisan berikut:

```bash
php artisan make:module {Module}/{Submodule}
```

### Contoh:
```bash
php artisan make:module Catalog/Product
php artisan make:module Finance/Billing
```

Command ini akan otomatis membuat:
1. Struktur backend lengkap di `app/Modules/{Module}/{Submodule}/`
2. Halaman & komponen React di `resources/js/pages/{Module}/{Submodule}/`
3. Dokumentasi terpisah di `docs/project/{Module}/{Submodule}/backend/` dan `frontend/`

---

## 📑 Struktur Dokumentasi Terpusat (`docs/`)

Semua dokumentasi proyek dikelola secara terpusat di folder `docs/` dengan kategori khusus:
- **`docs/spec.md`**: Spesifikasi utama proyek.
- **`docs/module-generator-guide.md`**: Panduan pengunaan CLI Module Generator.
- **`docs/project/{Module}/{Submodule}/backend/`**: `spec.md`, `plan.md`, `todo.md` (Domain backend).
- **`docs/project/{Module}/{Submodule}/frontend/`**: `spec.md`, `plan.md`, `todo.md` (Domain UI frontend).

---

## ⚙️ Cara Install & Memulai Pengembangan (Local Setup)

### 1. Prasyarat System
- **PHP**: >= 8.4 dengan ekstensi SQLite / MySQL, PDO, OpenSSL, Mbstring.
- **Node.js**: >= 20.x
- **Composer**: >= 2.x

### 2. Langkah Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/AnggonoUtomo/starterkitLaravel13.git
cd starterkitLaravel13

# 2. Install dependensi PHP & Node
composer install
npm install

# 3. Salin file lingkungan & generate App Key
cp .env.example .env
php artisan key:generate

# 4. Migrasi & Seed Database
php artisan migrate --seed

# 5. Jalankan server pengembangan (Concurrent Server, Queue, & Vite)
composer run dev
```

Aplikasi dapat diakses melalui browser di `http://localhost:8000`.

---

## 🧪 Pengujian & Verifikasi Kualitas Kode (`Quality Gate`)

Sebelum melakukan commit atau rilis kode, jalankan skrip verifikasi otomatis berikut:

```bash
# Jalankan seluruh 6 lapis pemeriksaan kualitas CI/CD
composer ci:check
```

Skrip ini akan mengeksekusi secara otomatis:
1. `npm run lint:check` (ESLint 9)
2. `npm run format:check` (Prettier 3)
3. `phpstan analyse` (PHPStan / Larastan Level 6)
4. `vendor/bin/pint --test` (Laravel Pint PHP Code Style)
5. `php artisan test` (Pest PHP Automated Unit & Feature Tests)

---

## ❓ FAQ & Troubleshooting Umum

### Q: Mengapa muncul error `Inertia view [console/access-control/index] not found` saat membuka controller di `ContohBackEnd`?
**Jawab**: Folder `ContohBackEnd/` dan `ContohFrontEnd/` adalah folder **kode contoh/referensi** arsitektur, bukan lokasi halaman aktif aplikasi. Pada aplikasi aktif, controller berada di `app/Modules/Console/AccessControl/Http/Controllers/AccessControlController.php` yang memanggil view `'Console/AccessControl/Index'` (berkesesuaian dengan nama file `resources/js/pages/Console/AccessControl/Index.tsx`).

---

## 📄 Lisensi

Starter kit ini dirilis di bawah [Lisensi MIT](LICENSE).
