# Rencana Pengembangan Frontend: Console / AccessControl

## Pendekatan Implementation Slicing

Pengembangan adaptasi tata letak visual ini akan dieksekusi secara bertahap (*Incremental Slicing*):

### Slice 1: Restrukturisasi Dokumentasi Frontend & Backend (Selesai)
- [x] Memperbarui `AGENTS.md` Rule 3 (Kategorisasi folder `frontend/` dan `backend/`).
- [x] Membuat dokumen backend di `docs/project/Console/AccessControl/backend/`.
- [x] Membuat dokumen spesifikasi frontend di `docs/project/Console/AccessControl/frontend/spec.md`.

### Slice 2: Komponen Panel Informasi & Shortcut Bar (Akan Dikerjakan)
- [ ] Mempelajari dan menyesuaikan komponen `AccessControlShortcutPanel.tsx` lokal.
- [ ] Menambahkan panduan tombol pintas keyboard di bagian atas halaman AccessControl.

### Slice 3: Komponen Split Workspace Role & Permission (Akan Dikerjakan)
- [ ] Membangun `RoleControlCard.tsx` (Panel kartu pilihan role di sisi kiri).
- [ ] Membangun `PermissionModulePanel.tsx` (Panel kelompok izin submodul di sisi kanan).
- [ ] Menyusun `RolePermissionWorkspace.tsx` yang menggabungkan kedua panel.

### Slice 4: Pengujian & Refactoring `Index.tsx` (Akan Dikerjakan)
- [ ] Memperbarui `resources/js/pages/Console/AccessControl/Index.tsx` agar menyusun komponen lokal baru secara bersih.
- [ ] Verifikasi ESLint check dan kompilasi Vite.
