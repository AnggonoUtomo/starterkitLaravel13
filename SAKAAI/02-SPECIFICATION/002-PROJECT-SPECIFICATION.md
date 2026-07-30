# SAKAAI Specification: Project Workspace Standard

**Document ID:** SPC002  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Workspace Structure

Dokumen ini mendefinisikan **Spesifikasi Struktur Proyek dan Workspace (Project Specification)** yang mengatur tata letak direktori, konvensi penamaan berkas, batas repositori, serta aturan pengorganisasian dokumen di seluruh ekosistem SAKAAI.

SAKAAI mewajibkan struktur direktori yang deterministik dan terprediksi agar agen kecerdasan buatan, engine indeksasi RAG, dan sistem verifikasi otomatis dapat menemukan informasi tanpa perlu melakukan pencarian spasial yang mahal.

```
SAKAAI-PROJECT-ROOT/
├── 00-GOVERNANCE/                 # Governance Rules & Policy (GOV001..003)
├── 01-CONSTITUTION/               # System Constitution & Pillars (CON001..004)
├── 02-SPECIFICATION/              # Operational Specifications (SPC001..007)
├── 03-CONTEXT/                    # Context Assembly & Selection Rules (CTX001..003)
├── 04-WORKFLOW/                   # Execution Lifecycle & Error Specs (WFK001..003)
├── 05-DECISION-MANAGEMENT/        # Decision, Review & Action Records (DEC/REV/COR)
├── 06-PROJECT-STATE/              # Real-time Context, Memory & History (STATE001..003)
├── 07-EXTENSION/                  # Agent, Plugin & Tool Extensions (EXT001..003)
├── 08-AUDIT/                      # Compliance Checks & Execution Logs (AUD001..003)
├── 09-IMPLEMENTATION/             # System Architecture & Runtime Models (IMP001..008)
└── 10-ENGINEERING-SPECIFICATION/  # Deep Engineering Engine Specs (ENG001..009)
```

---

# 2. File Naming & Numbering Standard

Seluruh berkas dokumen spesifikasi dalam SAKAAI wajib mengikuti konvensi penamaan baku:

`[PREFIX_NUMBER]-[UPPERCASE-SLUG-NAME].md`

1. **Prefix Number**: Terdiri dari 3 digit angka sekuensial (misal: `001`, `002`).
2. **Slug Name**: Ditulis menggunakan huruf kapital (*UPPERCASE*) yang dipisahkan oleh tanda hubung (*hyphen* `-`).
3. **Ekstensi**: Wajib ber-ekstensi `.md` untuk berkas markdown atau `.json` untuk skema data.

---

# 3. Path Linking & Markdown Protocol

1. **Absolute URI Format**: Seluruh tautan antar-berkas di dalam dokumen markdown wajib menggunakan URL scheme `file://` dengan path lengkap atau relatif terverifikasi.
2. **Symbol Line Anchor**: Tautan menuju definisi kelas atau baris kode spesifik wajib menyertakan anchor `#L[LINE_NUMBER]` (misal: `[CoreEngine](../10-ENGINEERING-SPECIFICATION/001-SAKAAI-CORE-SPECIFICATION.md#L45)`).

---

# 4. Workspace Boundary Constraints

1. **Restricted Paths**: Agen dilarang membuat atau mengubah berkas di luar *Workspace Root* tanpa konfirmasi eksplisit dari pengguna.
2. **Ignored Directories**: Direktori sementara (`tmp/`, `.git/`, `node_modules/`, `vendor/`) secara otomatis dikecualikan dari indeksasi RAG dan *Context Assembly*.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready Project Workspace Specification | Governance Board |