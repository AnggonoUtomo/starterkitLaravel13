# SAKAAI Memory Engine Specification

**Document ID:** ENG003  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Engineering Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Dokumen ini mendefinisikan spesifikasi teknis dan rekayasa untuk **SAKAAI Memory Engine**.

Memory Engine mengelola penyediaan, pencatatan, indeksasi, serta pemanggilan kembali (*retrieval*) seluruh data memori dalam ekosistem SAKAAI. Memori dibagi menjadi 3 lapisan: **Working Memory**, **Short-Term Session Memory**, dan **Long-Term Project Memory**.

Dalam arsitektur SAKAAI:

```
+-----------------------------------------------------------+
|                      SAKAAI Memory Engine                   |
| +----------------+   +-------------------+   +----------+ |
| | Working Memory |   | Short-Term Session|   | Long-Term| |
| | (In-RAM State) |   | (Task Context)    |   | (Vector) | |
| +----------------+   +-------------------+   +----------+ |
+-----------------------------------------------------------+
```

---

# 2. Purpose

SAKAAI Memory Engine Specification bertujuan untuk:

- Menjamin kontinuitas konteks antar eksekusi dan sesi kerja.
- Menyediakan struktur penyimpanan pengetahuan terindeks untuk pemanggilan berbasis sintaksis dan semantik.
- Mencegah hilangnya pembelajaran proyek (*project intelligence loss*).
- Menjamin privasi dan integritas data memori melalui kontrol enkripsi dan hash integrity.

---

# 3. Memory Engine Philosophy

Memory Engine didasarkan pada prinsip:

```
State Is Transient, Knowledge Is Permanent
```

1. **Structured Memory Extraction**: Setiap hasil pekerjaan atau keputusan harus diekstraksi menjadi potongan pengetahuan terstruktur.
2. **Fast Retrieval SLA**: Pemanggilan memori kerja harus memiliki latensi < 10ms, sedangkan query memori jangka panjang < 100ms.
3. **Decay & Relevance Management**: Memori non-kritis secara bertahap diarsipkan untuk menjaga kebersihan indeks.

---

# 4. Subsystems Architecture

```
                 +--------------------------+
                 |    Memory Request Gate   |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 | Indexing & Embedding Engine|
                 +------------+-------------+
                              |
            +-----------------+-----------------+
            |                                   |
            v                                   v
+-----------------------+           +-----------------------+
|  Active State Cache   |           | Persistent Store (DB) |
+-----------------------+           +-----------------------+
```

## 4.1 Working Memory Engine
Menyimpan variabel aktif, state machine temporary, dan cursor location yang diperbarui secara *real-time*.

## 4.2 Short-Term Session Engine
Menyimpan riwayat turn perbincangan, tool call output, dan log sementara per task execution.

## 4.3 Long-Term Project Memory Engine
Menyimpan dokumen keputusan (`05-DECISION-MANAGEMENT`), state history (`06-PROJECT-STATE`), dan knowledge items yang diindeks secara eksplisit.

---

# 5. Storage Schemas & Data Structures

## 5.1 Memory Record Schema

```json
{
  "memory_id": "MEM-99238-A",
  "category": "PROJECT_DECISION",
  "scope": "GLOBAL",
  "content": "SAKAAI Core Engine menggunakan pattern Event Bus terpusat untuk memisahkan logika kernel dari tool execution.",
  "tags": ["architecture", "core", "event-bus"],
  "embedding_vector_id": "VEC-109283",
  "created_at": "2026-07-25T23:51:30Z",
  "access_count": 42
}
```

## 5.2 Retrieval Query Contract

```json
{
  "query_id": "MEM-QRY-004",
  "search_text": "Bagaimana arsitektur event bus di SAKAAI?",
  "top_k": 3,
  "min_similarity_threshold": 0.82,
  "filter_categories": ["PROJECT_DECISION", "SPECIFICATION"]
}
```

---

# 6. Retention, Compression & Persistence Policy

1. **Flush Cycle**: Working Memory di-flush ke Short-Term Session Store setiap kali sebuah task selesai.
2. **Archival Cycle**: Pengetahuan dengan skor relevansi tinggi otomatis diindeks ke dalam Long-Term Memory melalui *Knowledge Extraction Handler*.
3. **Purge Protocol**: Memori ephemeral yang tidak diakses selama 30 hari akan dipindahkan ke arsip dingin (*cold storage*).

---

# 7. Verification & Compliance Standard

1. **Zero Memory Corruption**: Setiap entri memori dilindungi checksum SHA-256 untuk memverifikasi keabsahan konten saat dipanggil.
2. **Determinism Test**: Query dengan parameter sama pada indeks yang tidak berubah harus mengembalikan urutan hasil memori yang identik.
