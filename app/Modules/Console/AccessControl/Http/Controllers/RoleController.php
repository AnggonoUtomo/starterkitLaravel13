<?php

namespace App\Modules\Console\AccessControl\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Console\AccessControl\Services\RoleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct(
        protected RoleService $roleService
    ) {}

    public function index(): Response
    {
        $roles = $this->roleService->getRolesWithPermissions();
        $groupedPermissions = $this->roleService->getAllGroupedPermissions();

        return Inertia::render('Console/AccessControl/Index', [
            'title' => 'Access Control & RBAC Matrix',
            'roles' => $roles,
            'groupedPermissions' => $groupedPermissions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array',
        ]);

        $this->roleService->createRole($validated['name'], $validated['permissions'] ?? []);

        return back()->with('success', 'Role created successfully.');
    }

    public function updatePermissions(Request $request, Role $role): RedirectResponse
    {
        $validated = $request->validate([
            'permissions' => 'present|array',
        ]);

        $this->roleService->updateRolePermissions($role, $validated['permissions']);

        return back()->with('success', "Permissions updated for role {$role->name}.");
    }

    public function destroy(Role $role): RedirectResponse
    {
        if ($role->name === 'Super System') {
            return back()->with('error', 'The Super System role cannot be deleted.');
        }

        $this->roleService->deleteRole($role);

        return back()->with('success', 'Role deleted successfully.');
    }
}
