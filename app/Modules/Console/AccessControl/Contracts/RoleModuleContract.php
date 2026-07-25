<?php

namespace App\Modules\Console\AccessControl\Contracts;

use Spatie\Permission\Models\Role;

interface RoleModuleContract
{
    public function findRoleByName(string $name): ?Role;

    /**
     * @return array<int, string>
     */
    public function getAllRoleNames(): array;
}
