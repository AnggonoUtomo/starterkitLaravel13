# Workspace Agent Rules — SAKAAI Mandatory Compliance

> [!CRITICAL]
> **ATURAN MUTLAK PERMANEN WORKSPACE**:
> 1. **SAKAAI Governance Single Source of Truth**: Seluruh pekerjaan rekayasa perangkat lunak, perancangan, penulisan kode, refactoring, dan pengujian pada repositori ini WAJIB 100% beracuan pada konstitusi, spesifikasi, dan standar **SAKAAI** (`GOV000`, `LAR001`, `SPC006`, `GOV003`).
> 2. **Dilarang Script/Command Liar**: Tidak boleh mengeksekusi script custom tanpa persetujuan atau di luar alur kerja SAKAAI.
> 3. **Disiplin DDD-Lite Modular**: Seluruh file PHP WAJIB `declare(strict_types=1);`, entity di `Domain/Entities/`, event di `Domain/Events/`, controller tipis (< 50 baris), dan class berdisiplin `final class`.
> 4. **No Placeholder (`// TODO`)**: Dilarang menyisakan placeholder atau menghapus komentar eksisting.
> 5. **Automated Verification**: Setiap perubahan wajib diverifikasi dengan `php artisan test` atau `node cli/sakaai.js validate`.
> 6. **SAKAAI Skills Mandatory Activation**: Seluruh 25 SAKAAI Agent Skills (`SAKAAI/.agents/skills.json`) wajib digunakan sesuai kebutuhan tugas (seperti `spec-driven-development`, `test-driven-development`, `incremental-implementation`, `code-review-and-quality`, `context-engineering`, `security-and-hardening`, `using-agent-skills`, dll).
