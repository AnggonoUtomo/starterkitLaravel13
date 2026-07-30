# SAKAAI API Contract Specification

**Document ID:** ENG009  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Engineering Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Dokumen ini mendefinisikan spesifikasi teknis dan rekayasa untuk **SAKAAI API Contract Specification**.

API Contract Specification mengatur antarmuka komunikasi eksternal dan internal sistem SAKAAI. Dokumen ini mendefinisikan standar payload data, struktur wrapper request/response, penanganan error terpadu (*unified error handling*), protokol pengiriman data (*JSON REST / gRPC / WebSockets*), serta aturan versi antarmuka (*API versioning policy*).

```
[External Client / IDE / Web UI] <== (SAKAAI API Contract) ==> [SAKAAI Core Engine]
```

---

# 2. Purpose

SAKAAI API Contract Specification bertujuan untuk:

- Menjamin konsistensi antarmuka interaksi antara SAKAAI dengan pihak luar (IDE Extensions, Web Dashboards, CLI, atau sistem 3rd party).
- Memastikan tipe data dan skema validasi terdefinisi secara eksplisit.
- Menyediakan kontrak error terprediksi (*predictable error code taxonomy*).
- Menjamin stabilitas antarmuka melalui mekanisme SemVer (*Semantic Versioning*).

---

# 3. API Contract Philosophy

API Contract beroperasi berdasarkan prinsip:

```
Contracts Are Immutable Agreements
```

1. **Explicit Schemas Only**: Tidak boleh ada antarmuka yang mengembalikan tipe data yang tidak terdefinisi (*untyped wildcard / dynamic any*).
2. **Standardized Envelope**: Seluruh antarmuka menggunakan struktur wrapper standar (`success`, `data`, `error`, `metadata`).
3. **Backward Compatibility Guarantee**: Perubahan antarmuka yang memutus kompatibilitas (*breaking changes*) harus melalui proses deprecation sesuai aturan `00-GOVERNANCE`.

---

# 4. Transport Protocols Architecture

SAKAAI mendukung 3 metode pengiriman data:

1. **gRPC Protocol (High-Performance Core-to-Engine IPC)**: Digunakan untuk komunikasi internal antar subsistem kernel dengan latensi ultra-rendah.
2. **REST / HTTP JSON API**: Digunakan untuk integrasi antarmuka klien standar dan sistem pihak ketiga.
3. **WebSocket / SSE Stream**: Digunakan untuk pengiriman output streaming secara *real-time* (seperti token streaming dari Reasoning Engine atau event telemetry).

---

# 5. Standardized API Envelopes & Schemas

## 5.1 Standard Response Envelope (JSON REST)

```json
{
  "success": true,
  "status_code": 200,
  "request_id": "REQ-2026-0725-881",
  "timestamp": "2026-07-25T23:52:30Z",
  "data": {
    "execution_id": "EXEC-99120",
    "status": "COMPLETED"
  },
  "error": null,
  "metadata": {
    "processing_time_ms": 45,
    "api_version": "v1.0"
  }
}
```

## 5.2 Standard Error Envelope

```json
{
  "success": false,
  "status_code": 400,
  "request_id": "REQ-2026-0725-882",
  "timestamp": "2026-07-25T23:52:31Z",
  "data": null,
  "error": {
    "code": "ERR_TOOL_PERMISSION_DENIED",
    "message": "Subagent tidak memiliki izin untuk mengeksekusi tool ELEVATED_SHELL.",
    "details": {
      "requested_tool": "run_command",
      "required_level": "ELEVATED_SHELL",
      "granted_level": "READ_ONLY"
    }
  },
  "metadata": {
    "processing_time_ms": 4,
    "api_version": "v1.0"
  }
}
```

---

# 6. Global Error Code Taxonomy

| Kode Error | Kategori | Deskripsi |
| :--- | :--- | :--- |
| `ERR_KERNEL_NOT_READY` | Core System | SAKAAI Core dalam status Booting atau Degraded. |
| `ERR_INVALID_CONTEXT` | Context Engine | Assembled context melebihi kuota token maksimum. |
| `ERR_REASONING_TIMEOUT` | Reasoning Engine | Provider LLM tidak memberikan balasan dalam batas waktu. |
| `ERR_TOOL_NOT_FOUND` | Tool Registry | Tool yang diminta tidak terdaftar pada katalog. |
| `ERR_TOOL_PERMISSION_DENIED` | Governance | Pelanggaran kebijakan kontrol hak akses tool. |
| `ERR_AGENT_SANBOX_VIOLATION` | Agent Runtime | Agen mencoba mengakses area memori atau I/O terlarang. |
| `ERR_AUDIT_VERIFICATION_FAILED` | Audit Engine | Integritas rantai hash audit terputus atau rusak. |

---

# 7. Versioning & Backward Compatibility Policy

1. **Version Header**: Setiap request wajib menyertakan versi antarmuka pada header `X-SAKAAI-API-Version: 1.0`.
2. **Deprecation Period**: Fitur API yang akan diganti ditandai dengan header `Deprecation: true` dan dipertahankan minimal selama 6 bulan sebelum benar-benar dihapus dari runtime.

---

# 8. Verification & Compliance Standards

1. **OpenAPI 3.1 & Protobuf Compliance**: Seluruh antarmuka REST harus memiliki spesifikasi OpenAPI 3.1 yang valid, dan antarmuka gRPC harus terdefinisi dalam file `.proto`.
2. **100% Contract Test Passing**: Setiap rilis SAKAAI wajib lolos pengujian integrasi antarmuka (*contract testing*) tanpa adanya penyimpangan skema.
