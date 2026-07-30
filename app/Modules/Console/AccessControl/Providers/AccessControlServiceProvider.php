<?php

declare(strict_types=1);

namespace App\Modules\Console\AccessControl\Providers;

use App\Modules\Console\AccessControl\Contracts\RoleModuleContract;
use App\Modules\Console\AccessControl\Integration\RoleIntegrationService;
use Illuminate\Support\ServiceProvider;

class AccessControlServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(RoleModuleContract::class, RoleIntegrationService::class);
    }

    public function boot(): void {}
}
