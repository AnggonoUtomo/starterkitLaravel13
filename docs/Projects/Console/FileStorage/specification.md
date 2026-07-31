# Submodule: Console / FileStorage

## Context

| Item | Value |
|---|---|
| Slug | `console.file-storage` |
| Route Prefix | `/console/file-storage` |
| Status | 🔲 Planned |

## Intake Summary

- Existing code: Migration `create_media_table` ada di `SystemSetting` module
- Requested: Manajemen file & media storage — upload, browse, delete, disk usage monitoring
- Dependencies: Laravel Filesystem, `spatie/laravel-medialibrary` (rekomendasi) atau custom

## Scope

### In Scope

- File browser (list, search, filter by type/disk)
- Upload file (drag & drop, multi-file)
- Delete file
- Disk usage monitoring (total, used, free per disk)
- Konfigurasi disk storage (local, s3, dsb.)

### Out of Scope

- Image editor/cropper
- Video transcoding
- CDN management

## Module Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| FS-001 | Admin dapat melihat daftar file per disk | Must | File browser tampil |
| FS-002 | Admin dapat upload file (drag & drop) | Must | File tersimpan |
| FS-003 | Admin dapat menghapus file | Must | File terhapus |
| FS-004 | Menampilkan disk usage per storage disk | Should | Metrik usage tampil |

## Module Boundary

- Owner: Saka
- Public contract: `FileStorageModuleContract`
- Events: `FileUploaded`, `FileDeleted`
- Permissions: `files.view`, `files.upload`, `files.delete`
- Data ownership: `media` table (existing), filesystem disks
- Dependencies: Laravel Filesystem, `spatie/laravel-medialibrary` (TBD)

## Open Decisions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| FS-OD-001 | Gunakan `spatie/laravel-medialibrary` atau custom? | Development speed | Saka | Open |
| FS-OD-002 | Apakah media table di SystemSetting perlu dipindahkan ke FileStorage? | Migration ownership | Saka | Open |
