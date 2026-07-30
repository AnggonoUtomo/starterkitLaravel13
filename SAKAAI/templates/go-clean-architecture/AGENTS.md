# Project Master Entry Point (SAKAAI Governed — Go Clean Architecture)

**Document ID:** DEV014  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Developer Tooling & Outer Root Gate  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **PERHATIAN UNTUK AI AGENT (Antigravity IDE / Gemini / Claude / Cursor)**:
> Proyek Go ini berada di bawah kendali **SAKAAI (Structural Pillar OS for AI)** dan WAJIB mematuhi spesifikasi [./SAKAAI/20-GO-CLEAN-ARCHITECTURE/001-GO-CLEAN-ARCHITECTURE-SPECIFICATION.md](./SAKAAI/20-GO-CLEAN-ARCHITECTURE/001-GO-CLEAN-ARCHITECTURE-SPECIFICATION.md).
> Seluruh pembuatan kode WAJIB mengikuti standar Hexagonal/Clean Architecture: Domain Entities, Use Cases, Repository Interfaces, dan HTTP/gRPC Handlers.

---

# 1. Pintu Gerbang Utama

1. **Master SAKAAI System Gate**: [SAKAAI/AGENTS.md](./SAKAAI/AGENTS.md) (`GOV000`)
2. **Go Clean Architecture Spec**: [SAKAAI/20-GO-CLEAN-ARCHITECTURE/001-GO-CLEAN-ARCHITECTURE-SPECIFICATION.md](./SAKAAI/20-GO-CLEAN-ARCHITECTURE/001-GO-CLEAN-ARCHITECTURE-SPECIFICATION.md)
3. **Code Generation Spec**: [SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md](./SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md) — **DILARANG PLACEHOLDER // TODO**

---

# 2. Execution Pipeline

```
[User Input] ---> [Read AGENTS.md] ---> [Read SAKAAI & Go Specs] ---> [Plan First] ---> [Execute Code] ---> [Verify]
```

1. **Plan First**: Susun rencana sebelum mengedit lebih dari 2 berkas.
2. **Execute Clean Code**: Strict interfaces, dependency injection via constructor, no global state.
3. **Verify**: `go test ./...` atau `node cli/sakaai.js validate`.
