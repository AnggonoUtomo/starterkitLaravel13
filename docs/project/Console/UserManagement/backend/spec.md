# Spesifikasi Backend: Console / UserManagement (Adaptasi Logika Referensi)

## 1. Ringkasan
Spesifikasi backend untuk pengelolaan pengguna, registrasi akun baru, pembaruan profil/role, Impersonation (*penyamaran pengguna*), filter role/pencarian kata kunci, serta penyediaan payload terstruktur untuk kebutuhan frontend workspace UI.

## 2. Arsitektur & Logika Bisnis (Adaptasi `ContohBackEnd`)
- **Controller:** `app/Modules/Console/UserManagement/Http/Controllers/UserController.php`
- **Services:** `app/Modules/Console/UserManagement/Services/UserService.php`
- **Data Transfer Object:** `app/Modules/Console/UserManagement/DTO/UserDTO.php`
- **Fitur & Logika Bisnis:**
  - **Pencarian & Filter Role:** Filter nama/email serta filter role pengguna (`$query->role($role)`).
  - **Payload DTO Terstruktur:** Menyediakan atribut `initials`, `primaryRole`, `roles`, `created_at`, dan flag otorisasi `can` (`update`, `delete`, `impersonate`).
  - **Penyamaran Sesi (Impersonation):** Layanan `impersonate` dan `stopImpersonating` yang aman dengan proteksi penyamaran ke diri sendiri.
  - **Proteksi Pengguna Inti:** Mencegah penghapusan akun mandiri (*self deletion*).

## 3. Kriteria Keberhasilan
- [x] CRUD Pengguna (Create, Read, Update, Delete) berfungsi normal.
- [x] Endpoint `index` menyediakan query params `search`, `role`, dan payload otorisasi `can`.
- [x] Sesi Impersonation berjalan aman dengan pemulihan akun Admin.
- [x] Seluruh pengujian fitur Pest (`UserManagementTest`) lulus 100%.
