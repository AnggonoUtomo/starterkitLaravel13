# Checklist Backend: Console / UserManagement

- [x] **Slice 1: Dokumentasi Adaptasi Backend**
  - **Penjelasan**: Membuat dokumen spesifikasi dan rencana adaptasi logika backend dari referensi `ContohBackEnd`.
  - **Berkas Terkait**:
    - `[NEW]` [spec.md](file:///c:/laragon/www/laravel13/docs/project/Console/UserManagement/backend/spec.md) - Spesifikasi adaptasi logika backend
    - `[NEW]` [plan.md](file:///c:/laragon/www/laravel13/docs/project/Console/UserManagement/backend/plan.md) - Rencana pengerjaan backend
    - `[NEW]` [todo.md](file:///c:/laragon/www/laravel13/docs/project/Console/UserManagement/backend/todo.md) - Checklist tugas backend

- [x] **Slice 2: Penyesuaian DTO & Response Transformation (`UserDTO.php`)**
  - **Penjelasan**: Memperbarui DTO pengguna untuk menyertakan `initials`, `primaryRole`, `created_at`, dan flag otorisasi `can`.
  - **Berkas Terkait**:
    - `[REFERENCE]` `ContohBackEnd/UserManagements/Http/Controllers/UserController.php`
    - `[MODIFY]` [UserDTO.php](file:///c:/laragon/www/laravel13/app/Modules/Console/UserManagement/DTO/UserDTO.php) - DTO pengguna dengan initials & authorization flags
    - `[MODIFY]` [UserService.php](file:///c:/laragon/www/laravel13/app/Modules/Console/UserManagement/Services/UserService.php) - Logika pagination & filter role

- [x] **Slice 3: Penyesuaian Controller & Pest Testing**
  - **Penjelasan**: Menyesuaikan UserController index method untuk mendukung filter role dan verifikasi 46 Pest test suite.
  - **Berkas Terkait**:
    - `[MODIFY]` [UserController.php](file:///c:/laragon/www/laravel13/app/Modules/Console/UserManagement/Http/Controllers/UserController.php) - Controller index handler dengan filter role query
    - `[REFERENCE]` [ModuleSystemTest.php](file:///c:/laragon/www/laravel13/tests/Feature/ModuleSystemTest.php) - Feature test suite (46/46 passed)
