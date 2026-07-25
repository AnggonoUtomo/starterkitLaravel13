<?php

namespace App\Modules\Console\UserManagement\Providers;

use App\Modules\Console\UserManagement\Contracts\UserModuleContract;
use App\Modules\Console\UserManagement\Integration\UserIntegrationService;
use Illuminate\Support\ServiceProvider;

class UserManagementServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(UserModuleContract::class, UserIntegrationService::class);
    }

    public function boot(): void {}
}
