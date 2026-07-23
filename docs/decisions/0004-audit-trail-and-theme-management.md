# ADR-004: Submodul Audit Trail via Domain Events dan Pengelolaan Tema

## Status
Diterima (Accepted)

## Tanggal
2026-07-23

## Konteks & Masalah
Seiring berkembangnya modul Console Admin, administrator membutuhkan:
1. Inspeksi visual atas aktivitas sistem (pembuatan user, penugasan role, perubahan izin, dan impersonasi).
2. Pengelolaan profil akun dan keamanan yang terintegrasi di dalam `ConsoleLayout`.
3. Pengaturan tema tampilan yang nyaman di Console Admin.

## Keputusan
1. **Submodul Audit Trail (`Console/AuditLog`)**:
   - Membuat submodul `Console/AuditLog` dengan `AuditLogController`, `AuditLogService`, `routes.php`, dan `permissions.php`.
   - Menyimpan log aktivitas domain menggunakan `AuditLogService` yang mendengarkan event sistem.
   - Menyediakan UI tabel log aktivitas dengan fitur pencarian dan *slide-over drawer* JSON payload berbasis Framer Motion.

2. **Integrasi Profil Console (`Console/Profile`)**:
   - Membuat submodul `Console/Profile` yang membungkus pembaruan profil Fortify dan kata sandi langsung di dalam `ConsoleLayout`.

3. **Pengelolaan Tema Tampilan**:
   - Menyiapkan arsitektur tema di Console Layout.

## Alternatif yang Dipertimbangkan
- **Package Spatie Activitylog:** Ditolak untuk menjaga starterkit tetap ringan dan mendemonstrasikan pencatatan event domain native via `AuditLogService`.

## Konsekuensi
- Akses penuh bagi administrator untuk memantau keamanan sistem.
- Pengalaman pengguna yang konsisten di seluruh modul Console Admin.
