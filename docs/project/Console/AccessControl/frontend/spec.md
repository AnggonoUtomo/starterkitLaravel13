# Spesifikasi Frontend: Console / AccessControl (Adaptasi Visual Layout)

## 1. Ringkasan Fitur
Spesifikasi ini mengatur pembaruan tata letak (*layout & visual structure*) halaman `AccessControl` dengan mengadaptasi pola visual dari referensi `ContohFrontEnd/access-control` tanpa mengubah fondasi backend Spatie RBAC dan Inertia React v3 yang sudah berjalan.

## 2. Struktur Tata Letak & Elemen Visual

### 2.1 Header & Shortcut Bar (`AccessControlHeader` & `AccessControlShortcutPanel`)
1. **Header Halaman:** Menampilkan Judul, Deskripsi, Ikon `Shield` (Indigo), dan Tombol Utama *"Create New Role"*.
2. **Shortcut Banner:** Bilah informasi tombol cepat (*keyboard shortcuts*) untuk mempermudah navigasi admin (`Ctrl+Shift+A` Role Baru, `Alt+R` Pilih Role, `Alt+P` Cari Izin).

### 2.2 Workspace Berdampingan (*Split Workspace Layout*)
1. **Panel Kiri - Selector & Control Role (`RoleControlCard` / `RoleListCard`):**
   - Menampilkan daftar kartu (*cards*) untuk setiap role (`Super System`, `Admin`, dsb.).
   - Menampilkan jumlah izin aktif per role, badge proteksi role, dan tombol pilih/hapus.
2. **Panel Kanan - Workspace Izin Submodul (`RolePermissionWorkspace` & `PermissionModulePanel`):**
   - Menampilkan daftar izin yang dikelompokkan per submodul dalam kartu/accordion modern.
   - Bilah pencarian izin cepat (*Permission Search Filter*).
   - Tombol toggle status izin per submodul dengan indikator warna semantik Emerald & Indigo.

### 2.3 Dialog Modal Lokal (`AddRoleModal` & `DeleteRoleModal`)
- Modal tambah role beranimasi *Framer Motion* dengan latar belakang blur semantik.

## 3. Komponen Lokal Submodul (`resources/js/pages/Console/AccessControl/components/`)
- `AccessControlHeader.tsx`
- `AccessControlShortcutPanel.tsx`
- `RoleControlCard.tsx`
- `RolePermissionWorkspace.tsx`
- `PermissionModulePanel.tsx`
- `AddRoleModal.tsx`
- `DeleteRoleModal.tsx`
