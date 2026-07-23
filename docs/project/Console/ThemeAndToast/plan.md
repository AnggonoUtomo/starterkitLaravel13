# Rencana Implementasi: Theme Switcher & Toast Notification System

## Ringkasan
Memperluas fungsi UI `ConsoleLayout.tsx` dengan menambahkan Theme Switcher dan Komponen Toast Notification Melayang.

## Arsitektur Komponen
- `resources/js/hooks/use-appearance.tsx`: Hook pengelola state tema dan integrasi `localStorage`.
- `resources/js/components/ToastNotification.tsx`: Komponen toast melayang berbasis Framer Motion `AnimatePresence`.
- `resources/js/layouts/ConsoleLayout.tsx`: Menyematkan tombol dropdown switcher tema pada header dan komponen `ToastNotification`.

## Rincian Perencanaan Tugas
- [ ] Tugas 1: Membuat komponen `ToastNotification.tsx` dengan animasi Framer Motion.
- [ ] Tugas 2: Menghubungkan hook `useAppearance` pada header `ConsoleLayout.tsx`.
- [ ] Tugas 3: Menyematkan `ToastNotification` pada `ConsoleLayout.tsx` mendengarkan `flash.success` dan `flash.error`.
- [ ] Tugas 4: Memverifikasi tampilan tema Dark/Light dan popup Toast.
