<?php

namespace App\Modules\Console\UserManagement\Integration;

use App\Models\User;
use App\Modules\Console\UserManagement\Contracts\UserModuleContract;

class UserIntegrationService implements UserModuleContract
{
    public function findUserById(int $id): ?User
    {
        return User::find($id);
    }

    /**
     * @param  array<int, int>  $ids
     * @return array<int, string>
     */
    public function getUserNamesByIds(array $ids): array
    {
        if (empty($ids)) {
            return [];
        }

        return User::whereIn('id', array_unique($ids))
            ->pluck('name', 'id')
            ->toArray();
    }
}
