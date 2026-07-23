<?php

namespace App\Modules\Console\UserManagement\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Modules\Console\UserManagement\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    public function index(Request $request): Response
    {
        $users = $this->userService->getPaginatedUsers(
            perPage: 10,
            search: $request->query('search')
        );

        $availableRoles = Role::pluck('name')->toArray();

        return Inertia::render('Console/UserManagement/Index', [
            'title' => 'User Management',
            'users' => $users,
            'availableRoles' => $availableRoles,
            'filters' => [
                'search' => $request->query('search', ''),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'roles' => 'nullable|array',
        ]);

        $this->userService->createUser($validated);

        return back()->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8',
            'roles' => 'nullable|array',
        ]);

        $this->userService->updateUser($user, $validated);

        return back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $this->userService->deleteUser($user);

        return back()->with('success', 'User deleted successfully.');
    }

    public function impersonate(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot impersonate yourself.');
        }

        $this->userService->impersonate($user);

        return redirect()->route('console.user-management.index')
            ->with('success', "Now impersonating {$user->name}.");
    }

    public function stopImpersonating(): RedirectResponse
    {
        $this->userService->stopImpersonating();

        return redirect()->route('console.user-management.index')
            ->with('success', 'Returned to Admin account.');
    }
}
