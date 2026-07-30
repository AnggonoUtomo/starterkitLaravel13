<?php

declare(strict_types=1);

use App\Modules\Console\UserManagement\Domain\Entities\User;
use App\Modules\Console\UserManagement\Domain\Events\UserCreated;
use App\Modules\Console\UserManagement\Domain\Events\UserDeleted;
use App\Modules\Console\UserManagement\Domain\Events\UserUpdated;
use App\Modules\Console\UserManagement\Services\UserService;
use App\Modules\Console\UserManagement\Transactions\CreateUserTransaction;
use App\Modules\Console\UserManagement\Transactions\UpdateUserTransaction;
use Illuminate\Support\Facades\Event;
use Spatie\Permission\Models\Role;

test('create user transaction executes atomically and dispatches event', function () {
    Event::fake([UserCreated::class]);

    $role = Role::findOrCreate('Admin', 'web');
    $transaction = app(CreateUserTransaction::class);

    $user = $transaction->execute([
        'name' => 'John Transaction User',
        'email' => 'john.transaction@example.com',
        'password' => 'password123',
        'roles' => ['Admin'],
    ]);

    expect($user)->toBeInstanceOf(User::class);
    expect($user->email)->toBe('john.transaction@example.com');
    expect($user->hasRole('Admin'))->toBeTrue();

    Event::assertDispatched(UserCreated::class);
});

test('update user transaction updates fields and roles', function () {
    Event::fake([UserUpdated::class]);

    $user = User::factory()->create(['name' => 'Original Name']);
    Role::findOrCreate('User', 'web');

    $transaction = app(UpdateUserTransaction::class);
    $updatedUser = $transaction->execute($user, [
        'name' => 'Updated Name',
        'email' => $user->email,
        'roles' => ['User'],
    ]);

    expect($updatedUser->name)->toBe('Updated Name');
    expect($updatedUser->hasRole('User'))->toBeTrue();

    Event::assertDispatched(UserUpdated::class);
});

test('user service handles deletion and impersonation flow', function () {
    Event::fake([UserDeleted::class]);

    $admin = User::factory()->create();
    $targetUser = User::factory()->create();

    $this->actingAs($admin);
    $service = app(UserService::class);

    // Impersonate
    $service->impersonate($targetUser);
    expect(session('impersonator_id'))->toBe($admin->id);
    expect(auth()->id())->toBe($targetUser->id);

    // Stop Impersonating
    $service->stopImpersonating();
    expect(session('impersonator_id'))->toBeNull();
    expect(auth()->id())->toBe($admin->id);

    // Delete
    $deleted = $service->deleteUser($targetUser);
    expect($deleted)->toBeTrue();
    Event::assertDispatched(UserDeleted::class);
});
