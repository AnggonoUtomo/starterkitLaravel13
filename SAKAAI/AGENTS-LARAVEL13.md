# Laravel 13 SAKAAI Governance & Agent Entry Point

**Document ID:** DEV013  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Developer Tooling & Laravel 13 Integration  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **PERHATIAN UNTUK AI AGENT (Antigravity / Gemini / Claude / Cursor)**:
> Proyek Laravel 13 ini berada di bawah kendali **SAKAAI (The Structural Pillar Operating System for AI Agents)** dan WAJIB mematuhi spesifikasi [001-LARAVEL13-DDD-LITE-SPECIFICATION.md](./19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md) (`LAR001`).
> Seluruh pembuatan kode, refactoring, penulisan Controller, Service, Transaction, DTO, Request, Resource, dan Policy WAJIB mengikuti standar DDD-Lite Modular.

---

# 1. SAKAAI Control & Governance Rules

Setiap kali berinteraksi dengan repositori Laravel 13 ini, AI Agent WAJIB mematuhi:

1. **Governance & Privilege Control**: Mematuhi [GOV003 Control Policy](./00-GOVERNANCE/003-CONTROL-POLICY.md). Dilarang mengeksekusi perintah shell destruktif tanpa ratifikasi pengguna.
2. **Code Quality Mandate**: Mematuhi [SPC006 Code Generation Spec](./02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md). **DILARANG MENULIS PLACEHOLDER** (`// TODO`), dilarang menghapus komentar eksisting, dan wajib menyertakan type-hinting serta non-null validation.
3. **Laravel 13 DDD-Lite Architecture Spec**: Mematuhi [001-LARAVEL13-DDD-LITE-SPECIFICATION.md](./19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md) (`LAR001`).
4. **Laravel Engineering Docs (Baseline)**: Membaca [docs/AGENTS.md](../docs/AGENTS.md) dan dokumen relevan di `docs/` (Requirement, Design, Implementation, Framework, Kernel) sebelum implementasi.
5. **SAKAAI–Docs Alignment**: Mematuhi kontrak integrasi [05.05-SAKAAI-LARAVEL-DOCUMENTATION-ALIGNMENT.md](../docs/05-DECISIONS/05.05-SAKAAI-LARAVEL-DOCUMENTATION-ALIGNMENT.md) untuk precedence rule dan mapping antara SAKAAI ↔ docs.

---

# 2. Standar Rekayasa Laravel 13 DDD-Lite (Modular Architecture)

Dalam proyek Laravel 13 ini, AI Agent **WAJIB** menerapkan struktur direktori `app/Shared/` dan `app/Modules/[ModuleName]/`:

```
app/
├── Shared/                                 # Shared Kernel (Cross-cutting Contracts & DTOs)
└── Modules/                                # Bounded Context Modules
    └── [ModuleName]/                       # Contoh: UserManagement, Profile, SystemSetting
        ├── Contracts/                      # Module Contract (Interface Boundary)
        ├── Domain/                         # Entities, Value Objects, Domain Events
        ├── Transactions/                   # Atomic Database Transactions (DB::transaction)
        ├── Integration/                    # Integration Layer (3rd Party API Wrappers)
        ├── DTOs/                           # Strongly Typed Data Transfer Objects
        ├── Policies/                       # PoliciesSupport (Authorization Gates)
        ├── Http/
        │   ├── Controllers/                # Slim HTTP Controllers (< 50 baris)
        │   ├── Requests/                   # Form Requests Validation
        │   └── Resources/                  # API Json Resources Transformation
        └── Providers/                      # Module Service Provider
```

### Aturan Wajib Penulisan Kode:
- **Slim Controllers**: Controller **DILARANG** berisi `User::create()` atau `$request->validate()`. Logika validasi wajib di `FormRequest`, transaksi database wajib di `Transactions`, dan response wajib di `JsonResource`.
- **Inter-Module Communication**: Komunikasi antar-modul **WAJIB** memanggil `Contracts` modul target. Dilarang memanggil controller/service internal modul lain secara langsung.
- **Strict Types**: Seluruh file PHP WAJIB menyertakan `declare(strict_types=1);`.

---

# 3. Alur Kerja Eksekusi AI Agent

```
[User Request] ---> [Read AGENTS.md & LAR001 Spec] ---> [Read docs/ Baseline] ---> [Write Plan] ---> [Execute Code] ---> [Run Tests / Lint]
```

1. **Plan First**: Susun rencana ringkas sebelum mengedit lebih dari 2 berkas.
2. **Run Verification**: Setelah menulis kode, jalankan pengujian (`php artisan test` atau `composer test`) via terminal.
