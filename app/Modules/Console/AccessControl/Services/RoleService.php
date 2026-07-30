<?php

declare(strict_types=1);

namespace App\Modules\Console\AccessControl\Services;

use App\Modules\Console\AccessControl\Domain\Events\RoleDeleted;
use App\Modules\Console\AccessControl\Transactions\CreateRoleTransaction;
use App\Modules\Console\AccessControl\Transactions\UpdateRolePermissionsTransaction;
use App\Shared\Providers\ModuleServiceProvider;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleService
{
    public function __construct(
        protected CreateRoleTransaction $createRoleTransaction,
        protected UpdateRolePermissionsTransaction $updateRolePermissionsTransaction
    ) {}

    /**
     * Get all roles with their assigned permissions.
     *
     * @return Collection<int, Role>
     */
    public function getRolesWithPermissions(): Collection
    {
        return Role::with('permissions')->get();
    }

    /**
     * Get all registered permissions grouped by submodule.
     *
     * @return array<string, array<int, string>>
     */
    public function getAllGroupedPermissions(): array
    {
        $discovered = ModuleServiceProvider::getDiscoveredPermissions();
        $databasePermissions = Permission::pluck('name')->toArray();

        // Sync discovered permissions into DB if missing
        foreach ($discovered as $submodule => $permissions) {
            foreach ($permissions as $permName) {
                if (! in_array($permName, $databasePermissions)) {
                    Permission::findOrCreate($permName, 'web');
                }
            }
        }

        return $discovered;
    }

    /**
     * Create a new Role.
     *
     * @param  array<int, string>  $permissions
     */
    public function createRole(string $name, array $permissions = []): Role
    {
        return $this->createRoleTransaction->execute($name, $permissions);
    }

    /**
     * Update role permissions.
     *
     * @param  array<int, string>  $permissions
     */
    public function updateRolePermissions(Role $role, array $permissions): Role
    {
        return $this->updateRolePermissionsTransaction->execute($role, $permissions);
    }

    /**
     * Delete role.
     */
    public function deleteRole(Role $role): bool
    {
        if ($role->name === 'Super System') {
            return false;
        }

        $roleId = $role->id;
        $roleName = $role->name;

        $deleted = $role->delete();

        if ($deleted) {
            event(new RoleDeleted([
                'role_id' => $roleId,
                'role_name' => $roleName,
            ]));
        }

        return $deleted;
    }
}
