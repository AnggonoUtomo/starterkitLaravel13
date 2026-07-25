<?php

namespace App\Modules\Console\AccessControl\Transactions;

use App\Modules\Console\AccessControl\Events\RoleCreated;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class CreateRoleTransaction
{
    /**
     * Execute atomic role creation transaction.
     *
     * @param  array<int, string>  $permissions
     */
    public function execute(string $name, array $permissions = []): Role
    {
        return DB::transaction(function () use ($name, $permissions) {
            /** @var Role $role */
            $role = Role::create(['name' => $name, 'guard_name' => 'web']);

            if (! empty($permissions)) {
                $role->syncPermissions($permissions);
            }

            event(new RoleCreated([
                'role_id' => $role->id,
                'role_name' => $role->name,
                'permissions_count' => count($permissions),
            ]));

            return $role;
        });
    }
}
