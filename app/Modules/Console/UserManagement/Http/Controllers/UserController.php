<?php

declare(strict_types=1);

namespace App\Modules\Console\UserManagement\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Console\SystemSetting\Services\SettingService;
use App\Modules\Console\UserManagement\Domain\Entities\User;
use App\Modules\Console\UserManagement\Http\Requests\CreateUserRequest;
use App\Modules\Console\UserManagement\Http\Requests\UpdateUserRequest;
use App\Modules\Console\UserManagement\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $role = $request->query('role');
        $defaultPerPage = (int) (app(SettingService::class)->getPaginationSettings()['default_per_page'] ?? 10);
        $perPage = (int) $request->query('per_page', $defaultPerPage);

        $users = $this->userService->getPaginatedUsers($perPage, $search, $role);
        $meta = $this->userService->getRoleAndPermissionMetaData();

        return Inertia::render('Console/UserManagement/Index', [
            'title' => 'User Management',
            'users' => $users,
            ...$meta,
            'filters' => ['search' => $search ?? '', 'role' => $role ?? ''],
        ]);
    }

    public function store(CreateUserRequest $request): RedirectResponse
    {
        $this->userService->createUser($request->validated());

        return back()->with('success', 'User created successfully.');
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $this->userService->updateUser($user, $request->validated());

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
