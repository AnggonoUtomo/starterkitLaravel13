# SAKAAI Context Engine Specification

**Document ID:** ENG002  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Engineering Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Dokumen ini mendefinisikan spesifikasi teknis dan rekayasa untuk **SAKAAI Context Engine**.

Context Engine bertugas mengumpulkan, memfilter, menduplikasi, memprioritaskan, dan menyusun informasi relevan (*Context Assembly*) dari repositori pengetahuan, status memori, serta berkas aktif ke dalam batas jendela konteks (*Context Window Limit*) sebelum dikirimkan ke Reasoning Engine.

Dalam arsitektur SAKAAI:

```
[Raw Project State] ----> [Context Selection Rules] ----> [Token Pruning] ----> [Assembled Context Payload]
```

---

# 2. Purpose

SAKAAI Context Engine Specification bertujuan untuk:

- Menjamin bahwa hanya informasi yang paling relevan dan sah yang diberikan kepada LLM/Reasoning Engine.
- Mengoptimalkan alokasi token dan mencegah kekosongan atau *context overflow*.
- Menjalankan aturan pemeliharaan konteks sesuai `03-CONTEXT/001-DOCUMENT-SELECTION-RULE.md`.
- Menyediakan representasi konteks yang dapat dilacak (*traceable context payload*).

---

# 3. Context Engine Philosophy

Context Engine mengikuti prinsip utama:

```
Context Quality Determines Reasoning Quality
```

1. **Relevance Over Quantity**: Meminimalkan kebisingan (*noise*) dengan hanya memasukkan dokumen dan potongan kode yang berdampak langsung pada tugas.
2. **Deterministic Token Allocation**: Setiap kategori konteks memiliki batas alokasi token yang ketat.
3. **Immutability of Source Truth**: Context Engine tidak boleh merubah konten sumber asli, hanya melakukan sintesis dan penyusunan.

---

# 4. Context Engine Subsystems Architecture

```
                  +--------------------------+
                  |  Context Request Receiver|
                  +------------+-------------+
                               |
                               v
                  +--------------------------+
                  | Context Selection Engine |
                  +------------+-------------+
                               |
                               v
                  +--------------------------+
                  |  Token Budget Allocator  |
                  +------------+-------------+
                               |
                               v
                  +--------------------------+
                  |  Compressor & Assembler  |
                  +--------------------------+
```

## 4.1 Context Selection Engine
Menilai relevansi dokumen berdasar vektor kemiripan (*similarity score*), keterkaitan hirarki berkas, dan metadata tugas aktif.

## 4.2 Token Budget Allocator
Membagi kuota token menjadi beberapa divisi:
- **System Prompt & Rules**: 20%
- **Active State & Memory**: 25%
- **Source Code & Project Files**: 40%
- **User Query & History**: 15%

## 4.3 Compressor & Pruning Engine
Melakukan penghapusan baris tidak relevan, pemotongan berkas berukuran besar, dan perangkuman terstruktur jika total token melebihi kapasitas LLM.

---

# 5. Data Structures & Contracts

## 5.1 Context Request Payload

```json
{
  "request_id": "CTX-REQ-1029",
  "task_description": "Implement Context Engine Specification",
  "max_token_budget": 128000,
  "included_paths": [
    "03-CONTEXT/001-DOCUMENT-SELECTION-RULE.md",
    "06-PROJECT-STATE/active-context.md"
  ],
  "exclusion_patterns": ["node_modules/**", ".git/**"]
}
```

## 5.2 Assembled Context Output DTO

```json
{
  "context_package_id": "CTX-PKG-9921",
  "total_tokens_used": 45200,
  "sections": [
    {
      "name": "SYSTEM_INSTRUCTIONS",
      "tokens": 8500,
      "content": "You are SAKAAI Reasoning Core..."
    },
    {
      "name": "PROJECT_CONTEXT",
      "tokens": 24200,
      "content": "# Active Context..."
    },
    {
      "name": "USER_INPUT",
      "tokens": 1250,
      "content": "Selesaikan konsep dokumen 10-ENGINEERING-SPECIFICATION"
    }
  ],
  "assembly_timestamp": "2026-07-25T23:51:00Z"
}
```

---

# 6. Dynamic Windowing & Pruning Protocol

Jika estimasi token melebihi `max_token_budget`:

1. **Phase 1 (History Compression)**: Meringkas riwayat perbincangan terdahulu.
2. **Phase 2 (File Truncation)**: Memotong bagian tengah berkas non-kritis dan menyisakan deklarasi antarmuka/fungsi utama.
3. **Phase 3 (Fallback)**: Mengeluarkan peringatan `CONTEXT_TRUNCATED_WARNING` pada log audit.

---

# 7. Verification & Compliance Standard

1. **Zero Context Leakage**: Informasi rahasia atau berkas yang dikecualikan tidak boleh lolos ke dalam payload akhir.
2. **Strict Budget Compliance**: `total_tokens_used` tidak boleh melebihi `max_token_budget`.
