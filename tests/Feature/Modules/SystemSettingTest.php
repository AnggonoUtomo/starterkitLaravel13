<?php

declare(strict_types=1);

use App\Modules\Console\SystemSetting\Domain\Entities\SystemSetting;
use App\Modules\Console\SystemSetting\Domain\Events\SystemSettingUpdated;
use App\Modules\Console\SystemSetting\Services\SettingService;
use App\Modules\Console\SystemSetting\Services\SystemHealthService;
use Illuminate\Support\Facades\Event;

test('system setting service updates email settings and fires event', function () {
    Event::fake([SystemSettingUpdated::class]);

    $service = app(SettingService::class);
    $updated = $service->updateEmailSettings([
        'enabled' => true,
        'mailer' => 'smtp',
        'host' => 'smtp.mailtrap.io',
        'port' => 2525,
        'from_address' => 'noreply@system.local',
        'from_name' => 'System Mailer',
    ]);

    expect($updated['enabled'])->toBeTrue();
    expect($updated['host'])->toBe('smtp.mailtrap.io');

    Event::assertDispatched(SystemSettingUpdated::class);
});

test('system setting entity caches group and flushes on set', function () {
    SystemSetting::setGroup('pagination', ['default_per_page' => 25]);

    $retrieved = SystemSetting::getGroup('pagination');

    expect($retrieved['default_per_page'])->toBe(25);
});

test('system health service returns environment and database status', function () {
    $healthService = app(SystemHealthService::class);
    $status = $healthService->getHealthStatus();
    $env = $healthService->getEnvironmentInfo();

    expect($status)->toHaveKeys(['summary', 'checks', 'runtime']);
    expect($env)->toHaveKeys(['summary', 'groups']);
});
