# SAKAAI Specification: Prompt Engineering Standard

**Document ID:** SPC001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Overview

Dokumen ini mendefinisikan **Spesifikasi Rekayasa Prompt (Prompt Specification)** yang mengatur penyusunan, pembentukan skema, injeksi aturan, serta pengolahan instruksi prompt di dalam SAKAAI.

Prompt dalam SAKAAI tidak dianggap sebagai sekadar teks bebas (*unstructured natural language string*), melainkan sebagai **Payload Perintah Terstruktur (Structured Command Payload)** yang harus mengikuti skema penyusunan ketat guna memaksimalkan akurasi penalaran LLM dan mencegah injeksi instruksi berbahaya (*prompt injection attack*).

```
+-----------------------------------------------------------------------+
|                     SAKAAI PROMPT STRUCTURE MODEL                       |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | SYSTEM IDENTITY & CONSTITUTIONAL RULES                          |  |
|  +-----------------------------------------------------------------+  |
|  | ACTIVE TASK OBJECTIVE & SCOPE BOUNDARIES                        |  |
|  +-----------------------------------------------------------------+  |
|  | ASSEMBLED CONTEXT & RELEVANT FILE SNIPPETS                      |  |
|  +-----------------------------------------------------------------+  |
|  | OUTPUT FORMAT CONTRACT & TOOL SCHEMAS                           |  |
|  +-----------------------------------------------------------------+  |
|  | USER QUERY & FEW-SHOT DEMONSTRATIONS                            |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

# 2. Prompt Architecture Sections

Setiap prompt yang dikirimkan oleh Reasoning Engine ke LLM Provider wajib terdiri dari 5 blok utama:

## 2.1 System Identity & Core Rules Block
- Berisi penegasan peran agen (misal: *Antigravity SAKAAI Reasoning Core*), aturan konstitusi (`01-CONSTITUTION`), dan kebijakan keselamatan (`00-GOVERNANCE/003-CONTROL-POLICY.md`).

## 2.2 Task Objective Block
- Berisi deskripsi tujuan utama pekerjaan yang spesifik, terukur, dan tidak ambigu, mencakup batasan apa yang *boleh* dan *tidak boleh* dilakukan.

## 2.3 Context Payload Block
- Berisi potongan kode, dokumen spesifikasi, dan status memori aktif yang disiapkan oleh Context Engine (`03-CONTEXT/002-CONTEXT-ASSEMBLY.md`).

## 2.4 Output Format Contract Block
- Mendefinisikan secara eksplisit skema respon yang diharapkan (seperti skema JSON Tool Call atau format laporan Markdown).

## 2.5 User Prompt & Execution History Block
- Berisi query asli pengguna serta riwayat eksekusi turn sebelumnya (*turn history*).

---

# 3. Prompt Template Schema DTO

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "SAKAAIPromptPayloadSchema",
  "type": "object",
  "properties": {
    "system_instruction": {
      "type": "string",
      "minLength": 50
    },
    "task_objective": {
      "type": "string"
    },
    "assembled_context": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "source": { "type": "string" },
          "content": { "type": "string" }
        }
      }
    },
    "response_contract": {
      "type": "string",
      "enum": ["JSON_TOOL_CALL", "STRUCTURED_MARKDOWN", "FREE_TEXT"]
    }
  },
  "required": ["system_instruction", "task_objective", "assembled_context", "response_contract"]
}
```

---

# 4. Anti-Prompt-Injection Safeguards

1. **Strict User-Data Tagging**: Seluruh masukan dari pengguna atau berkas eksternal wajib dibungkus dalam tag pembatas eksplisit (`<USER_INPUT>` dan `<UNTRUSTED_CONTENT>`).
2. **Instruction Primacy**: Aturan sistem (*System Instruction*) dikonfigurasi dengan prioritas tertinggi untuk mengabaikan perintah pengubahan instruksi dasar yang ada di dalam `<USER_INPUT>`.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready Prompt Engineering Specification | Governance Board |