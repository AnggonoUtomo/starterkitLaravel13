<?php

namespace App\Modules\Console\AccessControl\Integration;

use App\Modules\Console\AccessControl\Contracts\RoleModuleContract;
use Spatie\Permission\Models\Role;

class RoleIntegrationService implements RoleModuleContract
{
    public function findRoleByName(string $name): ?Role
    {
        return Role::where('name', $name)->first();
    }

    /**
     * @return array<int, string>
     */
    public function getAllRoleNames(): array
    {
        return Role::pluck('name')->toArray();
    }
}
