# ADR-003: Pencopotan Wayfinder dan Migrasi ke Ziggy

## Status
Diterima (Accepted)

## Tanggal
2026-07-23

## Konteks & Masalah
Proyek awalnya menyertakan `@laravel/vite-plugin-wayfinder` dan `laravel/wayfinder`. Namun Wayfinder memaksakan pola pembuat kode tertentu yang bentrok dengan mekanisme auto-discovery rute submodul DDD-Lite custom yang kita bangun.

## Keputusan
1. Mencopot `laravel/wayfinder` dari Composer dan `@laravel/vite-plugin-wayfinder` dari NPM.
2. Mengadopsi `tightenco/ziggy` dan `ziggy-js` sebagai engine helper rute client-side pada halaman Inertia React (`route()`).
3. Mengonfigurasi alias Vite untuk mendukung impor kode yang bersih dari `@Modules`.

## Alternatif yang Dipertimbangkan
- **Mempertahankan Wayfinder bersama Ziggy:** Ditolak karena duplikasi pendaftaran rute dan potensi konflik kompilasi TypeScript.

## Konsekuensi
- Sintaks helper rute yang familiar dan bersih di React: `route('console.user-management.index')`.
- Kompatibilitas sempurna dengan rute submodul yang didaftarkan secara dinamis.
