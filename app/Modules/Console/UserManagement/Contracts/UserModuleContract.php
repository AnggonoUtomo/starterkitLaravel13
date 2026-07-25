<?php

namespace App\Modules\Console\UserManagement\Contracts;

use App\Models\User;

interface UserModuleContract
{
    public function findUserById(int $id): ?User;

    /**
     * @param  array<int, int>  $ids
     * @return array<int, string>
     */
    public function getUserNamesByIds(array $ids): array;
}
