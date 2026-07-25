<?php

namespace App\Modules\Console\AccessControl\Services;

use App\Modules\Console\AccessControl\Events\RoleCreated;
use App\Modules\Console\AccessControl\Events\RoleDeleted;
use App\Modules\Console\AccessControl\Events\RolePermissionsUpdated;
use App\Shared\Providers\ModuleServiceProvider;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleService
{
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
    }

    /**
     * Update role permissions.
     *
     * @param  array<int, string>  $permissions
     */
    public function updateRolePermissions(Role $role, array $permissions): Role
    {
        $role->syncPermissions($permissions);

        event(new RolePermissionsUpdated([
            'role_id' => $role->id,
            'role_name' => $role->name,
            'permissions_count' => count($permissions),
        ]));

        return $role;
    }

    /**
     * Delete role.
     */
    public function deleteRole(Role $role): bool
    {
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
