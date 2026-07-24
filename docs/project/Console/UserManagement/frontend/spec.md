# Spesifikasi Frontend: Console / UserManagement (Adaptasi Visual Layout)

## 1. Ringkasan Fitur
Spesifikasi ini mengatur pembaruan tata letak (*layout & visual structure*) halaman `UserManagement` dengan mengadaptasi pola visual dari referensi `ContohFrontEnd/users` tanpa mengubah fondasi backend Inertia React v3 dan Spatie RBAC yang telah ada.

## 2. Elemen Visual & Struktur Komponen

### 2.1 Ringkasan Metrik & Shortcut Bar
1. **`UserSummaryCards.tsx`**: Menampilkan 3 kartu metrik statistik (Total Pengguna, Total Role, Pengguna Aktif).
2. **`UserShortcutPanel.tsx`**: Banner informasi tombol pintas papan ketik (`Ctrl+Shift+A` Tambah Pengguna, `/` Cari, `Alt+R` Filter Role, `Delete` Hapus).

### 2.2 Layout Ruang Kerja Utama (*Grid Split Workspace*)
1. **Kolom Kiri (2-Cols): `UserTable.tsx` / `UserDatatable.tsx`**:
   - Tabel pengguna interaktif dengan pencarian cepat (*live search*), filter role dropdown, tombol aksi (Impersonate, Edit, Delete), dan paginasi.
2. **Kolom Kanan (1-Col): `UserWorkspaceCard.tsx` / `UserDetailCard.tsx`**:
   - Panel kartu serbaguna yang beralih mode antara **Detail Pengguna** (saat baris tabel diklik), **Form Tambah Pengguna**, atau **Form Ubah Pengguna**.

### 2.3 Modal Interaktif
1. **`DeleteUserModal.tsx`**: Modal konfirmasi penghapusan pengguna dengan proteksi akun mandiri (*cannot delete self*).
2. **`ImpersonateUserModal.tsx`**: Modal konfirmasi penyamaran akun pengguna oleh Admin.

## 3. Komponen Lokal Submodul (`resources/js/pages/Console/UserManagement/components/`)
- `UserManagementHeader.tsx`
- `UserSummaryCards.tsx`
- `UserShortcutPanel.tsx`
- `UserTable.tsx`
- `UserWorkspaceCard.tsx`
- `UserDetailCard.tsx`
- `DeleteUserModal.tsx`
- `ImpersonateUserModal.tsx`
