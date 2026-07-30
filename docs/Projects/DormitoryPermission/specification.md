# Dormitory & Permission Module Specification

## Scope

### In Scope
- Operasional domain DormitoryPermission.
- ULID primary key & event domain.

### Out of Scope
- Integrasi pihak ketiga eksternal.

## Module Boundary

- Owner: App\Modules\Pesantren\DormitoryPermission
- Public contract: DormitoryPermissionModuleContract
- Permissions: pesantren.dormitory.*
- Data ownership: Tabel pesantren_dormitory_permissions
