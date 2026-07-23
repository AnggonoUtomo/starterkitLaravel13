# Submodule Spec: Console/UserManagement

## Objective
Provide user account management, Spatie role assignment, user search/filtering, and admin impersonation mode ("Log in as user").

## Tech Stack & Dependencies
- Backend: `UserController`, `UserService`, `UserDTO`, `ImpersonateUserTransaction`
- Spatie Traits: `HasRoles` on `User` Model
- Frontend Page: `resources/js/pages/Console/UserManagement/Index.tsx`
- Shared Components: `ImpersonationBanner.tsx` with Framer Motion

## Acceptance Criteria
- [x] Admin can list paginated users with assigned Spatie roles.
- [x] Admin can create a new user and assign roles.
- [x] Admin can edit user information and sync roles.
- [x] Admin can delete user accounts (except their own account).
- [x] Admin can impersonate a user account, displaying a floating Framer Motion banner with an exit button.

## Verification Steps
- Run feature test: `php artisan test --filter=ModuleSystemTest`
