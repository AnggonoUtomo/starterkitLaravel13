# SAKAAI Specification: Document Selection Rules

**Document ID:** CTX001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Context Management  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Overview

Dokumen ini mendefinisikan **Aturan Seleksi Dokumen Konteks (Document Selection Rule)** yang mengatur filter kelayakan, pemeringkatan hierarki, dan kriteria inklusi berkas ke dalam jendela konteks SAKAAI.

```
[Raw Project Repository] ---> [Authority & Freshness Filter] ---> [Relevance Ranker] ---> [Selected Context Documents]
```

---

# 2. Document Selection Criteria

Context Engine memilih dokumen berdasarkan 4 kriteria utama:

## 2.1 Relevance Score Criteria
- Dokumen harus memiliki relevansi langsung dengan tujuan tugas aktif (skor similarity > 0.80 atau jalur berkas yang disebutkan secara eksplisit dalam prompt).

## 2.2 Authority & Hierarchy Criteria
- Tingkat keabsahan dokumen diurutkan dari yang tertinggi hingga terendah:

```
Layer 0 Governance/Constitution > Layer 1 Specification > Active Project State > Archived Logs
```

## 2.3 Freshness & Recency Criteria
- Dokumen dengan versi terbaru (`Version: 1.0` aktif) lebih diutamakan daripada dokumen historis yang ditandai `DEPRECATED`.

## 2.4 Exclusion Filter
- Seluruh biner build, dependency (`node_modules/`, `vendor/`), file sementara, dan file yang melebihi batas ukuran 1MB secara otomatis dikecualikan dari pemilihan langsung.

---

# 3. Document Selection Algorithm

```python
def select_documents(repo_files, task_query, max_token_budget):
    selected_docs = []
    current_tokens = 0
    
    # 1. Filter out ignored patterns
    filtered_files = [f for f in repo_files if not is_ignored(f)]
    
    # 2. Sort by Authority and Relevance Score
    ranked_files = sort_by_relevance_and_authority(filtered_files, task_query)
    
    # 3. Accumulate within Token Budget
    for doc in ranked_files:
        doc_tokens = estimate_tokens(doc)
        if current_tokens + doc_tokens <= max_token_budget:
            selected_docs.append(doc)
            current_tokens += doc_tokens
            
    return selected_docs
```

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready Document Selection Rule Specification | Governance Board |