# SAKAAI Orchestrator Specification

**Document ID:** ENG006  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Engineering Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Dokumen ini mendefinisikan spesifikasi teknis dan rekayasa untuk **SAKAAI Orchestrator Engine**.

Orchestrator berfungsi sebagai pengatur alur kerja (*Workflow Conductor*) dalam sistem SAKAAI. Engine ini bertanggung jawab memecah tujuan tingkat tinggi (*High-level Goal*) menjadi grafik tugas terarah (*Directed Acyclic Graph* / DAG), mengelola eksekusi paralel dan sekuensial, serta menyelesaikan ketergantungan antar-tugas.

```
[High-Level Goal] --> [DAG Task Decomposition] --> [Parallel/Sequential Execution] --> [Goal Verification]
```

---

# 2. Purpose

SAKAAI Orchestrator Specification bertujuan untuk:

- Menjamin eksekusi tugas multi-langkah (*multi-step execution*) berjalan teratur tanpa *deadlock*.
- Mengoptimalkan efisiensi eksekusi melalui penjadwalan paralel untuk tugas-tugas independen.
- Menjamin konsistensi alur kerja sesuai standar `04-WORKFLOW/001-PIPELINE-SEQUENCE.md`.
- Menyediakan mekanisme pemulihan dan penyesuaian alur kerja dinamis (*Dynamic Plan Adjustment*).

---

# 3. Orchestrator Philosophy

Orchestrator didasarkan pada prinsip:

```
Complex Goals Require Structured Pipelines
```

1. **DAG-Based Planning**: Semua alur kerja kompleks didefinisikan dalam bentuk node tugas dan edge ketergantungan.
2. **Dynamic Adaptation**: Jika suatu sub-tugas gagal atau menghasilkan temuan baru, Orchestrator memperbarui DAG secara teratur.
3. **Concurrency Control**: Membatasi jumlah eksekusi simultan sesuai batas kemampuan sistem.

---

# 4. Orchestrator Subsystems Architecture

```
                 +--------------------------+
                 |    Goal Task Decomposer  |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 |   DAG Graph Builder      |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 | Parallel Task Scheduler  |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 | Dependency Resolver      |
                 +--------------------------+
```

## 4.1 Goal Task Decomposer
Menerima instruksi pengguna dan memecahnya menjadi unit-unit pekerjaan terisolasi (*atomic tasks*).

## 4.2 DAG Graph Builder
Membangun struktur ketergantungan (*dependency graph*) dengan validasi pencegahan siklus (*cycle detection*).

## 4.3 Parallel Task Scheduler
Mendistribusikan node tugas yang siap dieksekusi (*ready nodes*) ke Agent Runtime atau Engine terkait.

## 4.4 Dependency Resolver
Memantau penyelesaian node dan mengaktifkan node lanjutan setelah prasyarat terpenuhi.

---

# 5. Workflow Execution DAG Model

```
                    +--------------------+
                    |  Task 1: Spec Plan |
                    +---------+----------+
                              |
              +---------------+---------------+
              |                               |
              v                               v
    +-------------------+           +-------------------+
    | Task 2A: Write    |           | Task 2B: Write    |
    | Core Spec         |           | Context Spec      |
    +---------+---------+           +---------+---------+
              |                               |
              +---------------+---------------+
                              |
                              v
                    +--------------------+
                    | Task 3: Audit Plan |
                    +--------------------+
```

---

# 6. Data Structures & Contracts

## 6.1 DAG Task Node Definition

```json
{
  "node_id": "NODE-002A",
  "task_name": "Write Core Specification",
  "assigned_engine": "AgentRuntime",
  "dependencies": ["NODE-001"],
  "status": "PENDING",
  "retry_policy": {
    "max_retries": 2,
    "backoff_ms": 1000
  }
}
```

## 6.2 Execution Plan Payload

```json
{
  "plan_id": "PLAN-20260725-01",
  "goal": "Selesaikan 9 dokumen 10-ENGINEERING-SPECIFICATION",
  "total_nodes": 9,
  "completed_nodes": 5,
  "active_nodes": ["NODE-006"],
  "created_at": "2026-07-25T23:51:00Z"
}
```

---

# 7. Failure Handling & Re-Planning Protocol

1. **Node Failure Protocol**: Jika node tugas gagal setelah retry maksimal, node tersebut ditandai `FAILED`.
2. **Downstream Cascade Hold**: Node turunan yang bergantung pada node yang gagal secara otomatis ditunda (*BLOCKED*).
3. **Dynamic Plan Re-evaluation**: Orchestrator meminta Reasoning Engine untuk mengevaluasi apakah alur dapat dilanjutkan melalui strategi alternatif.

---

# 8. Verification & Compliance Standards

1. **Zero Cycle Vulnerability**: Algoritma deteksi siklus (Tarjan/Kahn) harus dijalankan sebelum eksekusi DAG dimulai.
2. **Determinism in Dependency Execution**: Node tidak pernah boleh dieksekusi sebelum seluruh prasyarat bernilai `COMPLETED`.
