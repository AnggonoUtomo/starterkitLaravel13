# SAKAAI Specification: Reasoning Evaluation & Benchmarking

**Document ID:** TST001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Testing & Evaluation  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Overview

Dokumen ini mendefinisikan **Spesifikasi Evaluasi Penalaran dan Benchmark (Reasoning Evaluation Specification)** yang mengendalikan pengujian otomatis terhadap performa penalaran LLM, akurasi pemanggilan tool, kepatuhan skema, serta konsistensi logika SAKAAI pada skala produksi.

```
[Reasoning Task] ---> [Evaluator Pipeline] ---> [Golden Dataset Comparison] ---> [Accuracy & Compliance Score]
```

---

# 2. Evaluation Dimensions

Pengujian penalaran SAKAAI dievaluasi berdasarkan 4 dimensi utama:

## 2.1 Schema Compliance Score (SCS)
- Mengukur persentase output LLM yang mematuhi skema JSON/Markdown tanpa membutuhkan retry perbaikan sintaks. Target produksi: `> 98%`.

## 2.2 Tool Selection Precision (TSP)
- Mengukur ketepatan pemilihan tool oleh Reasoning Engine berdasarkan tugas yang diberikan. Target produksi: `> 95%`.

## 2.3 Context Density Ratio (CDR)
- Mengukur efisiensi penggunaan token konteks terhadap hasil penalaran yang relevan. Target produksi: `> 0.85`.

## 2.4 Hallucination Index (HI)
- Mengukur tingkat munculnya entitas, path berkas, atau parameter fiktif yang tidak ada dalam konteks. Target produksi: `< 1%`.

---

# 3. Golden Benchmark Dataset Schema

```json
{
  "benchmark_id": "BENCH-2026-001",
  "task_description": "Tambahkan logging telemetry pada Context Engine",
  "expected_tool_calls": [
    {
      "tool_name": "view_file",
      "target_file_pattern": "03-CONTEXT/002-CONTEXT-ASSEMBLY.md"
    },
    {
      "tool_name": "replace_file_content",
      "target_file_pattern": "03-CONTEXT/002-CONTEXT-ASSEMBLY.md"
    }
  ],
  "passing_criteria": {
    "min_schema_score": 1.0,
    "max_allowed_retries": 0
  }
}
```

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready Reasoning Evaluation Specification | Governance Board |
