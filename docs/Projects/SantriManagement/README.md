# Project: Pesantren Santri Management Module

## Project Context

| Item | Value |
|---|---|
| Slug | santri-management |
| Source Repository | app/Modules/Pesantren/SantriManagement |
| Mode | Module Extension (SAKAAI DDD-Lite) |
| Laravel | 13.x |
| Starter Kit Status | Installed (Laravel 13 DDD-Lite Starterkit) |
| Owner | Team Pesantren Enterprise |
| Status | Discovery & Planning |

## Intake Summary

- Existing starter kit capability: Console User Management, Access Control (Spatie RBAC), System Setting, Audit Log, Profile.
- Existing modules: UserManagement, AccessControl, SystemSetting, AuditLog, Profile.
- Existing packages: Inertia React, Ziggy, Spatie Permission, Spatie MediaLibrary.
- Requested module or change: Modul Kesiswaan & Data Master Santri (SantriManagement).
- Baseline documents referenced: LAR001, GOV000, SPC006, docs/03-IMPLEMENTATION/03.07-MODULES.md.
- Out of scope: Payment processing (handled by PesantrenFinance), Attendance hardware integration (handled in future phase).

## Module Inventory

| Module | Status | Owner | Contract/Dependency | Notes |
|---|---|---|---|---|
| SantriManagement | New | Pesantren Core | SantriManagementModuleContract | Master data santri, wali, & kamar asrama |

## Working Rules

Gunakan baseline global sebagai source of truth. Jangan membangun ulang capability existing tanpa keputusan eksplisit. Setiap task mengikuti incremental implementation dan wajib memiliki verification evidence.
