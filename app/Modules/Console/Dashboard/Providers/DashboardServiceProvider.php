<?php

declare(strict_types=1);

namespace App\Modules\Console\Dashboard\Providers;

use App\Modules\Console\Dashboard\Contracts\DashboardModuleContract;
use App\Modules\Console\Dashboard\Services\DashboardService;
use Illuminate\Support\ServiceProvider;

final class DashboardServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(DashboardModuleContract::class, DashboardService::class);
    }

    public function boot(): void
    {
        //
    }
}
