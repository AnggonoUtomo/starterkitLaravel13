# ADR-002: Otorisasi Spatie RBAC dan Integrasi Infrastruktur Redis

## Status
Diterima (Accepted)

## Tanggal
2026-07-23

## Konteks & Masalah
Aplikasi membutuhkan sistem kontrol hak akses kelas enterprise (Role dan Permission) serta infrastruktur berkecepatan tinggi untuk pengelolaan sesi, cache, dan antrean background.

## Keputusan
1. **Otorisasi Hak Akses:** Menggunakan `spatie/laravel-permission` untuk Role-Based Access Control (RBAC).
2. **Pendaftaran Izin:** Izin diklarifikasikan per submodul pada file `permissions.php` dan ter-sync otomatis ke database.
3. **Integrasi Redis:** Menggunakan Redis (`predis/predis`) untuk:
   - `CACHE_STORE=redis`: Kecepatan tinggi untuk pencache-an role & permission Spatie serta pendaftaran modul.
   - `SESSION_DRIVER=redis`: Penyimpanan sesi pengguna yang efisien dan cepat.
   - `QUEUE_CONNECTION=redis`: Pemrosesan asinkron untuk domain event dan log audit.

## Alternatif yang Dipertimbangkan
- **Sistem Role Database Custom:** Ditolak karena Spatie Permission sudah teruji, memiliki dukungan luas, dan mendukung pencache-an role secara bawaan.
- **File/Array Cache:** Ditolak karena keterbatasan performa saat diakses banyak pengguna secara bersamaan.

## Konsekuensi
- Pengecekan hak akses sangat cepat karena di-cache dalam Redis.
- Integrasi yang mudah dengan prop Inertia React via middleware `HandleInertiaRequests`.
