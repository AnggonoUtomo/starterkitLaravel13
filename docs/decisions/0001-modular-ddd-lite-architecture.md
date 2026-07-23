# ADR-001: Arsitektur Modular DDD-Lite dan Auto-Discovery ServiceProvider

## Status
Diterima (Accepted)

## Tanggal
2026-07-23

## Konteks & Masalah
Seiring berkembangnya aplikasi Laravel, menempatkan seluruh Controller, Service, dan Model secara seragam di dalam folder `app/Http/Controllers` dan `app/Models` dapat menyebabkan keterikatan kode yang rumit. Kita membutuhkan struktur yang dapat dikembangkan dengan mudah di mana setiap fitur diisolasi ke dalam Modul dan Submodul independen, beserta struktur halaman React frontend yang sejajar.

## Keputusan
Menerapkan arsitektur direktori **Modular DDD-Lite (Domain-Driven Design Lite)**:
1. Setiap Modul berlokasi di `app/Modules/{Module}/{Submodule}/`.
2. Setiap submodul bersifat mandiri (*self-contained*) dengan folder: `Database/`, `DTO/`, `Http/`, `Integration/`, `Models/`, `Policies/`, `Providers/`, `Services/`, `Support/`, `Transactions/`, `routes.php`, dan `permissions.php`.
3. Auto-Discovery: `App\Shared\Providers\ModuleServiceProvider` memindai dan mendaftarkan `routes.php` serta `permissions.php` dari seluruh submodul secara otomatis.
4. Penyelarasan Frontend: Halaman React disimpan di `resources/js/pages/{Module}/{Submodule}/`.
5. Otomatisasi CLI: Perintah `php artisan make:module` membuat struktur backend, frontend, dan dokumentasi submodul secara otomatis.

## Alternatif yang Dipertimbangkan
- **Package nwidart/laravel-modules:** Ditolak karena terlalu berat dan menambah dependensi external yang tidak diperlukan.
- **Struktur Standar Laravel Flat:** Ditolak karena kurang isolasi antar batas domain fitur.

## Konsekuensi
- Pemisahan tanggung jawab kode (*separation of concerns*) yang sangat bersih pada setiap submodul.
- Penambahan fitur baru sangat cepat — cukup jalankan `php artisan make:module`.
- Perubahan kode pada satu submodul tidak mengganggu submodul domain lainnya.
