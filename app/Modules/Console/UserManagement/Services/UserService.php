<?php

namespace App\Modules\Console\UserManagement\Services;

use App\Models\User;
use App\Modules\Console\UserManagement\DTO\UserDTO;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Get paginated users with search and role filter.
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

        $paginator = $query->paginate($perPage);
        $currentUser = auth()->user();

        $paginator->getCollection()->transform(fn (User $user) => UserDTO::fromModel($user, $currentUser)->toArray());

        return $paginator;
    }

    /**
     * Create a new user with assigned roles and direct permissions.
     */
    public function createUser(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (! empty($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        if (! empty($data['permissions'])) {
            $user->syncPermissions($data['permissions']);
        }

        return $user;
    }

    /**
     * Update existing user with roles and direct permissions.
     */
    public function updateUser(User $user, array $data): User
    {
        $payload = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (! empty($data['password'])) {
            $payload['password'] = Hash::make($data['password']);
        }

        $user->update($payload);

        if (isset($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        if (isset($data['permissions'])) {
            $user->syncPermissions($data['permissions']);
        }

        return $user;
    }

    /**
     * Delete user.
     */
    public function deleteUser(User $user): bool
    {
        return $user->delete();
    }

    /**
     * Start impersonating user.
     */
    public function impersonate(User $targetUser): void
    {
        $adminUser = auth()->user();

        session()->put('impersonator_id', $adminUser->id);
        session()->put('impersonator_name', $adminUser->name);

        auth()->login($targetUser);
    }

    /**
     * Leave impersonation and return to admin account.
     */
    public function stopImpersonating(): void
    {
        $impersonatorId = session('impersonator_id');

        if ($impersonatorId) {
            $adminUser = User::findOrFail($impersonatorId);
            session()->forget(['impersonator_id', 'impersonator_name']);
            auth()->login($adminUser);
        }
    }
}
