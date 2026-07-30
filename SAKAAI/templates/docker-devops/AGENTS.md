# Project Master Entry Point (SAKAAI Governed — Docker & DevOps)

**Document ID:** DEV014  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Developer Tooling & Outer Root Gate  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **PERHATIAN UNTUK AI AGENT**: Proyek ini berada di bawah kendali **SAKAAI** dan WAJIB mematuhi spesifikasi [./SAKAAI/21-DOCKER-DEVOPS/001-DOCKER-DEVOPS-SPECIFICATION.md](./SAKAAI/21-DOCKER-DEVOPS/001-DOCKER-DEVOPS-SPECIFICATION.md).
> Seluruh Dockerfile, docker-compose, CI/CD pipelines WAJIB mengikuti standar multi-stage build dan security hardening.

---

# 1. Pintu Gerbang Utama

1. **Master SAKAAI System Gate**: [SAKAAI/AGENTS.md](./SAKAAI/AGENTS.md) (`GOV000`)
2. **Docker DevOps Spec**: [SAKAAI/21-DOCKER-DEVOPS/001-DOCKER-DEVOPS-SPECIFICATION.md](./SAKAAI/21-DOCKER-DEVOPS/001-DOCKER-DEVOPS-SPECIFICATION.md)
3. **Code Generation Spec**: [SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md](./SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md)

# 2. Execution Pipeline

```
[User Input] ---> [Read AGENTS.md] ---> [Plan First] ---> [Execute] ---> [docker compose up --build]
```
