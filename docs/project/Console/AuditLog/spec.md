# Spesifikasi Submodul: Console/AuditLog

## Tujuan
Menyediakan halaman pemantau Log Audit / Aktivitas Sistem bagi Administrator untuk melihat riwayat keamanan (pembuatan user, penugasan role, perubahan izin, dan impersonasi).

## Teknologi & Dependensi
- Backend: `AuditLogController`, `AuditLogService`, `AuditLogDTO`
- Penyimpanan: File log harian / Record database audit
- Kontrak Bersama: `DomainEventContract`
- Halaman Frontend: `resources/js/pages/Console/AuditLog/Index.tsx`

## Kriteria Keberhasilan
- [x] Admin dapat melihat daftar log audit dengan info user, nama event, payload, dan waktu.
- [x] Admin dapat memfilter log berdasarkan nama event atau email pengguna.
- [x] Detail rincian log dapat dibuka via *slide-over drawer* beranimasi Framer Motion.
- [x] Rute submodul `console/audit-logs` terdaftar di bawah prefix nama `console.audit-log.`.
- [x] Izin `audit-logs.view` dan `audit-logs.export` diklarifikasikan pada `permissions.php`.

## Langkah Verifikasi
- Pengujian Fitur Pest: `php artisan test --filter=ModuleSystemTest`
