<?php

namespace App\Modules\Console\AuditLog\Providers;

use App\Modules\Console\AuditLog\Contracts\AuditLogModuleContract;
use App\Modules\Console\AuditLog\Integration\AuditLogIntegrationService;
use Illuminate\Support\ServiceProvider;

class AuditLogServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AuditLogModuleContract::class, AuditLogIntegrationService::class);
    }

    public function boot(): void {}
}
