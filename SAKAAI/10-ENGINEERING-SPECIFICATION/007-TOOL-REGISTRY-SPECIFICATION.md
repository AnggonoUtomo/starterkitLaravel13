# SAKAAI Tool Registry Specification

**Document ID:** ENG007  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Engineering Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Dokumen ini mendefinisikan spesifikasi teknis dan rekayasa untuk **SAKAAI Tool Registry Engine**.

Tool Registry mengelola pendaftaran dinamis (*dynamic registration*), pengikatan skema (*schema binding*), validasi argumen, pembatasan hak akses (*permission governance*), dan eksekusi aman (*sandboxed execution*) dari seluruh tool yang tersedia di ekosistem SAKAAI.

```
[Reasoning Engine Intent] --> [Tool Registry Gate] --> [Permission Check] --> [Sandbox Execution] --> [Standardized Tool Result]
```

---

# 2. Purpose

SAKAAI Tool Registry Specification bertujuan untuk:

- Menyediakan antarmuka pendaftaran tool terstandar (built-in, custom, maupun extension tool).
- Mencegah eksekusi tool berisiko tinggi tanpa persetujuan eksplisit.
- Menjamin validasi skema parameter input sebelum pemanggilan dilakukan.
- Mengabstraksi implementasi tool dari Reasoning Engine.

---

# 3. Tool Registry Philosophy

Tool Registry beroperasi dengan prinsip:

```
No Tool Execution Without Permission & Schema Validation
```

1. **Strict Type Safety**: Parameter tool harus divalidasi terhadap skema JSON Schema yang ditentukan.
2. **Least Privilege Enforcement**: Agen hanya dapat memanggil tool yang secara eksplisit diberikan izin akses padanya.
3. **Execution Isolation**: Pemanggilan tool (seperti perintah shell atau operasi file I/O) harus terisolasi untuk mencegah dampak samping yang tidak diinginkan (*unintended side-effects*).

---

# 4. Tool Registry Subsystems Architecture

```
                 +--------------------------+
                 |  Tool Catalog Manager    |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 | Input Schema Validator   |
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 | Permission Enforcer Guard|
                 +------------+-------------+
                              |
                              v
                 +--------------------------+
                 | Tool Execution Sandbox   |
                 +--------------------------+
```

## 4.1 Tool Catalog Manager
Menyimpan registri terpusat dari seluruh fungsi tool, dokumen instruksi, dan spesifikasi parameternya.

## 4.2 Input Schema Validator
Memeriksa ketepatan nama argument, tipe data, serta nilai *required fields* terhadap deklarasi JSON Schema.

## 4.3 Permission Enforcer Guard
Memverifikasi apakah agen yang meminta pemanggilan tool memiliki hak akses sah sesuai kebijakan governance (`00-GOVERNANCE/003-CONTROL-POLICY.md`).

## 4.4 Tool Execution Sandbox
Menjalankan fungsi tool dalam konteks terisolasi dengan penangan batas waktu eksekusi (*timeout boundary*).

---

# 5. Data Structures & Contracts

## 5.1 Tool Declaration Schema

```json
{
  "tool_name": "view_file",
  "category": "FILE_SYSTEM",
  "description": "Melihat konten berkas dari sistem lokal.",
  "required_permission_level": "READ_ONLY",
  "parameters": {
    "type": "object",
    "properties": {
      "AbsolutePath": {
        "type": "string",
        "description": "Jalur absolut menuju berkas target."
      },
      "StartLine": { "type": "integer" },
      "EndLine": { "type": "integer" }
    },
    "required": ["AbsolutePath"]
  }
}
```

## 5.2 Tool Execution Result Payload

```json
{
  "execution_id": "TOOL-EXEC-8891",
  "tool_name": "view_file",
  "status": "SUCCESS",
  "execution_time_ms": 12,
  "output": {
    "total_lines": 420,
    "content": "..."
  },
  "error": null
}
```

---

# 6. Privilege Levels & Security Boundaries

Setiap tool diklasifikasikan ke dalam 4 tingkatan hak akses:

1. **`READ_ONLY`**: Membaca file, membaca status system (TIDAK memerlukan konfirmasi khusus).
2. **`MUTATING_SAFE`**: Membuat berkas baru atau mengubah berkas dalam repositori lokal yang terkontrol.
3. **`ELEVATED_SHELL`**: Mengesekusi perintah terminal atau instalasi paket (Memerlukan persetujuan pengguna/governance policy).
4. **`CRITICAL_SYSTEM`**: Perubahan konfigurasi kernel atau operasi penghapusan massal.

---

# 7. Verification & Compliance Standards

1. **Zero Unvalidated Argument Execution**: Pemanggilan tool dengan argumen yang gagal validasi skema wajib ditolak sebelum eksekusi.
2. **Timeout Guarantee**: Tool yang tidak selesai dalam jangka waktu batas (`default 30.000ms`) akan di-terminate secara paksa dengan respon `TOOL_TIMEOUT_ERROR`.
