<?php

namespace App\Modules\Console\SystemSetting\Providers;

use App\Modules\Console\SystemSetting\Contracts\SettingModuleContract;
use App\Modules\Console\SystemSetting\Integration\SettingIntegrationService;
use Illuminate\Support\ServiceProvider;

class SystemSettingServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(SettingModuleContract::class, SettingIntegrationService::class);
    }

    public function boot(): void {}
}
