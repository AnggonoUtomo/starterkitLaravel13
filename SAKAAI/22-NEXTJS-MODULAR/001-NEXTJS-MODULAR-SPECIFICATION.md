# Next.js Modular Architecture Specification

**Document ID:** NXT001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Next.js Architecture  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Spesifikasi ini menetapkan **Arsitektur Modular Next.js 15** dengan App Router, React Server Components, Feature-Sliced Design, dan optimized data fetching patterns.

---

# 2. Standard Folder Structure

```
src/
├── app/                               # App Router (Pages & Layouts)
│   ├── layout.tsx                     # Root Layout
│   ├── page.tsx                       # Home Page
│   ├── (auth)/                        # Route Group: Auth
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── settings/page.tsx
│   └── api/                           # API Route Handlers
│       └── users/route.ts
├── features/                          # Feature-Sliced Modules
│   ├── auth/
│   │   ├── components/                # Feature-specific components
│   │   │   └── LoginForm.tsx
│   │   ├── hooks/                     # Feature-specific hooks
│   │   │   └── useAuth.ts
│   │   ├── actions/                   # Server Actions
│   │   │   └── loginAction.ts
│   │   ├── types/                     # TypeScript types
│   │   │   └── auth.types.ts
│   │   └── index.ts                   # Public API barrel export
│   └── users/
│       ├── components/
│       ├── hooks/
│       ├── actions/
│       ├── types/
│       └── index.ts
├── shared/                            # Shared Utilities
│   ├── ui/                            # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── lib/                           # Utilities & helpers
│   │   ├── db.ts                      # Database client
│   │   └── utils.ts
│   └── types/                         # Global types
│       └── global.types.ts
└── middleware.ts                       # Edge middleware
```

---

# 3. Technical Standards

## 3.1 Server Components (Default)
- Semua komponen adalah **Server Components** by default.
- Hanya tambahkan `'use client'` jika benar-benar membutuhkan interaktivitas browser (event handlers, hooks, browser APIs).

## 3.2 Server Actions
```typescript
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/shared/lib/db';

export async function createUser(formData: FormData): Promise<{ success: boolean }> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) {
    throw new Error('Name and email are required');
  }

  await db.user.create({ data: { name, email } });
  revalidatePath('/dashboard/users');
  return { success: true };
}
```

## 3.3 Feature Barrel Exports
Setiap feature folder WAJIB memiliki `index.ts` yang mengekspor public API:
```typescript
// features/auth/index.ts
export { LoginForm } from './components/LoginForm';
export { useAuth } from './hooks/useAuth';
export type { AuthUser } from './types/auth.types';
```

---

# 4. Mandatory Rules

1. **No Client Components Unless Necessary**: Gunakan Server Components by default.
2. **Feature Isolation**: Feature folder DILARANG mengimpor dari feature lain secara langsung. Gunakan shared/ atau barrel exports.
3. **TypeScript Strict Mode**: `tsconfig.json` WAJIB `"strict": true`.
4. **Server Actions for Mutations**: Semua data mutation WAJIB menggunakan Server Actions, bukan API routes.
5. **Proper Loading & Error States**: Setiap route WAJIB memiliki `loading.tsx` dan `error.tsx`.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-26 | Next.js Modular Architecture Specification | Governance Board |
