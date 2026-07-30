# SAKAAI Specification: RAG & Indexing Standard

**Document ID:** SPC003  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Overview

Dokumen ini mendefinisikan **Spesifikasi Retrieval-Augmented Generation (RAG) dan Indeksasi Pengetahuan** yang mengatur pencacahan berkas (_chunking_), ekstraksi _embeddings_, perhitungan skor kemiripan semantik (_semantic similarity scoring_), serta pemanggilan kembali memori (_memory retrieval_) di SAKAAI.

```
[Raw Markdown / Source Code] ---> [Chunking Engine] ---> [Embedding Vectorizer] ---> [Vector Store & Hybrid Index]
```

---

# 2. Chunking & Indexing Strategy

1. **Document Chunking Strategy**: Dokumen dikonversi menjadi potongan-potongan terstruktur berbasis header markdown (`H1`, `H2`, `H3`) dengan batas token per chunk: `512 - 1024 tokens` dan overlap `10%`.
2. **Code Chunking Strategy**: Berkas kode program dipotong berdasarkan unit fungsional (_AST Code Chunking_: fungsi, kelas, atau modul antarmuka).
3. **Hybrid Search Pipeline**: Menggabungkan pencarian berbasis keyword ripgrep/BM25 dengan pencarian vektor semantik (Dense Vector Similarity) untuk mencapai presisi tinggi (_high precision & recall_).

---

# 3. Vector Score Threshold & Ranking Matrix

| Kategori Query                 | Minimum Similarity Score | Top-K Limit | Fallback Action                  |
| :----------------------------- | :----------------------: | :---------: | :------------------------------- |
| **Architecture / Spec Search** |          `0.85`          |  3 Chunks   | Fallback to Keyword Exact Match  |
| **Code Function Reference**    |          `0.80`          |  5 Chunks   | Include Enclosing Module Context |
| **General Project History**    |          `0.75`          |  10 Chunks  | Summarize Historical Log         |

---

# 4. Storage & Persistence Protocol

1. **Local Vector Index**: Indeks vektor disimpan pada lokasi lokal terenkripsi di bawah direktori `.gemini/` atau memori terisolasi.
2. **Index Invalidation Trigger**: Setiap ada perubahan berkas pada git commit baru, _RAG Indexing Engine_ memicu kalkulasi ulang inkremental (_incremental index refresh_) untuk berkas yang termodifikasi.

---

# Revision History

| Version | Date       | Description                                   | Author           |
| :------ | :--------- | :-------------------------------------------- | :--------------- |
| 1.0     | 2026-07-25 | Production-ready RAG & Indexing Specification | Governance Board |
