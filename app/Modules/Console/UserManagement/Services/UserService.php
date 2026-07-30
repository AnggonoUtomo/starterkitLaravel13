<?php

declare(strict_types=1);

namespace App\Modules\Console\UserManagement\Services;

use App\Modules\Console\UserManagement\Domain\Entities\User;
use App\Modules\Console\UserManagement\Domain\Events\UserDeleted;
use App\Modules\Console\UserManagement\Domain\Events\UserImpersonated;
use App\Modules\Console\UserManagement\Domain\Events\UserImpersonationStopped;
use App\Modules\Console\UserManagement\DTO\UserDTO;
use App\Modules\Console\UserManagement\Transactions\CreateUserTransaction;
use App\Modules\Console\UserManagement\Transactions\UpdateUserTransaction;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserService
{
    public function __construct(
        protected CreateUserTransaction $createUserTransaction,
        protected UpdateUserTransaction $updateUserTransaction
    ) {}

    /**
     * Get role and permission metadata for forms.
     *
     * @return array{availableRoles: array<int, string>, rolesWithPermissions: array<int, array<string, mixed>>, permissionGroups: array<int, array<string, mixed>>}
     */
    public function getRoleAndPermissionMetaData(): array
    {
        return Cache::remember('user_roles_permissions_metadata', 3600, function () {
            $availableRoles = Role::pluck('name')->toArray();

            $rolesWithPermissions = Role::with('permissions:id,name')->get()->map(fn (Role $role) => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->sort()->values()->toArray(),
            ])->toArray();

            $permissionGroups = Permission::query()
                ->select('id', 'name', 'guard_name')
                ->orderBy('name')
                ->get()
                ->groupBy(fn (Permission $permission) => Str::before($permission->name, '.'))
                ->map(fn ($permissions, string $module) => [
                    'module' => $module ?: 'general',
                    'permissions' => $permissions->map(fn ($p) => ['id' => $p->id, 'name' => $p->name])->values()->toArray(),
                ])
                ->values()
                ->toArray();

            return [
                'availableRoles' => $availableRoles,
                'rolesWithPermissions' => $rolesWithPermissions,
                'permissionGroups' => $permissionGroups,
            ];
        });
    }

    public function clearRoleAndPermissionCache(): void
    {
        Cache::forget('user_roles_permissions_metadata');
    }

    /**
     * Get paginated users with search and role filter.
     *
     * @return LengthAwarePaginator<int, array<string, mixed>>
     */
    public function getPaginatedUsers(int $perPage = 10, ?string $search = null, ?string $role = null): LengthAwarePaginator
    {
        $query = User::with(['roles.permissions', 'permissions'])->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role) {
            $query->role($role);
        }

        $paginator = $query->paginate($perPage)->withQueryString();
        /** @var User|null $currentUser */
        $currentUser = auth()->user();

        $paginator->getCollection()->transform(fn (User $user) => UserDTO::fromModel($user, $currentUser)->toArray());

        /** @var LengthAwarePaginator<int, array<string, mixed>> $paginator */
        return $paginator;
    }

    /**
     * Create a new user with assigned roles and direct permissions.
     *
     * @param  array<string, mixed>  $data
     */
    public function createUser(array $data): User
    {
        return $this->createUserTransaction->execute($data);
    }

    /**
     * Update existing user with roles and direct permissions.
     *
     * @param  array<string, mixed>  $data
     */
    public function updateUser(User $user, array $data): User
    {
        return $this->updateUserTransaction->execute($user, $data);
    }

    /**
     * Delete user.
     */
    public function deleteUser(User $user): bool
    {
        $userId = $user->id;
        $userName = $user->name;
        $userEmail = $user->email;

        $deleted = $user->delete();

        if ($deleted) {
            event(new UserDeleted([
                'user_id' => $userId,
                'name' => $userName,
                'email' => $userEmail,
            ]));
        }

        return $deleted;
    }

    /**
     * Start impersonating user.
     */
    public function impersonate(User $targetUser): void
    {
        /** @var User $adminUser */
        $adminUser = auth()->user();

        session()->put('impersonator_id', $adminUser->id);
        session()->put('impersonator_name', $adminUser->name);

        event(new UserImpersonated([
            'admin_id' => $adminUser->id,
            'admin_name' => $adminUser->name,
            'target_user_id' => $targetUser->id,
            'target_user_name' => $targetUser->name,
        ], $adminUser->id));

        auth()->login($targetUser);
    }

    /**
     * Leave impersonation and return to admin account.
     */
    public function stopImpersonating(): void
    {
        $impersonatorId = session('impersonator_id');

        if ($impersonatorId) {
            /** @var User $adminUser */
            $adminUser = User::findOrFail($impersonatorId);
            session()->forget(['impersonator_id', 'impersonator_name']);

            event(new UserImpersonationStopped([
                'admin_id' => $adminUser->id,
                'admin_name' => $adminUser->name,
            ], $adminUser->id));

            auth()->login($adminUser);
        }
    }
}
