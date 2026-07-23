# Spesifikasi Submodul: Console/SystemSetting

## Tujuan
Menampilkan indikator kesehatan sistem (Database, Redis, PHP, Laravel, Queue) serta status registrasi modul yang terdeteksi otomatis.

## Teknologi & Dependensi
- Backend: `SystemSettingController`, `SystemHealthService`
- Integrasi: PDO Database ping, Redis ping, `ModuleServiceProvider`
- Halaman Frontend: `resources/js/pages/Console/SystemSetting/Index.tsx`

## Kriteria Keberhasilan
- [x] Menampilkan kartu indikator kesehatan untuk Database, Redis, versi PHP, dan driver Queue.
- [x] Menangani kondisi jika Redis atau DB terputus tanpa menyebabkan error fatal aplikasi.
- [x] Menampilkan daftar modul DDD-Lite yang terdeteksi beserta jumlah izinnya.

## Langkah Verifikasi
- Pengujian Fitur Pest: `php artisan test --filter=ModuleSystemTest`
