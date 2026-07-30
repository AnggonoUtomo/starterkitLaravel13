# Project Context: Laravel Engineering Starter Kit

## Bahasa Dokumentasi

- Bahasa utama dokumentasi, requirement, acceptance criteria, task, dan komunikasi adalah Bahasa Indonesia.
- Istilah teknis, nama class, command, namespace, package, API field, dan code identifier tetap menggunakan bentuk resmi aslinya.
- Kutipan error, output command, dan nama konfigurasi tidak diterjemahkan bila dapat mengurangi ketepatan teknis.
- AI assistant wajib menjawab user dalam Bahasa Indonesia kecuali user meminta bahasa lain.

## Mission

Build a reusable Laravel 13 starter kit that a developer, QA, DevOps engineer,
or AI coding assistant can implement and verify without oral instructions.

## Fixed Stack

- Laravel 13 and PHP 8.4+.
- Laravel React starter kit, Inertia, React, TypeScript, and Vite.
- Tailwind CSS and shadcn/ui.
- PostgreSQL and Redis.
- Ziggy for frontend routes.
- Spatie Permission and approved Spatie packages, including Media Library when
  a module requires media.
- Laragon on Windows for the first local baseline environment.
- Deployment options: DigitalOcean Ubuntu via SSH or cPanel, according to target
  capability.

## Architecture

Use DDD-lite Modular Monolith with domain-driven boundaries, public contracts,
typed DTOs, and events. Keep business modules separate from kernel orchestration,
framework package services, and Laravel infrastructure details.

- Reusable framework capability belongs in packages/StarterKit.
- Application modules belong in app/Modules/{Domain}/{SubModule}.
- Cross-module concrete dependency is forbidden.
- Module communication uses public contract, DTO, public event, or approved shared
  value object.
- Every module owns its communication layer, permission identity, setting schema,
  tests, and README.
- Module invalid is isolated; valid modules continue bootstrap.

## Baseline Modules and Order

The first vertical slice is implemented in this order:

1. AccessControl.
2. UserManagement.
3. AuditLog.
4. SystemSetting.

Auth, notification, profile, and default settings from the Laravel React starter
kit are reused and integrated, not rebuilt, unless a specification explicitly
changes them.

## Identifier and Security Rules

- Every table primary key and foreign key uses ULID.
- Boundary identifiers, correlation ID, actor ID, job ID, fixtures, and API
  resource identifiers also use ULID.
- Authorization baseline uses allow permissions and policy rules; no explicit
  deny model.
- Super System is a privileged baseline role created through AccessControl, not
  a hardcoded project role. Privileged capability is hidden from other users.
- Impersonation requires permission and reason; target Super System is always
  forbidden, including for Super System.
- AuditLog is append-only, scoped, redacted, and retained at least one year.
- SystemSetting changes are restricted to Super System, validated, immediately
  active after validation, and audited.
- Baseline operations settings include RTO 4 hours and RPO 24 hours through
  SystemSetting.
- Never store or log secrets, tokens, passwords, credentials, or sensitive
  payloads as plain data.

## Dependency Rules

Wayfinder and Laravel Boost are forbidden. Do not reintroduce them through
composer, npm, transitive configuration, generated code, source, examples, or
documentation. Frontend route generation uses Ziggy.

## Documentation Rules

Read README.md and AGENTS.md before work. Then read the relevant documents in
this order:

1. 00 context and baseline direction.
2. 01 requirements and acceptance criteria.
3. 02 design and contracts.
4. 03 implementation, tests, and task plan.
5. 04 environment, CI/CD, operations, and release.
6. 05 ADR, changelog, and known issues.
7. 06 baseline framework path before supporting framework documents.
8. 07 baseline kernel path before supporting kernel documents.

Treat Open Decisions as unresolved. Never invent answers. When a decision is
confirmed, update the authoritative document, downstream references, changelog,

All documentation references must use repository-relative Markdown links. Never
use an absolute local workspace path or a link containing the local workspace
name.
The documentation repository is expected to be mounted as `docs/` inside a
Laravel project; links must remain valid after that move.
and revision history.

## Baseline Framework Path

Read in order:

- 06.00-FRAMEWORK-CONTEXT.md
- 06.01-PACKAGE-ARCHITECTURE.md
- 06.02-MODULE-CONTRACTS.md
- 06.03-MODULE-REGISTRY.md
- 06.04-MODULE-DISCOVERY.md
- 06.05-GENERATOR-ENGINE.md
- 06.06-STUB-ENGINE.md
- 06.07-CONSOLE.md

## Baseline Kernel Path

Read in order:

- 07.00-KERNEL-CONTEXT.md
- 07.01-BOOTSTRAP.md
- 07.02-SERVICE-CONTAINER.md
- 07.03-EVENT-BUS.md
- 07.04-AUTHORIZATION.md
- 07.05-AUDIT.md
- 07.06-REGISTRY-SERVICE.md
- 07.07-SYSTEM-SETTING.md

Supporting documents are read only when the task requires their detail.

## Change Protocol

Before editing:

- identify the authoritative document and affected downstream documents;
- use interview-me when intent or requirement is materially unclear;
- use idea-refine when alternatives or trade-offs need stress testing;
- use spec-driven-development before implementing a new capability;
- use planning-and-task-breakdown for multi-step implementation;
- use context-engineering to keep the active context minimal and accurate.

Every implementation change requires:

- acceptance criteria;
- focused positive and negative tests;
- security/authorization consideration;
- verification command or evidence;
- documentation/update of affected context when behavior changes.

## Quality and Verification

Relevant quality gates include:

- Pint and PHPStan/Larastan.
- Pest/PHPUnit, Vitest, and Playwright with axe-core.
- ESLint, TypeScript check, and frontend build.
- CodeQL and OWASP Dependency-Check.
- Fresh migration, upgrade migration, module discovery, generator, contract,
  permission, audit, SystemSetting, and critical browser flow tests.

Use the most specific verification first, then broader gates. Do not claim a
change is verified without evidence.

## Operational Baseline

- Local development target is Laragon.
- Shared Development environment is optional.
- CI uses GitHub Actions.
- Staging/production may use DigitalOcean Ubuntu via SSH or cPanel.
- Monitoring integration is optional through SystemSetting, while structured
  internal logging and diagnostic remain mandatory.
- Recovery target defaults are RTO 4 hours and RPO 24 hours.
- Release must preserve the same tested artifact across environments.

## Agent Behavior

- Prefer small, focused changes.
- Preserve existing user changes and do not reset unrelated files.
- Do not commit, create branches, or install dependencies unless explicitly asked.
- Do not alter Open Decisions by assumption.
- Do not add business logic to framework/kernel or generator stubs.
- Report changed files, verification performed, and unresolved risks concisely.

## Project Intake and Reuse

Dokumentasi ini global dan tidak mengasumsikan project selalu dimulai dari nol.
Sebelum bekerja, AI wajib mengidentifikasi source repository, versi Laravel,
status starter kit, package, module, migration, route, permission, event, dan
capability yang sudah ada. Tentukan mode greenfield, existing starter kit, atau
module extension.

Untuk project turunan, gunakan Projects/{project-slug} dari Projects/_TEMPLATE.
Jangan menyalin seluruh baseline 00–07. Jika starter kit sudah ada, gunakan
capability yang tersedia; jangan membangun ulang tanpa keputusan eksplisit.

## Incremental Implementation

Gunakan skill incremental-implementation untuk perubahan multi-file dan module
baru. Setiap increment wajib memiliki scope kecil, acceptance criteria, focused
test, verification evidence, execution log, dan documentation update. Mulai
increment berikutnya hanya setelah increment sebelumnya diverifikasi.
