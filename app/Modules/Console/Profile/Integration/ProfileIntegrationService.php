<?php

namespace App\Modules\Console\Profile\Integration;

use App\Models\User;
use App\Modules\Console\Profile\Contracts\ProfileModuleContract;

class ProfileIntegrationService implements ProfileModuleContract
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
