# SantriManagement Module Specification

## Scope

### In Scope

- Master data santri (NIS, Nama, Jenis Kelamin, Status Keaktifan).
- Bio-data wali santri (Nama Wali, Kontak Darurat, Alamat).
- Penempatan kamar asrama dan pengelompokan halaqah.
- ULID primary key dan event domain (`SantriCreated`, `SantriUpdated`, `SantriStatusChanged`).

### Out of Scope

- Transaksi keuangan syahriyah/SPP (dikelola oleh `PesantrenFinance`).
- Pencatatan hafalan Qur'an (dikelola oleh `AcademicTahfizh`).

## Existing Capability Contract

Menggunakan entitas `User` existing untuk otorisasi akses staf/ustadz dan Spatie Permission untuk guard `pesantren.santri.*`.

## Module Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| REQ-SAN-001 | Pencatatan data master santri baru dengan NIS unik & ULID | Must | Santri berhasil disimpan dengan status 'active' |
| REQ-SAN-002 | Pengelolaan data wali santri dan kontak darurat | Must | Data wali terikat pada entitas santri |
| REQ-SAN-003 | Filter dan pencarian santri berdasarkan nama/NIS/asrama | Should | Hasil pencarian paginasi berjalan cepat |

## Module Boundary

- Owner: `App\Modules\Pesantren\SantriManagement`
- Public contract: `SantriManagementModuleContract`
- Events: `SantriCreated`, `SantriUpdated`
- Permissions: `pesantren.santri.view`, `pesantren.santri.create`, `pesantren.santri.edit`, `pesantren.santri.delete`
- Data ownership: Tabel `pesantren_santri`
- Dependencies: Shared Kernel (`AbstractDomainEvent`, `BaseDTO`)

## Open Decisions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| OD-SAN-001 | Integrasi RFID card UID ke data santri | Skema tabel santri | Tech Lead | Open |
