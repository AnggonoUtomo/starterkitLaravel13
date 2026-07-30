# SAKAAI Specification: HITL Web Dashboard Architecture

**Document ID:** UI001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Human Interactive Portal  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & UI Architecture

Dokumen ini mendefinisikan **Spesifikasi Web Dashboard Human-in-the-Loop (HITL Web Dashboard Specification)** yang mengatur antarmuka visual interaktif berbasis web untuk memantau eksekusi tugas DAG, telemetry real-time, status memori, serta log audit SAKAAI.

```
+-------------------------------------------------------------------------+
|                      SAKAAI HITL WEB DASHBOARD UI                         |
|                                                                         |
|  +------------------------+  +--------------------+  +----------------+ |
|  | Real-time DAG Graph    |  | Active Memory      |  | Audit Log      | |
|  | Execution Monitor      |  | Inspector          |  | Stream Viewer  | |
|  +------------------------+  +--------------------+  +----------------+ |
+-------------------------------------------------------------------------+
```

---

# 2. Key UI Components & Design Aesthetics

1. **Rich Aesthetics & Theme**: Menggunakan tema gelap modern (*Dark Mode Glassmorphism*), kontras tinggi, typography Inter/Outfit, dan dynamic micro-animations.
2. **DAG Execution Graph Node**: Visualisasi node tugas berwarna hijau (`COMPLETED`), biru (`RUNNING`), dan merah (`FAILED`) secara real-time via WebSockets.
3. **Interactive Telemetry Panel**: Menampilkan grafik penggunaan token, latensi pemanggilan model, dan performa memory retrieval.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready HITL Web Dashboard Specification | Governance Board |
