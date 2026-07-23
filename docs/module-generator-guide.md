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
- `DTO/` (Data Transfer Objects)
- `Http/Controllers/` (`{Submodule}Controller.php`)
- `Http/Requests/` (Form Requests)
- `Http/Resources/` (Eloquent API Resources)
- `Integration/` (Integrasi layanan eksternal)
- `Models/` (Model Eloquent internal submodul)
- `Policies/` (Policy otorisasi)
- `Providers/` (ServiceProvider spesifik submodul)
- `Services/` (Logika bisnis utama)
- `Support/` (Helper & Utility)
- `Transactions/` (Database Transaction Wrappers)
- `routes.php` (Auto-discovered otomatis oleh `ModuleServiceProvider`)
- `permissions.php` (Auto-discovered & ter-sync otomatis ke database Spatie RBAC)

### 2. Struktur Frontend React (`resources/js/pages/{Module}/{Submodule}/`)
- `Index.tsx` (Halaman utama React Inertia)
- `components/` (Komponen UI khusus submodul)
- `types/` (Tipe TypeScript khusus submodul)

### 3. Dokumentasi Terpusat (`docs/project/{Module}/{Submodule}/`)
- `spec.md` (Spesifikasi & Acceptance Criteria submodul dalam Bahasa Indonesia)
- `plan.md` (Rencana arsitektur & breakdown pelaksanaan tugas)
- `todo.md` (Checklist tugas submodul)

---

## Alur Kerja Setelah Membuat Modul Baru

1. **Lengkapi Dokumentasi Submodul:**
   Buka `docs/project/{Module}/{Submodule}/spec.md` dan tuliskan kriteria keberhasilan fitur.

2. **Implementasikan Logika Bisnis & DTO:**
   Buat DTO di `DTO/` dan tuliskan logika bisnis pada `Services/`.

3. **Buat Pengujian Unit/Fitur:**
   Tambahkan pengujian Pest PHP di `tests/Feature/` untuk memastikan endpoint modul berfungsi 100%.

4. **Format & Verifikasi Kode:**
   Sebelum commit, jalankan format kode PHP:
   ```bash
   vendor/bin/pint --format agent
   php artisan test
   ```
