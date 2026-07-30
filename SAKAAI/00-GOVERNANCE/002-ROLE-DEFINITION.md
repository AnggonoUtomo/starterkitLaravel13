# SAKAAI Role Definition Specification

**Document ID:** GOV002  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Governance  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Overview

Dokumen ini mendefinisikan secara spesifik seluruh **peran (roles)**, kewenangan (*authorities*), batasan (*boundaries*), serta tanggung jawab (*responsibilities*) setiap aktor—baik aktor manusia (*human actors*) maupun agen kecerdasan buatan (*AI agents*)—dalam ekosistem SAKAAI.

Dalam sistem berotonomi tinggi seperti SAKAAI, kekaburan peran dapat mengakibatkan deviasi eksekusi, instruksi kontradiktif, atau kebocoran hak akses. Oleh karena itu, spesifikasi ini menetapkan hierarki otoritas yang kaku dan teruji secara sistemik.

```
+-------------------------------------------------------------------------+
|                         SAKAAI ROLE ARCHITECTURE                          |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  | HUMAN AUTHORITY (Project Owner / System Architect / Administrator)|  |
|  +-----------------------------------+-------------------------------+  |
|                                      |                                  |
|                                      v                                  |
|  +-----------------------------------+-------------------------------+  |
|  | SAKAAI SYSTEM ENGINE (Core Kernel / Orchestrator / Auditor Engine) |  |
|  +-----------------------------------+-------------------------------+  |
|                                      |                                  |
|                                      v                                  |
|  +-----------------------------------+-------------------------------+  |
|  | EXECUTION AGENTS (Primary Agent / Specialized Subagents)          |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
```

---

# 2. Role Philosophy & Governance Rules

Sistem peran SAKAAI dibangun di atas 3 pilar utama:

1. **Explicit Ownership (Kepemilikan Eksplisit)**: Tidak ada tugas atau proses dalam SAKAAI yang berjalan tanpa penunjukan peran penanggung jawab (*assigned role*).
2. **Principle of Least Privilege (Hak Akses Minimum)**: Setiap peran hanya diberikan kapabilitas dan akses tool yang dibutuhkan untuk menyelesaikan tugas spesifiknya.
3. **Traceable Delegation (Delegasi Terlacak)**: Apabila sebuah agen induk mendelegasikan sub-tugas kepada subagent, agen induk tetap bertanggung jawab penuh atas hasil kerja subagent tersebut.

---

# 3. Comprehensive Role Taxonomy

SAKAAI mengklasifikasikan 5 peran utama dalam ekosistem:

## 3.1 Human Project Owner / Administrator (Level 1)
- **Definisi**: Pihak manusia yang memegang kepemilikan tertinggi terhadap proyek, menetapkan tujuan akhir (*ultimate goals*), serta mengotorisasi kebijakan keamanan dan perubahan kritikal.
- **Kewenangan**: 
  - Meratifikasi atau membatalkan keputusan arsitektur.
  - Memberikan persetujuan eksekusi perintah terminal berisiko tinggi (*elevated permissions*).
  - Mengubah status dokumen konstitusi dan tata kelola.
- **Batasan**: Tidak boleh secara langsung mengubah state runtime tanpa mencatat alasan perubahan.

## 3.2 SAKAAI System Kernel & Auditor (Level 2 System)
- **Definisi**: Component engine inti SAKAAI (`SAKAAI Core`, `Audit Engine`) yang berjalan di tingkat latar belakang untuk memantau kepatuhan.
- **Kewenangan**:
  - Mengunci atau membatalkan eksekusi agen yang melanggar kebijakan *Control Policy*.
  - Menulis log audit terenkripsi (*immutable logs*).
  - Mengubah status sistem menjadi `DEGRADED` atau `SAFE_MODE` saat terjadi gangguan.
- **Batasan**: Tidak dapat memodifikasi tujuan proyek tanpa instruksi Human Administrator.

## 3.3 Orchestrator & Task Planner (Level 2 Agent)
- **Definisi**: Agen kecerdasan tingkat atas yang bertanggung jawab menerima instruksi pengguna, memecah tugas menjadi DAG (*Directed Acyclic Graph*), dan mengelola jadwal eksekusi.
- **Kewenangan**:
  - Menentukan urutan langkah kerja (*Execution Plan*).
  - Melakukan *spawning* dan *termination* terhadap subagent.
  - Mengalokasikan konteks dan batas token per agen.
- **Batasan**: Dilarang mengeksekusi operasi kode langsung tanpa melalui *Agent Runtime* atau *Tool Registry*.

## 3.4 Primary Execution Agent (Level 3 Agent)
- **Definisi**: Agen kerja utama yang berinteraksi langsung dengan berkas proyek, melakukan penulisan kode, pembaruan dokumen, dan pemanggilan tool standar.
- **Kewenangan**:
  - Membaca dan menulis berkas pada workspace terpilih.
  - Menjalankan tool uji otomatis (*test runners, linter*).
  - Membuat laporan kerja (*Walkthrough artifact*).
- **Batasan**: Tidak dapat mengubah konfigurasi kernel atau mengabaikan aturan linter.

## 3.5 Specialized Subagent (Level 3 Worker)
- **Definisi**: Agen khusus berskala terbatas yang diciptakan untuk tugas tunggal (misal: *Security Inspector*, *Documentation Builder*, *Code Refactorer*).
- **Kewenangan**:
  - Mengeksekusi instruksi terbatas sesuai scope penciptaannya.
  - Melaporkan hasil langsung ke Primary Execution Agent.
- **Batasan**: Tidak memiliki akses ke jaringan luar atau memori global proyek tanpa perantara Orchestrator.

---

# 4. RACI Matrix (Responsibility Assignment Matrix)

Tabel berikut mendefinisikan keterlibatan setiap peran pada aktivitas kunci SAKAAI:
*(Legend: **R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed)*

| Aktivitas Sistem | Human Owner | System Auditor | Orchestrator | Primary Agent | Subagent |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Definisi Goal Proyek | **A** | I | C | R | I |
| Perubahan Dokumen Governance | **A** | R | I | I | I |
| Penyusunan Execution Plan (DAG) | I | C | **A / R** | C | I |
| Penulisan Kode / Berkas | I | C | I | **A / R** | R |
| Panggilan Tool Sensitif (Shell) | **A** | R | C | R | I |
| Pemulihan Error Kernel | I | **A / R** | C | I | I |

---

# 5. Dynamic Role Delegation Protocol

Apabila Primary Execution Agent memerlukan pemisahan tugas (*task offloading*):

```
+------------------+         Offload Task Request        +--------------------+
|  Primary Agent   | ----------------------------------> | Orchestrator Engine|
+------------------+                                     +---------+----------+
                                                                   |
                                                                   | Spawns Subagent
                                                                   v
+------------------+           Returns DTO Result        +--------------------+
|  Primary Agent   | <---------------------------------- | Specialized Worker |
+------------------+                                     +--------------------+
```

1. **Context Boundary**: Subagent yang diciptakan hanya menerima salinan konteks minimal (*scoped payload*).
2. **Lifecycle Inheritance**: Masa hidup subagent terikat pada parent agent. Jika parent agent ditunda (*paused*), subagent otomatis ditunda.

---

# 6. Compliance & Enforcement

1. **Role Access Verification**: Sebelum panggilan tool dieksekusi, *Tool Registry Engine* wajib memverifikasi peran pemanggil terhadap *RACI Matrix*.
2. **Audit Role Tagging**: Setiap entri log audit wajib menyertakan atribut `actor_role` yang valid.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready SAKAAI Role Definition and RACI Specification | Governance Board |