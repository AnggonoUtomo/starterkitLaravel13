# Checklist Peluncuran & Rilis Produksi

## 1. Uji Kualitas Sebelum Rilis
- [x] Seluruh unit test dan feature test Pest PHP lolos 100% (`php artisan test`).
- [x] Format kode PHP sudah rapi sesuai aturan Pint (`vendor/bin/pint --test`).
- [x] Kode JavaScript & TypeScript lolos pengecekan ESLint & Prettier (`npm run lint` & `npm run format`).
- [x] Pipeline CI/CD GitHub Actions terkonfigurasi dan lolos di branch `main`.

## 2. Keamanan Infrastruktur & Lingkungan
- [ ] Application Key tergenerasi (`php artisan key:generate`).
- [ ] Secret lingkungan produksi dikonfigurasi di server (tidak pernah di-commit ke Git).
- [ ] `APP_DEBUG` disetel ke `false` di lingkungan produksi `.env`.
- [ ] Redis dikonfigurasi untuk Cache (`CACHE_STORE=redis`), Sesi (`SESSION_DRIVER=redis`), dan Antrean (`QUEUE_CONNECTION=redis`).
- [ ] Koneksi SSL / HTTPS aktif dan dipaksa.

## 3. Database & Migrasi
- [ ] Backup database produksi dilakukan sebelum menjalankan migrasi.
- [ ] Migrasi database dijalankan dalam mode non-interaktif (`php artisan migrate --force`).
- [ ] Matrix izin Spatie ter-sync otomatis via `ModuleServiceProvider`.

## 4. Observabilitas & Pemantauan
- [ ] Endpoint pengecekan kesehatan server terverifikasi via `ObservabilityService::getMetrics()`.
- [ ] Log aktivitas dan error terkonfigurasi dengan baik.
- [ ] Proses antrean (*queue worker*) dipantau menggunakan Supervisor atau Laravel Horizon.

## 5. Prosedur Rollback (Pembatalan)
- [ ] Jika terjadi masalah kritis, lakukan pembatalan (*rollback*) ke tag rilis sebelumnya.
- [ ] Bersihkan cache aplikasi: `php artisan cache:clear && php artisan config:clear`.
