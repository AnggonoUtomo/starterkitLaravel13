# Panduan & Aturan Penggunaan Generator Modul CLI

## Ringkasan Perintah

Untuk membuat modul dan submodul baru pada arsitektur Modular DDD-Lite, jalankan perintah Artisan berikut:

```bash
php artisan make:module {Module}/{Submodule}
```

### Contoh Penggunaan:
```bash
php artisan make:module Catalog/Product
php artisan make:module Finance/Billing
php artisan make:module Content/Post
```

---

## Standar & Aturan Penamaan

1. **Format Penamaan (PascalCase):**
   - Nama `{Module}` dan `{Submodule}` WAJIB menggunakan format **PascalCase** tanpa spasi atau karakter khusus.
   - Contoh Benar: `make:module Console/UserManagement`
   - Contoh Salah: `make:module console/user_management` atau `make:module Console/user-management`

2. **Gaya Nama Rute & Izin (Otomatis):**
   - Generator otomatis mengubah nama rute menjadi *kebab-case* (contoh: `catalog/product`).
   - Generator otomatis mengubah prefix izin menjadi *lowercase* (contoh: `product.view`, `product.create`).

---

## Output Struktur Direktori yang Dihasilkan

Setiap kali perintah `make:module` dijalankan, tiga lokasi direktori utama akan dibuat secara otomatis:

### 1. Struktur Backend (`app/Modules/{Module}/{Submodule}/`)
- `Database/` (Migrations, Factories, Seeders)
- `DTO/` (Data Transfer Objects — `final readonly class` atau constructor property promotion)
- `Http/Controllers/` (`{Submodule}Controller.php`)
- `Http/Requests/` (Form Requests dengan method `$request->toDto()`)
- `Http/Resources/` (Eloquent API Resources)
- `Integration/` (Integrasi layanan eksternal)
- `Models/` (Model Eloquent internal submodul)
- `Policies/` (Policy otorisasi submodul)
- `Providers/` (ServiceProvider spesifik submodul)
- `Services/` (Logika bisnis utama + audit logging)
- `Support/` (Helper & Utility)
- `Transactions/` (Database Transaction Wrappers untuk mutasi atomik)
- `routes.php` (Auto-discovered otomatis oleh `ModuleServiceProvider`)
- `permissions.php` (Auto-discovered & ter-sync otomatis ke database Spatie RBAC)
- `module.php` (Manifest nama, label, deskripsi modul)
- `navigation.php` (Item menu navigasi sidebar & urutan)

### 2. Struktur Frontend React (`resources/js/pages/{Module}/{Submodule}/`)
- `Index.tsx` (Halaman utama React Inertia)
- `components/` (Komponen UI khusus submodul)
- `types.ts` (Tipe TypeScript khusus submodul)

### 3. Dokumentasi Terpusat Dikategorikan (`docs/project/{Module}/{Submodule}/`)
- `backend/` (`spec.md`, `plan.md`, `todo.md` — Spesifikasi & checklist domain backend)
- `frontend/` (`spec.md`, `plan.md`, `todo.md` — Spesifikasi & checklist UI frontend)

---

## Pola & Standar Arsitektur Backend (Backend Architecture Pattern)

1. **Layer Form Request & DTO:**
   - Validasi HTTP disentralkan di `Http/Requests/`. Form Request menyediakan method `toDto()` yang mengubah `validated()` input menjadi DTO imutabel (`DTO/`).

2. **Layer Transaksi & Layanan (Services & Transactions):**
   - Operasi mutasi data (Create, Update, Delete, Sync) dibungkus dalam kelas `Transactions/` atau `DB::transaction()` untuk menjamin atomisitas.
   - Layanan (`Services/`) mengontrol alur bisnis, pembersihan cache RBAC (`PermissionRegistrar::forgetCachedPermissions()`), dan pencatatan jejak audit (`AuditLogService`).

3. **Otorisasi & Kebijakan (Policies & Protection):**
   - Seluruh endpoint controller dilindungi oleh Policy Otorisasi Laravel via `HasMiddleware` atau `$this->authorize()`.
   - Proteksi peran khusus (`User::SUPER_SYSTEM_ROLE`) wajib ditegakkan pada Policy, Controller, dan Service.

4. **Payload Respon Rich DTO & Otorisasi UI:**
   - Respon Inertia mengirimkan atribut terstruktur yang kaya untuk UI: `initials`, `primaryRole`, `roles`, `permissions`, `effectivePermissions`, `rolePermissions`, `created_at` (format `d M Y`), dan flag otorisasi `can` (`update`, `delete`, `impersonate`, dll.).

---

## Alur Kerja Setelah Membuat Modul Baru

1. **Lengkapi Dokumentasi Submodul:**
   Buka `docs/project/{Module}/{Submodule}/backend/spec.md` dan `frontend/spec.md` untuk menuliskan kriteria keberhasilan fitur.

2. **Implementasikan Logika Bisnis & DTO:**
   Buat DTO di `DTO/`, Request di `Http/Requests/`, dan tuliskan logika bisnis pada `Services/`.

3. **Buat Pengujian Unit/Fitur:**
   Tambahkan pengujian Pest PHP di `tests/Feature/` untuk memastikan endpoint modul berfungsi 100%.

4. **Format & Verifikasi Kode:**
   Sebelum commit, jalankan format kode PHP:
   ```bash
   vendor/bin/pint --format agent
   composer ci:check
   ```
