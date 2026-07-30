# SAKAAI Reasoning Engine Specification

**Document ID:** ENG004  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Engineering Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Dokumen ini mendefinisikan spesifikasi teknis dan rekayasa untuk **SAKAAI Reasoning Engine**.

Reasoning Engine bertindak sebagai otak analitis SAKAAI. Engine ini menerima *assembled context* dari Context Engine, memformulasikan perintah penalaran terstruktur (*Chain-of-Thought* / CoT), berinteraksi dengan LLM Provider melalui lapisan abstraksi terpadu, serta memvalidasi struktur output sebelum diproses oleh Orchestrator atau Tool Registry.

```
[Context Package] --> [Prompt Synthesizer] --> [LLM Provider] --> [Reasoning Validator] --> [Action Intent]
```

---

# 2. Purpose

SAKAAI Reasoning Engine Specification bertujuan untuk:

- Menjamin proses penalaran SAKAAI berlangsung secara terstruktur, konsisten, dan dapat diaudit.
- Mengabstraksikan antarmuka LLM Provider (Gemini, Claude, GPT, atau model lokal) dari modul inti SAKAAI.
- Menjamin kepatuhan terhadap prinsip *Structured Output* dan *Action Intent Verification*.
- Mengelola penanganan instruksi yang mengalami penolakan (*refusal handling*) atau kegagalan sintaks.

---

# 3. Reasoning Engine Philosophy

Reasoning Engine memegang teguh prinsip:

```
Reasoning Precedes Action
```

1. **Explicit Intent Formulation**: Setiap tindakan sistem harus didahului oleh langkah penalaran yang tercatat eksplisit.
2. **Model Agnostic Abstraction**: Logika penalaran tidak boleh tergantung pada format vendor LLM tertentu.
3. **Strict Validation Barrier**: Output LLM dianggap sebagai masukan mentah (*untrusted raw input*) hingga lolos verifikasi skema.

---

# 4. Reasoning Engine Subsystems Architecture

```
                 +--------------------------+
                 |    Prompt Synthesizer    |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 |   LLM Gateway Adapter    |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 |  Thought Trace Evaluator |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 | Output Schema Validator  |
                 +--------------------------+
```

## 4.1 Prompt Synthesizer
Menggabungkan panduan sistem (*system instruction*), aturan tata kelola (`00-GOVERNANCE`), dan payload konteks menjadi format prompt optimum.

## 4.2 LLM Gateway Adapter
Lapisan abstraksi komunikasi HTTP/gRPC yang menangani autentikasi, streaming response, retry logic, serta pemantauan latensi token/detik.

## 4.3 Thought Trace Evaluator
Memverifikasi bahwa model melakukan proses langkah pemikiran (*thought process*) sebelum memutuskan untuk memanggil tool atau menghentikan turn.

## 4.4 Output Schema Validator
Memastikan bahwa format output yang dihasilkan (misalnya JSON Tool Call atau Markdown Report) sesuai dengan kontrak skema target.

---

# 5. Data Structures & Contracts

## 5.1 Reasoning Request Specification

```json
{
  "reasoning_id": "RSN-88120",
  "context_package_id": "CTX-PKG-9921",
  "model_target": "gemini-3.6-flash",
  "temperature": 0.2,
  "required_output_format": "JSON_TOOL_CALL",
  "max_thinking_tokens": 8192
}
```

## 5.2 Reasoning Output Payload

```json
{
  "reasoning_id": "RSN-88120",
  "thought_chain": [
    "Identifikasi berkas draft pada 10-ENGINEERING-SPECIFICATION.",
    "Draft terdiri dari 9 berkas berukuran 0 byte.",
    "Susun spesifikasi teknis lengkap untuk setiap berkas sesuai dengan UUD001."
  ],
  "decision_action": "EXECUTE_TOOL",
  "tool_calls": [
    {
      "name": "write_to_file",
      "arguments": {
        "TargetFile": "10-ENGINEERING-SPECIFICATION/004-REASONING-ENGINE-SPECIFICATION.md"
      }
    }
  ],
  "status": "VALIDATED"
}
```

---

# 6. Refusal, Retry & Fallback Protocol

1. **Schema Validation Failure**: Jika output LLM tidak valid secara sintaksis, Reasoning Engine akan mengirimkan *correction prompt* hingga maksimum 3x percobaan.
2. **Provider Rate-Limit/Timeout**: Otomatis melakukan *failover* ke model sekunder sesuai hirarki kebijakan konfigurasi.
3. **Safety Refusal**: Jika provider memberikan respon *safety block*, Reasoning Engine memetakan alasan penolakan dan mencatatnya ke dalam Audit Log.

---

# 7. Verification & Compliance Standards

1. **Traceability**: Setiap *thought chain* wajib direkam dan dihubungkan ke ID sesi aktif.
2. **Zero Schema Mutation**: Parsing output harus strictly enforce skema tanpa berasumsi tipe data secara implisit.
