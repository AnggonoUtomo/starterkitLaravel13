# Rencana Submodul: Console/AuditLog

## Ringkasan
Mengimplementasikan domain Log Audit untuk mencatat dan menampilkan event keamanan sistem.

## Arsitektur
- `DTO/AuditLogDTO.php`: Objek data DTO untuk record log.
- `Services/AuditLogQueryService.php`: Membaca dan mempaginasi entri log harian.
- `Http/Controllers/AuditLogController.php`: Menangani request index dan rendring Inertia.
- `routes.php`: Mendefinisikan endpoint `console/audit-logs`.
- `permissions.php`: Deklarasi `audit-logs.view` dan `audit-logs.export`.

## Rincian Tugas
- [x] Tugas 1: Membuat `AuditLogDTO.php`
- [x] Tugas 2: Membuat `AuditLogQueryService.php`
- [x] Tugas 3: Membuat `AuditLogController.php`
- [x] Tugas 4: Deklarasi `routes.php` dan `permissions.php`
- [x] Tugas 5: Membuat halaman React `resources/js/pages/Console/AuditLog/Index.tsx` dengan drawer Framer Motion
