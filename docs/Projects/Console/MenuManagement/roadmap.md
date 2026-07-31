# Roadmap: MenuManagement

| Milestone | Target Outcome | Exit Criteria | Status |
|---|---|---|---|
| M1 Specification | Spesifikasi teknis & rancangan schema selesai | Dokumentasi `MenuManagement/` lengkap | ✅ Done |
| M2 Backend Contract | Migration, Entity, Service, & Endpoint CRUD | Tests pass 100% | 🔲 Planned |
| M3 Frontend & Tree Reorder | Halaman manajemen menu & drag-and-drop ordering | ESLint clean, Vite build sukses | 🔲 Planned |
| M4 Layout Integration | `ConsoleLayout.tsx` merender menu dinamis dari DB | Test integrasi layout pass | 🔲 Planned |

## Dependency Order

1. Must First: Database Migration & `MenuItem` Entity.
2. Next: `MenuService` permission-filtering logic.
3. Finally: Inertia React tree view & layout integration.
