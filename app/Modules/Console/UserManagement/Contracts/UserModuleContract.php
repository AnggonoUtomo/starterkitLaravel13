<?php

declare(strict_types=1);

namespace App\Modules\Console\UserManagement\Contracts;

use App\Modules\Console\UserManagement\Domain\Entities\User;

interface UserModuleContract
{
    public function findUserById(int|string $id): ?User;

    /**
     * @param  array<int, int|string>  $ids
     * @return array<int|string, string>
     */
    public function getUserNamesByIds(array $ids): array;
}
