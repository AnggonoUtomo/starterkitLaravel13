# SAKAAI Constitution: Execution Pipeline Specification

**Document ID:** CON002  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Constitution  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Pipeline Constitution

Dokumen konstitusi ini menetapkan **Spesifikasi Pipeline Eksekusi (Execution Pipeline)** mutlak yang mengendalikan seluruh aliran pekerjaan dari penerimaan input awal hingga verifikasi akhir pada ekosistem SAKAAI.

Dalam SAKAAI, eksekusi bukanlah proses ad-hoc yang terjadi secara acak. Seluruh aktivitas pemrosesan wajib melewati 6 fase pipeline linier yang terproteksi oleh *Quality Gates*. Deviasi atau penyimpangan dari urutan fase ini dikategorikan sebagai pelanggaran arsitektur (*Architecture Violation*).

```
+-----------------------------------------------------------------------------------+
|                           SAKAAI CONSTITUTIONAL PIPELINE                            |
|                                                                                   |
|  +---------+   +---------+   +---------+   +-----------+   +--------+   +-------+ |
|  | Phase 1 |-->| Phase 2 |-->| Phase 3 |-->|  Phase 4  |-->|Phase 5 |-->|Phase 6| |
|  | Context |   | Reason  |   | Plan    |   | Execution |   | Verify |   | Audit | |
|  +---------+   +---------+   +---------+   +-----------+   +--------+   +-------+ |
+-----------------------------------------------------------------------------------+
```

---

# 2. Constitutional Pipeline Phases

## Phase 1: Context Assembly & Validation Phase
- **Deskripsi**: Context Engine mengumpulkan seluruh berkas proyek yang relevan, status memori aktif, serta batasan aturan ke dalam payload terpotong (*pruned context payload*).
- **Mandatori Gate**: Total token tidak boleh melebihi kuota jendela konteks terpilih. Memeriksa ketersediaan dokumen spesifikasi pendukung.

## Phase 2: Intent & Reasoning Formulation Phase
- **Deskripsi**: Reasoning Engine memproses payload konteks dan memformulasikan *Thought Trace* eksplisit yang menjelaskan akar masalah, opsi solusi, dan pilihan strategi.
- **Mandatori Gate**: Dilarang langsung menghasilkan panggatan tool sebelum *Thought Trace* terbukti sah secara skema.

## Phase 3: Planning & Safety Evaluation Phase
- **Deskripsi**: Orchestrator menyusun rencana langkah kerja (DAG Plan atau *Implementation Plan*) serta mengevaluasi tingkat risiko terhadap *Control Policy* (`GOV003`).
- **Mandatori Gate**: Jika tindakan tergolong `ELEVATED_SHELL` atau `CRITICAL_SYSTEM`, pipeline wajib memicu *User Confirmation Gate*.

## Phase 4: Sandboxed Task Execution Phase
- **Deskripsi**: Agent Runtime mengeksekusi instruksi kerja melalui pemanggilan tool terisolasi pada *Tool Registry Engine*.
- **Mandatori Gate**: Eksekusi dibatasi oleh batas timeout (30,000ms) dan kuota resource terenkapsulasi.

## Phase 5: Verification & Testing Phase
- **Deskripsi**: Memeriksa hasil pekerjaan secara deterministik (menjalankan unit test, linter, atau verifikasi keberadaan berkas).
- **Mandatori Gate**: Jika pengujian gagal, pipeline dilarang menandai tugas selesai dan wajib mengirimkan sinyal korektif.

## Phase 6: Memory Extraction & Audit Settlement Phase
- **Deskripsi**: Audit Engine mengunci log telemetry ke dalam *Immutable Log Store*, dan Memory Engine mencatat pembelajaran proyek ke dalam *Long-Term Memory*.
- **Mandatori Gate**: Menghasilkan hash cryptographic valid yang mengaitkan eksekusi dengan state proyek terkini.

---

# 3. Phase Handover Contracts

Tabel berikut mendefinisikan DTO kontrak perpindahan antar-fase:

| Transisi Fase | Data Payload DTO | Syarat Kelolosan Handover |
| :--- | :--- | :--- |
| **Phase 1 -> 2** | `AssembledContextPackage` | `status == VALIDATED`, Token count within budget |
| **Phase 2 -> 3** | `ReasoningIntentDTO` | `thought_trace` contains clear strategy & justification |
| **Phase 3 -> 4** | `ApprovedExecutionDAG` | All safety approvals & user confirmations granted |
| **Phase 4 -> 5** | `RawExecutionResultDTO` | Tool outputs collected without unhandled panic |
| **Phase 5 -> 6** | `VerifiedOutcomeReport` | Automated test suite passes 100% |

---

# 4. Emergency Pipeline Interruption & Rollback

Jika pada salah satu fase terjadi pengecualian fatal (*unhandled exception* atau *policy block*):

1. **Pipeline Halt**: Orchestrator memutus eksekusi fase aktif secara seketika.
2. **State Reversion**: Agent Runtime membatalkan perubahan berkas yang belum di-commit (*uncommitted diff revert*).
3. **Audit Notification**: Telemetry mencatat event `PIPELINE_INTERRUPTED_EMERGENCY`.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready SAKAAI Execution Pipeline Constitution | Governance Board |