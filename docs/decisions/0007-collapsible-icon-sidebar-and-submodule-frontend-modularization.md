# ADR 0007: Collapsible Icon Sidebar & Submodule Frontend Modularization

- **Status:** Approved / Implemented
- **Tanggal:** 24 Juli 2026
- **Pengambil Keputusan:** Core Engineering & Architecture Team

---

## 1. Konteks & Masalah

Seiring bertambahnya submodul pada aplikasi Console Admin, dua kebutuhan penting muncul:
1. **Navigasi Sidebar:** Mengubah perilaku tombol toggle sidebar agar saat ter-collapse, sidebar tidak hilang total dari layar, melainkan menciut menjadi mode *Icon-Only* (lebar 64px) yang dilengkapi dengan *Tooltip* interaktif di setiap ikon menu.
2. **Modularisasi Komponen Frontend:** Mencegah penumpukan seluruh kode UI dalam 1 file `Index.tsx` pada tiap submodul Inertia React. Komponen UI lokal (seperti Header, Table, Modal) harus dipisahkan ke dalam folder `components/` lokal di samping `Index.tsx` submodul tersebut.

---

## 2. Keputusan Arsitektur

1. **Navigasi Sidebar Collapsible (`ConsoleLayout.tsx`)**:
   - Menggunakan mode *Flexible Width* (`w-64` saat Expanded dan `w-16` saat Collapsed) dengan transisi CSS `transition-all duration-300 ease-in-out`.
   - Membungkus setiap ikon menu navigasi dengan komponen `<Tooltip>` Radix UI (`side="right"`) saat sidebar dalam mode ter-collapse.
   - Mengganti ikon toggle di topbar dengan `PanelLeftClose` dan `PanelLeftOpen` yang informatif.

2. **Aturan Modularisasi Frontend Submodul (`AGENTS.md` Rule 6)**:
   - Komponen UI lokal spesifik submodul wajib berada di `resources/js/pages/Console/{Submodule}/components/`.
   - File `Index.tsx` hanya bertugas menyusun state utama dan memanggil komponen submodul.
   - Shared components global tetap berada di `resources/js/components/`.

---

## 3. Konsekuensi & Manfaat

- **UX/UI Delight:** Pengguna dapat menavigasi antar modul dengan cepat tanpa kehilangan ruang kerja (*workspace area*).
- **Keterbacaan Kode (Maintainability):** File `Index.tsx` menjadi sangat ringkas (~70-120 baris), modular, dan mudah dipelihara.
- **Konsistensi:** Seluruh submodul masa depan mengikuti pola pembuatan komponen terpisah yang seragam.
