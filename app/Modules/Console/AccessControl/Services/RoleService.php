<?php

namespace App\Modules\Console\AccessControl\Services;

use App\Shared\Providers\ModuleServiceProvider;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleService
{
    /**
     * Get all roles with their assigned permissions.
     */
    public function getRolesWithPermissions(): Collection
    {
        return Role::with('permissions')->get();
    }

    /**
     * Get all registered permissions grouped by submodule.
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
     */
    public function createRole(string $name, array $permissions = []): Role
    {
        $role = Role::create(['name' => $name, 'guard_name' => 'web']);
        if (! empty($permissions)) {
            $role->syncPermissions($permissions);
        }

        return $role;
    }

    /**
     * Update role permissions.
     */
    public function updateRolePermissions(Role $role, array $permissions): Role
    {
        $role->syncPermissions($permissions);

        return $role;
    }

    /**
     * Delete role.
     */
    public function deleteRole(Role $role): bool
    {
        return $role->delete();
    }
}
