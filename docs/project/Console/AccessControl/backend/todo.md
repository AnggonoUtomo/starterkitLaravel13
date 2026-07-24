# Checklist Backend: Console / AccessControl

- [x] **Auto-discovery Permissions Submodul Spatie**
  - **Penjelasan**: Pendaftaran izin otomatis yang bersumber dari `ModuleServiceProvider` ke tabel `permissions` Spatie RBAC.
  - **Berkas Terkait**:
    - `[MODIFY]` [RoleController.php](file:///c:/laragon/www/laravel13/app/Modules/Console/AccessControl/Http/Controllers/RoleController.php) - Controller penangan API & halaman Spatie RBAC
    - `[MODIFY]` [RoleService.php](file:///c:/laragon/www/laravel13/app/Modules/Console/AccessControl/Services/RoleService.php) - Service logika bisnis pendaftaran & manipulasi role

- [x] **Proteksi Otorisasi Role `Super System`**
  - **Penjelasan**: Penjagaan eksplisit pada Controller agar role `Super System` dilarang dihapus atau diubah matriks izin inti-nya.
  - **Berkas Terkait**:
    - `[MODIFY]` [RoleController.php](file:///c:/laragon/www/laravel13/app/Modules/Console/AccessControl/Http/Controllers/RoleController.php) - Otorisasi guard proteksi role `Super System`

- [x] **Feature Testing Skenario Otorisasi RBAC**
  - **Penjelasan**: Memastikan seluruh skenario hak akses role dan sinkronisasi izin lulus 100% menggunakan Pest PHP.
  - **Berkas Terkait**:
    - `[MODIFY]` [ModuleSystemTest.php](file:///c:/laragon/www/laravel13/tests/Feature/ModuleSystemTest.php) - Pest test suite otorisasi submodul
