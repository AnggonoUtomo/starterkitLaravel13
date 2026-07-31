# Submodule: Console / Notification

## Context

| Item | Value |
|---|---|
| Slug | `console.notification` |
| Route Prefix | `/console/notifications` |
| Status | 🔲 Planned |

## Intake Summary

- Existing code: `ToastNotification.tsx` (flash messages only — bukan persistent notification)
- Requested: Sistem notifikasi lengkap (in-app, email, push) dengan inbox dan preferensi per-user
- Dependencies: Laravel Notification system, database notification channel

## Scope

### In Scope

- In-app notification inbox (bell icon + drawer/page)
- Mark as read/unread, mark all as read
- Notification preferences per-user (mute, channel selection)
- Email notification channel
- Admin broadcast notification ke semua user atau group

### Out of Scope

- Push notification (browser/mobile)
- WebSocket real-time notification (tahap awal polling, bisa ditambah nanti)
- SMS notification

## Module Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| NOTIF-001 | User melihat daftar notifikasi di inbox | Must | Halaman/drawer notifikasi tampil |
| NOTIF-002 | User dapat menandai notifikasi sebagai dibaca | Must | Status read/unread berubah |
| NOTIF-003 | Admin dapat mengirim broadcast notification | Should | Notifikasi terkirim ke target users |
| NOTIF-004 | User dapat mengatur preferensi notifikasi | Should | Preferensi tersimpan per-user |

## Module Boundary

- Owner: Saka
- Public contract: `NotificationModuleContract`
- Events: `NotificationSent`, `NotificationRead`
- Permissions: `notifications.view`, `notifications.manage`, `notifications.broadcast`
- Data ownership: Laravel `notifications` table
- Dependencies: Laravel Notification, `UserManagement` (user target)

## Open Decisions

| ID | Question | Impact | Owner | Status |
|---|---|---|---|---|
| NOTIF-OD-001 | Polling interval vs WebSocket untuk real-time? | UX & performance | Saka | Open |
| NOTIF-OD-002 | Apakah menggunakan Laravel built-in notifications table atau custom? | Migration strategy | Saka | Open |
