<?php

declare(strict_types=1);

use App\Modules\Console\AuditLog\Services\AuditLogQueryService;
use App\Modules\Console\UserManagement\Domain\Entities\User;
use App\Shared\Events\UserLoggedIn;
use App\Shared\Listeners\AuditTrailListener;

test('audit trail listener records domain event via audit log service', function () {
    $user = User::factory()->create();

    $event = new UserLoggedIn([
        'user_id' => $user->id,
        'email' => $user->email,
        'guard' => 'web',
        'ip' => '127.0.0.1',
    ], $user->id);

    $listener = app(AuditTrailListener::class);
    $listener->handle($event);

    $queryService = app(AuditLogQueryService::class);
    $logs = $queryService->getPaginatedLogs(10, 'UserLoggedIn');

    expect($logs->total())->toBeGreaterThanOrEqual(1);
});
