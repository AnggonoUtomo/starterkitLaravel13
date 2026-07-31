# Specification: Submodule Console / UserManagement

## 1. Objective & Business Value

Submodule **UserManagement** mengelola siklus hidup akun pengguna (*user lifecycle*), otorisasi berbasis Spatie RBAC, fitur impersonation (*penyamaran akun*), dan penyelarasan guard otorisasi `web`.

## 2. Guard Alignment & Spatie Permission Integration

- **Entity Model (`User.php`)**: Memasang `protected string $guard_name = 'web';` secara eksplisit pada `User` entity untuk memastikan evaluasi permission Spatie terikat pada guard `web`.
- **Database Seeder (`DatabaseSeeder.php`)**: Memastikan Role `User` dibekali izin dasar secara default saat seeding database.

## 3. Method-Level Action Authorization & Frontend UI Button Visibility

Seluruh metode pada `UserController.php` dan komponen UI `UserManagement` wajib mematuhi izin granular Spatie RBAC dari `usePage().props.auth.permissions`:

| Action / Method | Route | Permission Required | Backend Behavior | Frontend UI Behavior |
|---|---|---|---|---|
| `index()` | `GET /console/users` | `users.view` | HTTP 403 jika tidak berizin | Halaman hanya terbuka jika pengguna memiliki izin `users.view` |
| `store()` | `POST /console/users` | `users.create` | HTTP 403 jika tidak berizin | Tombol "Tambah Pengguna Baru" disembunyikan dari UI jika tidak berizin |
| `update()` | `PUT /console/users/{user}` | `users.edit` | HTTP 403 jika tidak berizin | Tombol "Edit User" disembunyikan dari UI jika tidak berizin |
| `destroy()` | `DELETE /console/users/{user}` | `users.delete` | HTTP 403 jika tidak berizin | Tombol "Hapus User" disembunyikan dari UI jika tidak berizin |
| `impersonate()` | `POST /console/users/{user}/impersonate` | `users.impersonate` | HTTP 403 jika tidak berizin | Tombol "Impersonasi" disembunyikan dari UI jika tidak berizin |

## 4. Acceptance Criteria

- [x] Jika `users.create`, `users.edit`, `users.delete`, `users.impersonate` dinonaktifkan pada suatu Role, tombol aksi terkait otomatis tersembunyi dari tabel dan workspace UI frontend.
- [x] Apabila pengguna mencoba mengirimkan request API/Form langsung tanpa izin, `UserController` memblokir dengan HTTP 403.
