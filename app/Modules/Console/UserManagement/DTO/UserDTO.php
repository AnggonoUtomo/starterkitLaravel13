<?php

namespace App\Modules\Console\UserManagement\DTO;

use App\Models\User;
use App\Shared\DTO\BaseDTO;
use Illuminate\Support\Str;

class UserDTO extends BaseDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public string $initials,
        public array $roles,
        public array $rolePermissions,
        public array $permissions,
        public array $effectivePermissions,
        public ?string $primaryRole,
        public ?string $created_at,
        public array $can = []
    ) {}

    public static function fromModel(User $user, ?User $currentUser = null): self
    {
        $roles = $user->getRoleNames()->toArray();
        $currentUser = $currentUser ?? auth()->user();

        $rolePermissions = [];
        foreach ($user->roles as $role) {
            $rolePermissions[$role->name] = $role->permissions->pluck('name')->sort()->values()->toArray();
        }

        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            initials: self::getInitials($user->name),
            roles: $roles,
            rolePermissions: $rolePermissions,
            permissions: $user->getDirectPermissions()->pluck('name')->values()->toArray(),
            effectivePermissions: $user->getAllPermissions()->pluck('name')->sort()->values()->toArray(),
            primaryRole: $roles[0] ?? 'User',
            created_at: $user->created_at?->format('d M Y') ?? $user->created_at?->toIso8601String(),
            can: [
                'update' => true,
                'delete' => $currentUser ? $user->id !== $currentUser->id : true,
                'impersonate' => $currentUser ? $user->id !== $currentUser->id : false,
            ]
        );
    }

    private static function getInitials(string $name): string
    {
        return Str::upper(
            Str::of($name)
                ->explode(' ')
                ->filter()
                ->map(fn (string $part) => Str::substr($part, 0, 1))
                ->take(2)
                ->implode('')
        );
    }
}
