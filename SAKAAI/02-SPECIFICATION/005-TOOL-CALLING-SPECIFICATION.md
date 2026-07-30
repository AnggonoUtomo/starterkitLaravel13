# SAKAAI Specification: Tool Calling Standard

**Document ID:** SPC005  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Overview

Dokumen ini mendefinisikan **Spesifikasi Pemanggilan Tool (Tool Calling Specification)** yang mengendalikan format sintaksis, pengikatan argumen (*argument binding*), validasi tipe data, serta penerimaan respon tool di dalam SAKAAI.

---

# 2. Tool Invocation Syntax & Contract

Seluruh pemanggilan tool oleh LLM wajib mengikuti format payload terstruktur JSON Schema:

```json
{
  "tool_call_id": "TC-889120",
  "tool_name": "replace_file_content",
  "arguments": {
    "TargetFile": "e:/AI-OS/02-SPECIFICATION/005-TOOL-CALLING-SPECIFICATION.md",
    "StartLine": 1,
    "EndLine": 50,
    "TargetContent": "...",
    "ReplacementContent": "..."
  }
}
```

---

# 3. Execution Rules & Validation

1. **Exact Schema Match**: Tool Registry menolak pemanggilan jika argumen wajib (*required properties*) tidak lengkap atau memiliki tipe data yang salah.
2. **Single Contiguous vs Multi-Chunk Edit**:
   - Untuk editan satu blok kontigu: Wajib menggunakan `replace_file_content`.
   - Untuk editan beberapa lokasi terpisah dalam berkas yang sama: Wajib menggunakan `multi_replace_file_content`.
   - Dilarang keras melakukan pemanggilan paralel berturut-turut pada berkas yang sama untuk menghindari konflik penulisan.
3. **Binary File Handling**: Berkas biner (seperti gambar `.png`, `.jpg`, `.pdf`) hanya boleh diakses melalui `view_file` tanpa parameter baris `StartLine`/`EndLine`.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready Tool Calling Specification | Governance Board |