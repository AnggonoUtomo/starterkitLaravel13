<?php

declare(strict_types=1);

use App\Modules\Console\AccessControl\Domain\Events\RoleCreated;
use App\Modules\Console\AccessControl\Domain\Events\RoleDeleted;
use App\Modules\Console\AccessControl\Domain\Events\RolePermissionsUpdated;
use App\Modules\Console\AccessControl\Services\RoleService;
use App\Modules\Console\AccessControl\Transactions\CreateRoleTransaction;
use App\Modules\Console\AccessControl\Transactions\UpdateRolePermissionsTransaction;
use Illuminate\Support\Facades\Event;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

test('create role transaction creates role with permissions and dispatches event', function () {
    Event::fake([RoleCreated::class]);

    $permission = Permission::findOrCreate('users.view', 'web');
    $transaction = app(CreateRoleTransaction::class);

    $role = $transaction->execute('Editor', ['users.view']);

    expect($role)->toBeInstanceOf(Role::class);
    expect($role->name)->toBe('Editor');
    expect($role->hasPermissionTo('users.view'))->toBeTrue();

    Event::assertDispatched(RoleCreated::class);
});

test('update role permissions transaction updates matrix and dispatches event', function () {
    Event::fake([RolePermissionsUpdated::class]);

    $role = Role::findOrCreate('Manager', 'web');
    Permission::findOrCreate('users.create', 'web');

    $transaction = app(UpdateRolePermissionsTransaction::class);
    $transaction->execute($role, ['users.create']);

    expect($role->hasPermissionTo('users.create'))->toBeTrue();

    Event::assertDispatched(RolePermissionsUpdated::class);
});

test('role service protects super system role from deletion', function () {
    Event::fake([RoleDeleted::class]);

    $superRole = Role::findOrCreate('Super System', 'web');
    $service = app(RoleService::class);

    $deleted = $service->deleteRole($superRole);

    expect($deleted)->toBeFalse();
    Event::assertNotDispatched(RoleDeleted::class);
});
