<?php

declare(strict_types=1);

namespace App\Modules\Console\AccessControl\Transactions;

use App\Modules\Console\AccessControl\Domain\Events\RolePermissionsUpdated;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

final class UpdateRolePermissionsTransaction
{
    /**
     * Execute atomic role permissions update transaction.
     *
     * @param  array<int, string>  $permissions
     */
    public function execute(Role $role, array $permissions): Role
    {
        return DB::transaction(function () use ($role, $permissions) {
            $role->syncPermissions($permissions);

            event(new RolePermissionsUpdated([
                'role_id' => $role->id,
                'role_name' => $role->name,
                'permissions_count' => count($permissions),
            ]));

            return $role;
        });
    }
}
