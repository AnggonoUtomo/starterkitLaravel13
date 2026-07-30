# SAKAAI: Artificial Intelligence Operating System

**Document ID:** DEV100  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** System Documentation  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **SAKAAI (Artificial Intelligence Operating System)** adalah kerangka kerja arsitektur, tata kelola, dan runtime operasional terpadu yang mendisiplinkan bagaimana AI Agent (Antigravity IDE, Gemini, Claude, Cursor) bernalar (*reasoning*), mengelola memori (*context & memory*), serta mengeksekusi tindakan pada skala produksi enterprise.

---

# 1. System Architecture Overview

SAKAAI memisahkan operasi inteligensi buatan ke dalam 20 divisi modul terenkapsulasi yang menjamin keterlacakan (*traceability*), keselamatan (*fail-safe control*), serta kepatuhan mutlak terhadap hukum arsitektur proyek:

```
+-----------------------------------------------------------------------------------+
|                        SAKAAI UNIFIED ARCHITECTURE PIPELINE                         |
|                                                                                   |
|  00-GOVERNANCE & 01-CONSTITUTION (Aturan Hukum, Matriks RACI, & Guardrails)       |
|  ===============================================================================  |
|  02-SPECIFICATION & 04-WORKFLOW (Format Prompt, Tool Specs, & Pipeline Sequences)  |
|  ===============================================================================  |
|  03-CONTEXT & 06-PROJECT-STATE (Dynamic Context Assembly & Retrieval Memory)      |
|  ===============================================================================  |
|  09-IMPLEMENTATION & 10-ENGINEERING-SPEC (Core Kernel, Reasoning, & Runtime)      |
|  ===============================================================================  |
|  11 to 18 ENTERPRISE EXTENSIONS (Testing, MCP, Telemetry, FinOps, & Disaster Recovery)|
|  ===============================================================================  |
|  19-LARAVEL-DDD-LITE (Laravel 13 Bounded Context Modular Architecture Standard)    |
+-----------------------------------------------------------------------------------+
```

---

# 2. Master Navigation Index (72 Specification Documents)

| Folder Modul | Deskripsi Divisi | Status | Berkas Kunci |
| :--- | :--- | :---: | :--- |
| **`00-GOVERNANCE`** | Kerangka Tata Kelola & Policy Control | **ACTIVE** | [001-GOVERNANCE.md](./00-GOVERNANCE/001-GOVERNANCE.md), [003-CONTROL-POLICY.md](./00-GOVERNANCE/003-CONTROL-POLICY.md) |
| **`01-CONSTITUTION`** | Konstitusi & 5 Pilar Arsitektur | **ACTIVE** | [001-SAKAAI-PHILOSOPHY.md](./01-CONSTITUTION/001-SAKAAI-PHILOSOPHY.md), [002-SAKAAI-EXECUTION-PIPELINE.md](./01-CONSTITUTION/002-SAKAAI-EXECUTION-PIPELINE.md) |
| **`02-SPECIFICATION`** | Spesifikasi Prompt, Tool, & RAG | **ACTIVE** | [001-PROMPT-SPECIFICATION.md](./02-SPECIFICATION/001-PROMPT-SPECIFICATION.md), [005-TOOL-CALLING-SPECIFICATION.md](./02-SPECIFICATION/005-TOOL-CALLING-SPECIFICATION.md) |
| **`03-CONTEXT`** | Seleksi Dokumen & Token Budget | **ACTIVE** | [001-DOCUMENT-SELECTION-RULE.md](./03-CONTEXT/001-DOCUMENT-SELECTION-RULE.md), [002-CONTEXT-ASSEMBLY.md](./03-CONTEXT/002-CONTEXT-ASSEMBLY.md) |
| **`04-WORKFLOW`** | Pipeline Sequences & Exception Handling | **ACTIVE** | [001-PIPELINE-SEQUENCE.md](./04-WORKFLOW/001-PIPELINE-SEQUENCE.md), [003-ERROR-HANDLING.md](./04-WORKFLOW/003-ERROR-HANDLING.md) |
| **`05-DECISION-MANAGEMENT`** | ADR Decision & Review Records | **ACTIVE** | [SAKAAI Decision Record Specification.md](./05-DECISION-MANAGEMENT/decision-records/SAKAAI%20Decision%20Record%20Specification.md) |
| **`06-PROJECT-STATE`** | Active Context & Project Memory | **ACTIVE** | [active-context.md](./06-PROJECT-STATE/active-context.md), [project-memory.md](./06-PROJECT-STATE/project-memory.md) |
| **`07-EXTENSION`** | Subagent, Plugin, & Tool Extensions | **ACTIVE** | [SAKAAI Agent Extension Specification.md](./07-EXTENSION/agents/SAKAAI%20Agent%20Extension%20Specification.md) |
| **`08-AUDIT`** | Cryptographic Hash Chain Audit Logs | **ACTIVE** | [SAKAAI Execution Log Specification.md](./08-AUDIT/execution-log/SAKAAI%20Execution%20Log%20Specification.md) |
| **`09-IMPLEMENTATION`** | Models System, Runtime, & Security | **ACTIVE** | [001-SAKAAI-SYSTEM-MODEL.md](./09-IMPLEMENTATION/001-SAKAAI-SYSTEM-MODEL.md), [007-SAKAAI-SECURITY-MODEL.md](./09-IMPLEMENTATION/007-SAKAAI-SECURITY-MODEL.md) |
| **`10-ENGINEERING-SPEC`** | Deep Engineering Engine Specs | **ACTIVE** | [001-SAKAAI-CORE-SPECIFICATION.md](./10-ENGINEERING-SPECIFICATION/001-SAKAAI-CORE-SPECIFICATION.md), [009-API-CONTRACT-SPECIFICATION.md](./10-ENGINEERING-SPECIFICATION/009-API-CONTRACT-SPECIFICATION.md) |
| **`11-TESTING-EVALUATION`** | Benchmark Evals & Shadow Execution | **ACTIVE** | [001-REASONING-EVALUATION-SPEC.md](./11-TESTING-AND-EVALUATION/001-REASONING-EVALUATION-SPEC.md) |
| **`12-INTEROPERABILITY-MCP`** | Model Context Protocol Client & Server | **ACTIVE** | [001-MCP-CLIENT-SPECIFICATION.md](./12-INTEROPERABILITY-MCP/001-MCP-CLIENT-SPECIFICATION.md) |
| **`13-OBSERVABILITY-METRICS`**| Prometheus Telemetry & Health Probe | **ACTIVE** | [001-PROMETHEUS-GRAFANA-SCHEMA.md](./13-OBSERVABILITY-METRICS/001-PROMETHEUS-GRAFANA-SCHEMA.md) |
| **`14-DEVELOPER-TOOLING`** | CLI Utility & Automated Validator | **ACTIVE** | [001-SAKAAI-CLI-SPECIFICATION.md](./14-DEVELOPER-TOOLING/001-SAKAAI-CLI-SPECIFICATION.md) |
| **`15-HUMAN-PORTAL`** | HITL Web Dashboard & Approval Gate | **ACTIVE** | [001-HITL-DASHBOARD-SPECIFICATION.md](./15-HUMAN-INTERACTIVE-PORTAL/001-HITL-DASHBOARD-SPECIFICATION.md) |
| **`16-DISASTER-RECOVERY`** | AES-256 Backup & HA Failover | **ACTIVE** | [001-BACKUP-SNAPSHOT-STRATEGY.md](./16-DISASTER-RECOVERY-AND-BACKUP/001-BACKUP-SNAPSHOT-STRATEGY.md) |
| **`17-COST-FINOPS`** | Token Budget & Dynamic Model Routing | **ACTIVE** | [001-TOKEN-BUDGET-GOVERNANCE.md](./17-COST-GOVERNANCE-AND-FINOPS/001-TOKEN-BUDGET-GOVERNANCE.md) |
| **`18-CONTINUOUS-LEARNING`** | Human Feedback Loop & Auto Playbook | **ACTIVE** | [001-FEEDBACK-LOOP-SPECIFICATION.md](./18-CONTINUOUS-LEARNING-AND-RLHF/001-FEEDBACK-LOOP-SPECIFICATION.md) |
| **`19-LARAVEL-DDD-LITE`** | Laravel 13 DDD-Lite Architecture | **ACTIVE** | [001-LARAVEL13-DDD-LITE-SPECIFICATION.md](./19-LARAVEL-DDD-LITE/001-LARAVEL13-DDD-LITE-SPECIFICATION.md) |

---

# 3. Quick Start & Developer Usage

### A. Menjalankan SAKAAI CLI Utility
SAKAAI menyediakan CLI Node.js mandiri pada folder `cli/`:

```bash
# 1. Menjalankan Interactive Installer (Memasang SAKAAI ke proyek apapun)
node cli/sakaai.js install

# 2. Memeriksa Status Kernel & Active Context
node cli/sakaai.js status

# 3. Menjalankan Validator Lint Dokumen & Link Integrity (100% Pass)
node cli/sakaai.js validate

# 4. Memeriksa Kesehatan Heartbeat Subsistem Kernel
node cli/sakaai.js health

# 5. Verifikasi Cryptographic Hash Chain Audit Log
node cli/sakaai.js audit
```

### B. Menjalankan HITL Web Dashboard (Human-in-the-Loop)
Buka berkas **[dashboard/index.html](./dashboard/index.html)** di browser (Chrome / Edge / Firefox) untuk memvisualisasikan:
- DAG Task Execution Graph Live.
- Telemetry & Token Cost Metrics.
- Active Context & RAG Memory Search Simulator.
- Manual Approval Gate Interaktif untuk perintah `ELEVATED_SHELL`.

### C. Menggunakan SAKAAI pada Fresh Install Laravel 13
Untuk mengikat AI Agent secara otomatis pada proyek fresh install Laravel 13:
1. Salin isi berkas **[AGENTS-LARAVEL13.md](./AGENTS-LARAVEL13.md)**.
2. Simpan sebagai file **`AGENTS.md`** pada root proyek Laravel 13 baru Anda.

---

# 4. Agent Entry Point System

- **[AGENTS.md](./AGENTS.md)** (`GOV000`): Master Entry Gate repositori SAKAAI yang otomatis dimuat oleh Antigravity IDE / Cursor pada turn pertama.
- **[SAKAAI-IMPLEMENTATION-GUIDE.md](./SAKAAI-IMPLEMENTATION-GUIDE.md)** (`DEV000`): Panduan pembelajaran komprehensif untuk pengembang & siswa.

---

# 5. Posisi & Roadmap SAKAAI

SAKAAI saat ini berfungsi sebagai **AI Governance & Specification Framework** — sebuah kerangka kerja spesifikasi dan tata kelola yang mendisiplinkan AI Agent melalui dokumen konstitusi, gate file (`AGENTS.md`), dan aturan penulisan kode. Dokumen-dokumen ini secara efektif mengarahkan perilaku AI Agent saat dimuat oleh IDE (Antigravity, Cursor, dll.).

### Roadmap Evolusi Menuju Runtime System:

| Fase | Status | Deskripsi |
| :--- | :---: | :--- |
| **v1.0 — Specification Framework** | ✅ SELESAI | 102 dokumen spesifikasi, 25 Agent Skills, CLI validator, HITL Dashboard |
| **v2.0 — Dynamic CLI & Real Verification** | ✅ SELESAI | SHA-256 hash chain nyata, dynamic folder scanning, filesystem health probes |
| **v3.0 — Runtime Engine Implementation** | 🔜 PLANNED | TypeScript/Go runtime yang menjalankan 6-phase pipeline, state machine, dan policy enforcement secara programatik |
| **v4.0 — Live Dashboard & Telemetry** | 🔜 PLANNED | Dashboard terhubung ke CLI via WebSocket/SSE untuk menampilkan data eksekusi real-time |

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Master SAKAAI Repository Documentation | Governance Board |
| 1.1 | 2026-07-26 | Added SAKAAI positioning, roadmap, and version transparency | System Audit |
