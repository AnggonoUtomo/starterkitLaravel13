<?php

declare(strict_types=1);

namespace App\Modules\Console\Profile\Integration;

use App\Modules\Console\Profile\Contracts\ProfileModuleContract;
use App\Modules\Console\UserManagement\Domain\Entities\User;

final class ProfileIntegrationService implements ProfileModuleContract
{
    public function getProfileSummary(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'initials' => strtoupper(substr($user->name, 0, 2)),
        ];
    }
}
