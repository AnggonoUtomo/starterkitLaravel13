# Rencana Pelaksanaan: Console Layout Collapsible Sidebar

## Pendekatan Implementation Slicing

Pelaksanaan pengembangan dilakukan secara bertahap (*Incremental Slicing*) sebagai berikut:

### Slice 1: Dokumentasi & ADR (Selesai)
- [x] Membuat ADR `docs/decisions/0007-collapsible-icon-sidebar-and-submodule-frontend-modularization.md`.
- [x] Membuat dokumen spesifikasi `docs/project/Console/Layout/spec.md`.
- [x] Membuat rencana kerja `docs/project/Console/Layout/plan.md` dan checklist `todo.md`.

### Slice 2: Header Toggle Button & Tooltip Provider (Akan Dikerjakan)
- [ ] Mengimpor `PanelLeftClose`, `PanelLeftOpen`, dan komponen `<TooltipProvider>` dari `@/components/ui/tooltip`.
- [ ] Membungkus layout utama dengan `<TooltipProvider>`.
- [ ] Memperbarui tombol toggle di top bar `ConsoleLayout.tsx`.

### Slice 3: Sidebar Navigation Collapsible & Tooltip Item (Akan Dikerjakan)
- [ ] Mengubah tag `<aside>` dari kondisional hilangnya elemen (`{sidebarOpen && ...}`) menjadi perubahan kelas responsif (`w-64` vs `w-16`).
- [ ] Menyesuaikan render menu navigasi agar mendukung penyembunyian teks saat collapsed.
- [ ] Membungkus ikon navigasi dengan `<Tooltip>` Radix UI (`side="right"`).

### Slice 4: Pengujian & Quality Assurance (Akan Dikerjakan)
- [ ] Menjalankan `npm run lint` untuk memastikan 0 lint error.
- [ ] Menjalankan `npm run build` untuk memverifikasi kompilasi Vite.
- [ ] Memperbarui checklist `todo.md`.
