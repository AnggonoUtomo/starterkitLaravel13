# Project: Pesantren Finance Module

## Project Context

| Item | Value |
|---|---|
| Slug | pesantren-finance |
| Source Repository | app/Modules/Pesantren/PesantrenFinance |
| Mode | Module Extension (SAKAAI DDD-Lite) |
| Laravel | 13.x |
| Starter Kit Status | Installed (Laravel 13 DDD-Lite Starterkit) |
| Owner | Team Pesantren Enterprise |
| Status | Discovery & Planning |

## Intake Summary

- Existing starter kit capability: System Settings, Audit Log, User Management.
- Existing modules: SantriManagement, UserManagement, AccessControl.
- Requested module: Modul Keuangan & Syahriyah/SPP (PesantrenFinance).
- Baseline documents referenced: LAR001, GOV000, SPC006.

## Module Inventory

| Module | Status | Owner | Contract/Dependency | Notes |
|---|---|---|---|---|
| PesantrenFinance | New | Finance Core | PesantrenFinanceModuleContract | Tagihan syahriyah, SPP, & kuitansi |

## Working Rules

Gunakan baseline global sebagai source of truth. Jangan membangun ulang capability existing tanpa keputusan eksplisit. Setiap task mengikuti incremental implementation dan wajib memiliki verification evidence.
