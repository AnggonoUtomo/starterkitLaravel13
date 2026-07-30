# SantriManagement Implementation Plan

## Delivery Strategy

Urutan setiap increment: specify, plan, implement, test, review, document, verify. Jangan mencampur beberapa capability besar dalam satu increment.

## Increments

| Increment | Scope | Depends On | Acceptance | Verification | Status |
|---|---|---|---|---|---|
| INC-SAN-001 | Database Migration & ULID Entity | - | Table `pesantren_santri` created | `php artisan migrate` | Completed |
| INC-SAN-002 | Domain Events, DTO, & Service | INC-SAN-001 | Contracts & Service functional | Pest Test Suite | Completed |
| INC-SAN-003 | FormRequests & Slim Controller | INC-SAN-002 | Controller < 50 lines | Larastan L7 check | Completed |
| INC-SAN-004 | Inertia React UI & Route | INC-SAN-003 | UI page renders cleanly | `npm run build` | Planned |

## Technical Tasks

- [x] Confirm existing module/package inventory.
- [x] Define module contract and permission identity.
- [x] Define migration and ULID behavior.
- [x] Implement application/domain behavior.
- [x] Implement API/frontend flow.
- [ ] Add audit, authorization, and security tests.
- [ ] Verify CI/build and update documentation.
