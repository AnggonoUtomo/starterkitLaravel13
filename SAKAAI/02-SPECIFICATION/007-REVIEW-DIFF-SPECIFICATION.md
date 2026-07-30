# SAKAAI Specification: Review & Diff Standard

**Document ID:** SPC007  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Specification  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Overview

Dokumen ini mendefinisikan **Spesifikasi Peninjauan Diff dan Perubahan Kode (Review & Diff Specification)** yang mengatur analisis perubahan, verifikasi patch, serta standar pelaporan diff pada SAKAAI.

---

# 2. Diff Analysis & Verification Protocol

1. **Unified Diff Format**: Seluruh perubahan berkas wajib dipresentasikan menggunakan format unified diff standar dengan penanda penambahan (`+`) dan pengurangan (`-`).
2. **Context Window Scope**: Sebelum menyetujui diff, System Auditor wajib memeriksa 5 baris konteks sebelum dan sesudah potongan kode yang diubah untuk menjamin integritas sintaks.
3. **No Unintended Side Effects**: Diff tidak boleh mengubah baris kode di luar ruang lingkup perbaikan yang disetujui.

---

# 3. Code Review Checklist

- [x] Kode terbebas dari kesalahan tipe data dan variabel yang tak terdefinisi.
- [x] Fungsi yang diubah tidak memutus kontrak panggilan pada file terkait (*invocation sites verified*).
- [x] Perubahan terbukti tidak menyebabkan efek samping destruktif pada sistem.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready Review & Diff Specification | Governance Board |