# Spesifikasi Kebutuhan: Console Layout & Icon-Only Collapsible Sidebar

## 1. Ringkasan Fitur
Spesifikasi ini mengatur perilaku komponen layout utama `ConsoleLayout.tsx` dalam menangani navigasi sidebar yang dapat dikuncupkan (*collapsible*) menjadi mode ikon (*Icon-Only Mode*) lengkap dengan *Tooltip* interaktif di setiap menu.

## 2. Kebutuhan Fungsional & UI/UX

### 2.1 Perilaku Sidebar Navigation
1. **Mode Terbuka (*Expanded Mode*):**
   - Lebar sidebar: `w-64` (256px).
   - Menampilkan label kategori *"Console Modules"*, ikon menu, teks nama menu, dan badge indikator aktif.
2. **Mode Kuncup (*Collapsed Mode*):**
   - Lebar sidebar: `w-16` (64px).
   - Menyembunyikan label kategori dan teks nama menu.
   - Menampilkan ikon menu di tengah (*centered*) dengan padding teratur.
3. **Efek Transisi:**
   - Animasi perubahan lebar menggunakan `transition-all duration-300 ease-in-out`.

### 2.2 Tooltip Interaktif
1. Membungkus setiap item menu dengan komponen `<Tooltip>` Radix UI.
2. Tooltip hanya aktif/ditampilkan saat sidebar berada dalam mode *Collapsed*.
3. Posisi tooltip berada di sebelah kanan ikon (`side="right"`) dengan animasi *fade-in/zoom-in*.

### 2.3 Topbar Toggle Button
1. Tombol toggle di topbar menggunakan ikon `PanelLeftClose` (saat sidebar terbuka) dan `PanelLeftOpen` (saat sidebar kuncup).
2. Dilengkapi dengan tooltip petunjuk *"Collapse Sidebar"* atau *"Expand Sidebar"*.
