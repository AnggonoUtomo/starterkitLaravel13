# Checklist Frontend: Console / UserManagement

- [x] **Slice 1: Restrukturisasi Dokumentasi Frontend & Backend di `docs/`**
  - **Penjelasan**: Membuat folder dokumentasi terpisah untuk frontend dan backend di `docs/project/Console/UserManagement/`.
  - **Berkas Terkait**:
    - `[NEW]` [spec.md](file:///c:/laragon/www/laravel13/docs/project/Console/UserManagement/frontend/spec.md) - Spesifikasi adaptasi visual & komponen lokal
    - `[NEW]` [plan.md](file:///c:/laragon/www/laravel13/docs/project/Console/UserManagement/frontend/plan.md) - Rencana pengerjaan bertahap (slicing)
    - `[NEW]` [todo.md](file:///c:/laragon/www/laravel13/docs/project/Console/UserManagement/frontend/todo.md) - Checklist tugas frontend

- [x] **Slice 2: Pembuatan Komponen `UserSummaryCards.tsx` & `UserShortcutPanel.tsx`**
  - **Penjelasan**: Membangun kartu statistik metrik pengguna dan panel lipat panduan keyboard shortcuts.
  - **Berkas Terkait**:
    - `[REFERENCE]` `ContohFrontEnd/users/user-components/user-summary-cards.tsx`
    - `[REFERENCE]` `ContohFrontEnd/users/user-components/user-shortcut-panel.tsx`
    - `[NEW]` [UserSummaryCards.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/UserManagement/components/UserSummaryCards.tsx) - Kartu statistik metrik pengguna
    - `[NEW]` [UserShortcutPanel.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/UserManagement/components/UserShortcutPanel.tsx) - Panel lipat panduan keyboard shortcuts

- [x] **Slice 3: Pembuatan Komponen `UserTable.tsx`, `UserWorkspaceCard.tsx` & Modals**
  - **Penjelasan**: Membangun tabel pengguna interaktif dengan live search & filter role, panel workspace detail/create/edit di sisi kanan, serta modal konfirmasi.
  - **Berkas Terkait**:
    - `[REFERENCE]` `ContohFrontEnd/users/user-components/user-table.tsx`
    - `[REFERENCE]` `ContohFrontEnd/users/user-components/user-workspace-card.tsx`
    - `[NEW]` [UserTable.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/UserManagement/components/UserTable.tsx) - Tabel data pengguna & filter role
    - `[NEW]` [UserWorkspaceCard.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/UserManagement/components/UserWorkspaceCard.tsx) - Panel kartu workspace (detail, create, edit)
    - `[NEW]` [DeleteUserModal.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/UserManagement/components/DeleteUserModal.tsx) - Modal konfirmasi hapus pengguna
    - `[NEW]` [ImpersonateUserModal.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/UserManagement/components/ImpersonateUserModal.tsx) - Modal konfirmasi penyamaran akun

- [x] **Slice 4: Refactoring `Index.tsx` & Verifikasi Linting / Build**
  - **Penjelasan**: Menggabungkan seluruh komponen ke `Index.tsx`, memasang listener keyboard shortcuts (`Ctrl+Shift+A`, `/`, `Alt+R`, `Delete`, `Esc`), serta memastikan 0 lint error.
  - **Berkas Terkait**:
    - `[MODIFY]` [Index.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/UserManagement/Index.tsx) - Halaman utama penataan komponen lokal
