# Project Master Entry Point (SAKAAI Governed Project)

**Document ID:** DEV014  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Developer Tooling & Outer Root Gate  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **PERHATIAN UNTUK AI AGENT (Antigravity IDE / Gemini / Claude / Cursor)**:
> Proyek ini berada di bawah kendali **SAKAAI (Structural Pillar OS for AI)**.
> Seluruh aktivitas penalaran, perancangan, penulisan kode, dan pemanggilan tool WAJIB mematuhi konstitusi, tata kelola, serta spesifikasi rekayasa SAKAAI yang terdaftar di folder `./SAKAAI/`.

---

# 1. Pintu Gerbang Utama & Lokasi Spesifikasi SAKAAI

Sebelum melakukan perubahan kode atau eksekusi perintah shell pada proyek ini, AI Agent WAJIB membaca dan tunduk pada dokumen-dokumen utama SAKAAI berikut:

1. **Master SAKAAI System Gate**:
   - [SAKAAI/AGENTS.md](./SAKAAI/AGENTS.md) (`GOV000`)
2. **Governance & Privilege Control Policy**:
   - [SAKAAI/00-GOVERNANCE/003-CONTROL-POLICY.md](./SAKAAI/00-GOVERNANCE/003-CONTROL-POLICY.md) (`GOV003`)
3. **Laravel 13 DDD-Lite Architecture Spec**:
   - [SAKAAI/19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md](./SAKAAI/19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md) (`LAR001`)
   - [SAKAAI/AGENTS-LARAVEL13.md](./SAKAAI/AGENTS-LARAVEL13.md) (`DEV013`)
4. **Code Generation Specification**:
   - [SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md](./SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md) (`SPC006`) — **DILARANG MENULIS PLACEHOLDER // TODO**

---

# 2. Larangan & Batasan Eksekusi AI Agent

| Aturan | Larangan / Batasan | Konsekuensi Pelanggaran |
| :--- | :--- | :--- |
| **No Unvalidated Code** | Dilarang menulis kode tanpa type-hinting, non-null check, atau menyisakan `// TODO`. | Rejected by Gate Linter |
| **No Unapproved Shell Commands** | Perintah `ELEVATED_SHELL` (seperti git commit/push, install package) wajib persetujuan pengguna via Approval Gate. | Blocked by Policy Enforcement |
| **Strict DDD-Lite Modular** | Controller Laravel 13 wajib tipis (< 50 baris). Dilarang menulis query DB langsung di Controller. | Rejected by Code Review |
| **No Direct Inter-Module Call** | Komunikasi antar-modul wajib melalui `Contracts` modul target. | Encapsulation Violation |

---

# 3. Standard Execution Pipeline Flow

```
[User Input] ---> [Read Outer AGENTS.md] ---> [Read SAKAAI Specs] ---> [Plan First] ---> [Execute Code] ---> [Verify]
```

1. **Phase 1 (Plan First)**: Tuliskan rencana kerja sebelum melakukan editan pada 2 berkas atau lebih.
2. **Phase 2 (Execute Clean Code)**: Terapkan kode tingkat produksi secara utuh.
3. **Phase 3 (Verify)**: Jalankan verifikasi otomatis (`node cli/sakaai.js validate` atau `composer test`).
