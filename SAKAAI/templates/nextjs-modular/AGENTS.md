# Project Master Entry Point (SAKAAI Governed — Next.js Modular)

**Document ID:** DEV014  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Developer Tooling & Outer Root Gate  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **PERHATIAN UNTUK AI AGENT**: Proyek Next.js ini berada di bawah kendali **SAKAAI** dan WAJIB mematuhi spesifikasi [./SAKAAI/22-NEXTJS-MODULAR/001-NEXTJS-MODULAR-SPECIFICATION.md](./SAKAAI/22-NEXTJS-MODULAR/001-NEXTJS-MODULAR-SPECIFICATION.md).
> Seluruh pembuatan komponen, routes, dan data fetching WAJIB mengikuti standar Feature-Sliced Design + App Router.

---

# 1. Pintu Gerbang Utama

1. **Master SAKAAI System Gate**: [SAKAAI/AGENTS.md](./SAKAAI/AGENTS.md) (`GOV000`)
2. **Next.js Modular Spec**: [SAKAAI/22-NEXTJS-MODULAR/001-NEXTJS-MODULAR-SPECIFICATION.md](./SAKAAI/22-NEXTJS-MODULAR/001-NEXTJS-MODULAR-SPECIFICATION.md)
3. **Code Generation Spec**: [SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md](./SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md)

# 2. Execution Pipeline

```
[User Input] ---> [Read AGENTS.md] ---> [Plan First] ---> [Execute] ---> [npm run build && npm test]
```
