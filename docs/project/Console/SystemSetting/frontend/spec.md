# Spesifikasi Frontend - Submodul SystemSetting

## Ringkasan
Struktur UI terpisah (*submodule frontend modularization*) untuk pengolahan setting sistem dengan split view (Menu Sidebar Kanan/Kiri + 10 Panel Form Konfigurasi).

## Standar UX & Form
- Setiap label wajib diisi menyertakan tanda asterik merah (`*`).
- Setiap label menyertakan ikon `HelpCircle` (size-3.5) dengan tooltip informasi penggunaan.
- Setiap tombol aksi interaktif dibungkus dengan Tooltip.
- Menggunakan Tailwind v4 clean utility classes (`enabled:cursor-pointer disabled:cursor-not-allowed`).
