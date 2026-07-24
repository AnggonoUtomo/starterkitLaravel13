# Rencana Pengembangan Backend: Console / UserManagement

## Pendekatan Implementation Slicing

### Slice 1: Dokumentasi Backend (Selesai)
- [x] Membuat spesifikasi backend `spec.md`, `plan.md`, dan `todo.md`.

### Slice 2: Penyesuaian DTO & Response Transformation (Akan Dikerjakan)
- [ ] Memperbarui `UserDTO.php` untuk menyertakan `initials`, `primaryRole`, `created_at`, dan flag otorisasi `can`.
- [ ] Menambahkan logika filter `role` pada `UserService::getPaginatedUsers`.

### Slice 3: Penyesuaian Controller & Testing Pest (Akan Dikerjakan)
- [ ] Menyesuaikan `UserController::index` untuk menerima parameter query `role` dan menyalurkannya ke Inertia.
- [ ] Jalankan pengujian Pest untuk memverifikasi 100% lulus.
