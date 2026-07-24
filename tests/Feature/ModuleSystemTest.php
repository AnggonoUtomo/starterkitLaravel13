<?php

use App\Models\User;
use App\Shared\Providers\ModuleServiceProvider;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Models\Role;

test('auto discovers submodule permissions', function () {
    $permissions = ModuleServiceProvider::getDiscoveredPermissions();

    expect($permissions)->toHaveKeys([
        'Console/UserManagement',
        'Console/AccessControl',
        'Console/SystemSetting',
    ]);
});

test('make:module artisan command generates scaffold files', function () {
    $moduleName = 'TestModule';
    $submoduleName = 'TestSub';

    $backendPath = app_path("Modules/{$moduleName}/{$submoduleName}");
    $frontendPath = resource_path("js/pages/{$moduleName}/{$submoduleName}");

    if (File::exists($backendPath)) {
        File::deleteDirectory($backendPath);
    }
    if (File::exists($frontendPath)) {
        File::deleteDirectory($frontendPath);
    }

    $this->artisan("make:module {$moduleName}/{$submoduleName}")
        ->assertSuccessful();

    expect(File::exists("{$backendPath}/routes.php"))->toBeTrue();
    expect(File::exists("{$backendPath}/permissions.php"))->toBeTrue();
    expect(File::exists("{$frontendPath}/Index.tsx"))->toBeTrue();

    // Cleanup generated test files
    File::deleteDirectory(app_path("Modules/{$moduleName}"));
    File::deleteDirectory(resource_path("js/pages/{$moduleName}"));
    File::deleteDirectory(base_path("docs/project/{$moduleName}"));
});

test('authenticated user can access console user management index', function () {
    $user = User::factory()->create();
    $role = Role::findOrCreate('Super System', 'web');
    $user->assignRole($role);

    $response = $this->actingAs($user)->get(route('console.user-management.index'));

    $response->assertStatus(200);
});

test('authenticated user can access access control matrix', function () {
    $user = User::factory()->create();
    $role = Role::findOrCreate('Super System', 'web');
    $user->assignRole($role);

    $response = $this->actingAs($user)->get(route('console.access-control.index'));

    $response->assertStatus(200);
});

test('authenticated user can access system settings index', function () {
    $user = User::factory()->create();
    $role = Role::findOrCreate('Super System', 'web');
    $user->assignRole($role);

    $response = $this->actingAs($user)->get(route('console.system-setting.index'));

    $response->assertStatus(200);
});

test('authenticated user can access audit logs index', function () {
    $user = User::factory()->create();
    $role = Role::findOrCreate('Super System', 'web');
    $user->assignRole($role);

    $response = $this->actingAs($user)->get(route('console.audit-log.index'));

    $response->assertStatus(200);
});

test('authenticated user can access profile index', function () {
    $user = User::factory()->create();
    $role = Role::findOrCreate('Super System', 'web');
    $user->assignRole($role);

    $response = $this->actingAs($user)->get(route('console.profile.index'));

    $response->assertStatus(200);
});
