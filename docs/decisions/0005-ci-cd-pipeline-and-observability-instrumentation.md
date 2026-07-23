# ADR-005: Pipeline Kualitas CI/CD dan Observabilitas Sistem

## Status
Diterima (Accepted)

## Tanggal
2026-07-23

## Konteks & Masalah
Untuk mempersiapkan rilis produksi dan pengujian kualitas kode otomatis:
1. Setiap commit dan pull request wajib diuji oleh pipeline otomatis GitHub Actions CI.
2. Kesehatan sistem, status Redis, dan penggunaan memori harus dapat dipantau melalui layanan observabilitas.
3. Checklist rilis produksi harus terdokumentasi secara jelas.

## Keputusan
1. **Pipeline CI/CD GitHub Actions (`.github/workflows/ci.yml`)**:
   - Berjalan pada PHP 8.4 dan container Redis 7.
   - Quality Gates: Caching Composer/NPM, Pint Format Check, ESLint & TypeScript Check, Vite Build, dan Pest Test Suite (46+ test).
2. **Observabilitas & Kesehatan Sistem**:
   - `App\Shared\Services\ObservabilityService`: Mengukur indikator kesehatan sistem (latency Redis, status DB, alokasi memori).
   - Rute kesehatan `/up` dan `/console/system-settings`.
3. **Checklist Peluncuran Produksi (`docs/shipping-checklist.md`)**:
   - Pengecekan sebelum rilis, penanganan secret lingkungan, dan panduan deployment.

## Konsekuensi
- Tidak ada kode yang rusak lolos ke branch `main`.
- Transparansi instan terhadap kesehatan server dan konsumsi sumber daya.
- Proses peluncuran aplikasi yang terukur dan konsisten.
