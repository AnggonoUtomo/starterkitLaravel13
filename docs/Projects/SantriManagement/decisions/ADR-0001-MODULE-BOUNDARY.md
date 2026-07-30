# ADR-0001: Module Boundary - SantriManagement

## Status

Accepted

## Context

Modul `SantriManagement` dibutuhkan sebagai fondasi data utama (Master Data Santri & Wali) pada Aplikasi Pesantren Enterprise On-Premise.

## Decision

- Module owner: `App\Modules\Pesantren\SantriManagement`
- Public contracts: `SantriManagementModuleContract`
- Events: `SantriCreated`, `SantriUpdated`
- Permission identity: `pesantren.santri.*`
- Data ownership: Tabel `pesantren_santri`
- Dependencies: Shared Kernel (`AbstractDomainEvent`, `BaseDTO`)

## Consequences

### Positive

- Isolasi data santri dari modul keuangan & akademik.
- Reusable contract `SantriManagementModuleContract` untuk modul lain.

### Negative

- Memerlukan sinkronisasi event saat ada pembaruan status santri.

## Verification

- `vendor/bin/phpstan analyse` PASS Level 7.
- Pest Test Suite PASS.
