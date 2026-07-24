`# Spesifikasi Backend - Submodul SystemSetting

## Ringkasan

Submodul `Console/SystemSetting` mengelola 10 kategori konfigurasi sistem utama dalam arsitektur DDD-Lite.

## Kategori Konfigurasi

1. Email & SMTP (`updateEmail`, `testEmail`)
2. App Name & Branding (`updateBranding`)
3. Timezone & Localization (`updateLocalization`)
4. Default Pagination (`updatePagination`)
5. Security Policy (`updateSecurity`)
6. Password Policy (`updatePasswordPolicy`)
7. Maintenance Mode (`updateMaintenance`)
8. Google Maps Integration (`updateMap`)
9. System Health Status (Read-only status)
10. Environment Info (Read-only info)

## Keamanan & Otorisasi

- Semua rute dilindungi oleh middleware `auth`, `verified`, dan Policy otorisasi `SystemSettingPolicy`.
- Mutasi data dicatat dalam log audit via `AuditLogService`.
