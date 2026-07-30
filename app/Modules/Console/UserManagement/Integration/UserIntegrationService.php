<?php

declare(strict_types=1);

namespace App\Modules\Console\UserManagement\Integration;

use App\Modules\Console\UserManagement\Contracts\UserModuleContract;
use App\Modules\Console\UserManagement\Domain\Entities\User;

final class UserIntegrationService implements UserModuleContract
{
    public function findUserById(int|string $id): ?User
    {
        return User::find($id);
    }

    /**
     * @param  array<int, int|string>  $ids
     * @return array<int|string, string>
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
