<?php

namespace App\Modules\Console\UserManagement\DTO;

use App\Models\User;
use App\Shared\DTO\BaseDTO;

class UserDTO extends BaseDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public array $roles,
        public ?string $created_at
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            roles: $user->getRoleNames()->toArray(),
            created_at: $user->created_at?->toIso8601String()
        );
    }
}
