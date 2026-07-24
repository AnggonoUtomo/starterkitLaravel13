# Checklist Frontend: Console / AccessControl

- [x] **Slice 1: Restrukturisasi & Categorization Dokumentasi Submodul**
  - **Penjelasan**: Memisahkan folder dokumentasi submodul ke dalam subfolder `frontend/` dan `backend/`, serta memperbarui aturan ke-3 di `AGENTS.md`.
  - **Berkas Terkait**:
    - `[NEW]` [spec.md](file:///c:/laragon/www/laravel13/docs/project/Console/AccessControl/frontend/spec.md) - Spesifikasi adaptasi visual & komponen lokal
    - `[NEW]` [plan.md](file:///c:/laragon/www/laravel13/docs/project/Console/AccessControl/frontend/plan.md) - Rencana pengerjaan bertahap (slicing)
    - `[NEW]` [todo.md](file:///c:/laragon/www/laravel13/docs/project/Console/AccessControl/frontend/todo.md) - Checklist tugas frontend
    - `[MODIFY]` [AGENTS.md](file:///c:/laragon/www/laravel13/AGENTS.md) - Aturan kategorisasi dokumentasi persisten

- [x] **Slice 2: Pembuatan Komponen `AccessControlShortcutPanel.tsx` & `RoleControlCard.tsx`**
  - **Penjelasan**: Membuat panel informasi pintasan papan ketik dan kartu kontrol pilihan role aktif dengan indikator role proteksi `Super System` serta metrik statistik.
  - **Berkas Terkait**:
    - `[REFERENCE]` `ContohFrontEnd/access-control/access-control-components/access-control-shortcut-panel.tsx`
    - `[REFERENCE]` `ContohFrontEnd/access-control/access-control-components/role-control-card.tsx`
    - `[NEW]` [AccessControlShortcutPanel.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/AccessControl/components/AccessControlShortcutPanel.tsx) - Panel lipat panduan keyboard shortcuts
    - `[NEW]` [RoleControlCard.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/AccessControl/components/RoleControlCard.tsx) - Kartu kontrol pilihan role & progress bar

- [x] **Slice 3: Pembuatan Komponen `PermissionModulePanel.tsx` & `RolePermissionWorkspace.tsx`**
  - **Penjelasan**: Membuat workspace matriks izin per submodul dengan fitur pencarian kata kunci real-time dan penyusun tata letak *Split View* berdampingan.
  - **Berkas Terkait**:
    - `[REFERENCE]` `ContohFrontEnd/access-control/access-control-components/permission-module-panel.tsx`
    - `[REFERENCE]` `ContohFrontEnd/access-control/access-control-components/role-permission-workspace.tsx`
    - `[NEW]` [PermissionModulePanel.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/AccessControl/components/PermissionModulePanel.tsx) - Matriks izin submodul + permission search filter
    - `[NEW]` [RolePermissionWorkspace.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/AccessControl/components/RolePermissionWorkspace.tsx) - Penyusun layout split workspace

- [x] **Slice 4: Refactoring `Index.tsx` & Verifikasi Linting / Build**
  - **Penjelasan**: Menggabungkan seluruh komponen ke dalam `Index.tsx`, memasang *event listener keyboard shortcuts*, memperbaiki sinkronisasi state React 19, serta memastikan 0 lint error dan build Vite sukses.
  - **Berkas Terkait**:
    - `[MODIFY]` [Index.tsx](file:///c:/laragon/www/laravel13/resources/js/pages/Console/AccessControl/Index.tsx) - Halaman utama penataan komponen lokal (~170 baris)
    - `[MODIFY]` [.gitignore](file:///c:/laragon/www/laravel13/.gitignore) - Mengabaikan pelacakan git folder `ContohFrontEnd/`
