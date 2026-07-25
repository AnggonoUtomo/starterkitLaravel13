<?php

namespace App\Modules\Console\Profile\Providers;

use App\Modules\Console\Profile\Contracts\ProfileModuleContract;
use App\Modules\Console\Profile\Integration\ProfileIntegrationService;
use Illuminate\Support\ServiceProvider;

class ProfileServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(ProfileModuleContract::class, ProfileIntegrationService::class);
    }

    public function boot(): void {}
}
