# PPDB Online Module Specification

## Scope

### In Scope
- Operasional domain PPDBOnline.
- ULID primary key & event domain.

### Out of Scope
- Integrasi pihak ketiga eksternal.

## Module Boundary

- Owner: App\Modules\Pesantren\PPDBOnline
- Public contract: PPDBOnlineModuleContract
- Permissions: pesantren.ppdb.*
- Data ownership: Tabel pesantren_ppdb_registrations
