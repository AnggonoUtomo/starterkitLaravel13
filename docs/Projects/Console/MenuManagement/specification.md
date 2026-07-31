# Specification: MenuManagement

## Scope

### In Scope

- **CRUD Menu Item**: Membuat, membaca, memperbarui, dan menghapus item menu navigasi.
- **Hierarki Parent-Child**: Menu dapat memiliki sub-menu (nested navigation max 2 level).
- **Ordering / Position**: Penataan urutan tampil menu (*drag & drop* atau input numerik urutan).
- **Icon Selector**: Pemilihan ikon dari set Lucide Icons (`Users`, `Shield`, `Settings`, `FileText`, dll).
- **Route / Target URL Mapping**: Mengaitkan menu dengan rute Ziggy / path URL internal.
- **Permission Binding**: Menghubungkan menu dengan permission Spatie (misal `users.view`, `audit_log.view`). Menu hanya muncul jika user memiliki permission terkait.
- **Status Toggle**: Aktif / Non-aktifkan item menu tanpa menghapus data dari database.

### Out of Scope

- Menu kustomisasi per individual user (menu disesuaikan berbasis Role & Permission).
- External link redirector yang tidak terverifikasi.

## Database Schema Design (`menu_items`)

| Column | Type | Attributes | Description |
|---|---|---|---|
| `id` | `ulid` | Primary Key | Unique Identifier |
| `parent_id` | `ulid` | Nullable, Foreign Key | ID menu induk (Self-referencing) |
| `title` | `string(100)` | Not Null | Label nama menu |
| `url` | `string(255)` | Not Null | Path URL / Route target |
| `icon` | `string(50)` | Nullable | Nama ikon Lucide |
| `permission_name` | `string(100)` | Nullable | Nama Spatie permission yang disyaratkan |
| `order` | `integer` | Default `0` | Urutan tampilan menu |
| `is_active` | `boolean` | Default `true` | Status keaktifan menu |
| `created_at` | `timestamp` | Nullable | Waktu pembuatan |
| `updated_at` | `timestamp` | Nullable | Waktu pembaruan |

## Module Contracts & Service Boundaries

- **`MenuServiceContract`**: Menyediakan method `getVisibleTreeForUser(User $user): array` untuk digunakan oleh `ConsoleLayout.tsx`.
- **`permissions.php`**:
  ```php
  return [
      'menu_management.view',
      'menu_management.create',
      'menu_management.edit',
      'menu_management.delete',
      'menu_management.reorder',
  ];
  ```

## Security & Authorization Rules

- Mengakses modul Menu Management memerlukan permission `menu_management.view`.
- Modifikasi menu memerlukan permission `menu_management.edit` / `menu_management.create` / `menu_management.delete`.
- Sanitasi input `url` dan `title` untuk mencegah XSS & Open Redirect.
