# Rencana Pengembangan Frontend: Console / UserManagement

## Pendekatan Implementation Slicing

Pengembangan adaptasi tata letak visual submodul `UserManagement` ini akan dieksekusi secara bertahap (*Incremental Slicing*):

### Slice 1: Dokumentasi Frontend & Backend di `docs/` (Selesai)
- [x] Membuat dokumen backend di `docs/project/Console/UserManagement/backend/`.
- [x] Membuat dokumen spesifikasi frontend di `docs/project/Console/UserManagement/frontend/spec.md`.
- [x] Membuat rencana kerja `plan.md` dan checklist `todo.md`.

### Slice 2: Komponen Metrik & Shortcut Bar (Akan Dikerjakan)
- [ ] Membangun `UserSummaryCards.tsx` (3 kartu statistik metrik pengguna).
- [ ] Membangun `UserShortcutPanel.tsx` (Panel lipat panduan keyboard shortcuts).

### Slice 3: Komponen Split Workspace Table & Detail Workspace (Akan Dikerjakan)
- [ ] Membangun `UserTable.tsx` (Tabel pengguna dengan pencarian & filter role).
- [ ] Membangun `UserWorkspaceCard.tsx` (Panel kartu detail/form tambah/edit pengguna di sisi kanan).
- [ ] Membangun `DeleteUserModal.tsx` & `ImpersonateUserModal.tsx`.

### Slice 4: Refactoring `Index.tsx` & Verifikasi Linting / Build (Akan Dikerjakan)
- [ ] Memperbarui `resources/js/pages/Console/UserManagement/Index.tsx` untuk menyusun seluruh komponen lokal secara bersih.
- [ ] Pemasangan *event listener keyboard shortcuts*.
- [ ] Verifikasi ESLint check & kompilasi Vite.
