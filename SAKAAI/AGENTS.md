# SAKAAI Master System Gate & Agent Entry Point

**Document ID:** GOV000  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Governance & Agent Gate  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **PERHATIAN MUTLAK UNTUK SELURUH AI AGENT (Antigravity IDE / Gemini / Claude / Cursor)**:
> Repositori ini berada di bawah kendali **SAKAAI (Structural Pillar OS for AI)**.
> Seluruh aktivitas penalaran, perancangan, penulisan kode, dan pemanggilan tool WAJIB mematuhi konstitusi, tata kelola, serta spesifikasi rekayasa SAKAAI yang terdaftar di repositori ini.

---

# 1. Pintu Gerbang Utama & Hukum SAKAAI System

Sebelum melakukan tindakan apapun, AI Agent WAJIB membaca dan tunduk pada dokumen-dokumen utama berikut:

1. **Constitutional Rules & Pillars**:
   - [001-SAKAAI-PHILOSOPHY.md](./01-CONSTITUTION/001-SAKAAI-PHILOSOPHY.md) (`CON001`)
   - [002-SAKAAI-EXECUTION-PIPELINE.md](./01-CONSTITUTION/002-SAKAAI-EXECUTION-PIPELINE.md) (`CON002`)
   - [003-SAKAAI-PRINCIPLES.md](./01-CONSTITUTION/003-SAKAAI-PRINCIPLES.md) (`CON003`)
2. **Governance & Control Policy**:
   - [001-GOVERNANCE.md](./00-GOVERNANCE/001-GOVERNANCE.md) (`GOV001`)
   - [003-CONTROL-POLICY.md](./00-GOVERNANCE/003-CONTROL-POLICY.md) (`GOV003`) — *Hak Akses & Boundary Control*
3. **Code Quality & Tool Calling Mandates**:
   - [005-TOOL-CALLING-SPECIFICATION.md](./02-SPECIFICATION/005-TOOL-CALLING-SPECIFICATION.md) (`SPC005`)
   - [006-CODE-GENERATION-SPECIFICATION.md](./02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md) (`SPC006`) — **DILARANG PLACEHOLDER // TODO**
4. **Laravel 13 DDD-Lite Standard**:
   - [001-LARAVEL13-DDD-LITE-SPECIFICATION.md](./19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md) (`LAR001`)
   - [AGENTS-LARAVEL13.md](./AGENTS-LARAVEL13.md) (`DEV013`)
5. **Real-time Active Context**:
   - [active-context.md](./06-PROJECT-STATE/active-context.md) (`STATE001`)
6. **Laravel Engineering Docs (Baseline)**:
   - [docs/AGENTS.md](../docs/AGENTS.md) — Requirement, Design, Implementation, Deployment, Decisions, Framework & Kernel contracts
   - [docs/README.md](../docs/README.md) — Navigasi & governance dokumentasi baseline
7. **SAKAAI–Docs Alignment Contract**:
   - [05.05-SAKAAI-LARAVEL-DOCUMENTATION-ALIGNMENT.md](../docs/05-DECISIONS/05.05-SAKAAI-LARAVEL-DOCUMENTATION-ALIGNMENT.md) — Kontrak integrasi SAKAAI ↔ docs, precedence rule, mapping

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
[User Input] ---> [Read AGENTS.md Gate] ---> [Read docs/ Baseline] ---> [Formulate Thought Plan] ---> [Execute Tool Sandbox] ---> [Audit Settlement]
```

1. **Phase 1 (Plan First)**: Tuliskan rencana kerja sebelum melakukan editan pada 2 berkas atau lebih.
2. **Phase 2 (Execute Clean Code)**: Terapkan kode tingkat produksi secara utuh.
3. **Phase 3 (Verify)**: Jalankan verifikasi otomatis. Dari root proyek: `node cli/sakaai.js validate` atau `composer test`.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Master SAKAAI System Gate & Agent Entry Point | Governance Board |
