# Project Master Entry Point (SAKAAI Governed — Laravel 13 DDD-Lite)

**Document ID:** DEV014  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Developer Tooling & Outer Root Gate  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **PERHATIAN UNTUK AI AGENT (Antigravity IDE / Gemini / Claude / Cursor)**:
> Proyek Laravel 13 ini berada di bawah kendali **SAKAAI (Structural Pillar OS for AI)** dan WAJIB mematuhi spesifikasi [./SAKAAI/19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md](./SAKAAI/19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md) (`LAR001`).
> Seluruh pembuatan kode, refactoring, Controller, Service, Transaction, DTO, Request, dan Resource WAJIB mengikuti standar DDD-Lite Modular.

---

# 1. Pintu Gerbang Utama & Lokasi Spesifikasi SAKAAI

1. **Master SAKAAI System Gate**: [SAKAAI/AGENTS.md](./SAKAAI/AGENTS.md) (`GOV000`)
2. **Laravel 13 DDD-Lite Spec**: [SAKAAI/19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md](./SAKAAI/19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md) (`LAR001`)
3. **Governance & Control Policy**: [SAKAAI/00-GOVERNANCE/003-CONTROL-POLICY.md](./SAKAAI/00-GOVERNANCE/003-CONTROL-POLICY.md) (`GOV003`)
4. **Code Generation Spec**: [SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md](./SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md) (`SPC006`) — **DILARANG PLACEHOLDER // TODO**
5. **Laravel Engineering Docs (Baseline)**: [docs/AGENTS.md](./docs/AGENTS.md) — Requirement, Design, Implementation, Deployment, Decisions, Framework & Kernel contracts
6. **SAKAAI–Docs Alignment**: [docs/05-DECISIONS/05.05-SAKAAI-LARAVEL-DOCUMENTATION-ALIGNMENT.md](./docs/05-DECISIONS/05.05-SAKAAI-LARAVEL-DOCUMENTATION-ALIGNMENT.md) — Kontrak integrasi SAKAAI ↔ docs

---

# 2. Execution Pipeline

```
[User Input] ---> [Read AGENTS.md] ---> [Read SAKAAI & LAR001 Specs] ---> [Read docs/ Baseline] ---> [Plan First] ---> [Execute Code] ---> [Verify]
```

1. **Plan First**: Susun rencana sebelum mengedit lebih dari 2 berkas.
2. **Execute Clean Code**: `declare(strict_types=1);`, Slim Controller < 50 baris, Module Contracts.
3. **Verify**: `php artisan test` atau `node cli/sakaai.js validate`.
