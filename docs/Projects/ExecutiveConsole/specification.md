# Executive Console Module Specification

## Scope

### In Scope
- Operasional domain ExecutiveConsole.
- ULID primary key & event domain.

### Out of Scope
- Integrasi pihak ketiga eksternal.

## Module Boundary

- Owner: App\Modules\Pesantren\ExecutiveConsole
- Public contract: ExecutiveConsoleModuleContract
- Permissions: pesantren.executive.*
- Data ownership: Tabel pesantren_executive_metrics
