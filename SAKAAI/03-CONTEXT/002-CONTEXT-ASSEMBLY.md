# SAKAAI Specification: Context Assembly & Pruning

**Document ID:** CTX002  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Context Management  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Overview

Dokumen ini mendefinisikan **Spesifikasi Penyusunan dan Pemotongan Konteks (Context Assembly & Pruning)** yang mengontrol sintesis dokumen, pembagian alokasi token dinamis, serta mekanisme pemangkasan konteks di SAKAAI.

---

# 2. Token Budget Allocation Matrix

Alokasi total token jendela konteks (`128,000 tokens`) dibagi secara ketat menjadi 4 segmen:

| Segmen Konteks | Kuota Token | Persentase | Strategi Pruning Jika Overflow |
| :--- | :---: | :---: | :--- |
| **System Rules & Core Prompt** | 25,600 | 20% | Lock Mandatory (Tidak Boleh Dipotong) |
| **Project State & Active Memory** | 32,000 | 25% | Meringkas Riwayat State Terlama |
| **Source Code & Project Files** | 51,200 | 40% | Pemotongan Bagian Tengah File (*Middle Truncation*) |
| **User Input & Turn History** | 19,200 | 15% | Meringkas Perbincangan Turn Lama |

---

# 3. Context Pruning Protocol

Jika total estimasi token dari dokumen terpilih melebihi kuota:

1. **Pass 1 (Comment & Whitespace Stripping)**: Menghapus baris kosong berulang dan komentar non-esensial dari berkas kode.
2. **Pass 2 (AST Function Truncation)**: Memotong isi badan fungsi non-target dan menyisakan tanda tangan fungsi (*function signature*).
3. **Pass 3 (Warning Emission)**: Context Engine menerbitkan peringatan `CONTEXT_PRUNED_ALERT` pada payload metadata.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready Context Assembly Specification | Governance Board |