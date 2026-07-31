# Console Roadmap

| Milestone | Outcome | Exit Criteria | Target | Status |
|---|---|---|---|---|
| M1 Discovery | Module inventory & submodule structure | README + specs lengkap | 2026-07-31 | ✅ Done |
| M2 Foundation Review | Existing code reviewed & stabilized | Tests pass, OD resolved | TBD | 🔲 Planned |
| M3 Core Submodules | Dashboard, Notification, ActivityLog | 3 submodule berfungsi (MenuMgmt removed) | TBD | 🔲 In Progress |
| M4 Infrastructure | FileStorage, Scheduler, Queue, BackupRestore | 4 submodule berfungsi | TBD | 🔲 Planned |
| M5 Release | All submodules verified & documented | Release evidence | TBD | 🔲 Planned |

## Submodule Priority Order

1. 🔴 **Must First**: ~~Dashboard~~ ✅ Done, UserManagement (review), AuditLog (review)
2. 🟡 **Should Next**: MenuManagement (🔲 Planned), Notification, ActivityLog
3. 🟢 **Can Later**: FileStorage, Scheduler, Queue, BackupRestore

## Out of Scope and Future Ideas

- Real-time websocket updates (upgrade dari polling)
- Dashboard analytics charts (Chart.js / Recharts)
- Two-factor authentication management di console
- Webhook management
- Multi-language (i18n) Console UI
- API token management
- Custom widget builder untuk Dashboard
