# Submodule Spec: Console/Profile

## Objective
Integrate User Profile & Security Settings (name, email, password update, session logout) directly inside `ConsoleLayout`.

## Tech Stack & Dependencies
- Backend: Fortify Profile Information & Password Update controllers
- Frontend Page: `resources/js/pages/Console/Profile/Index.tsx`
- Layout: `ConsoleLayout.tsx`

## Acceptance Criteria
- [ ] User can view and update their name and email inside `ConsoleLayout`.
- [ ] User can update their password with current password verification.
- [ ] Submodule route `console/profile` registered under `console.profile.` name prefix.
- [ ] Permissions `profile.view` and `profile.edit` declared in `permissions.php`.

## Verification Steps
- Pest Feature Test: `php artisan test --filter=ProfileTest`
