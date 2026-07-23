<?php

namespace App\Modules\Console\UserManagement\Services;

use App\Models\User;
use App\Modules\Console\UserManagement\DTO\UserDTO;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Get paginated users.
     */
    public function getPaginatedUsers(int $perPage = 10, ?string $search = null): LengthAwarePaginator
    {
        $query = User::with('roles')->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $paginator = $query->paginate($perPage);
        $paginator->getCollection()->transform(fn (User $user) => UserDTO::fromModel($user)->toArray());

        return $paginator;
    }

    /**
     * Create a new user with assigned roles.
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

        return $user;
    }

    /**
     * Update existing user.
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
