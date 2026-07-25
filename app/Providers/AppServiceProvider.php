<?php

namespace App\Providers;

use App\Modules\Console\SystemSetting\Services\SettingService;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );

        if ($this->app->bound('db') && ! $this->app->runningInConsole()) {
            $settings = app(SettingService::class);
            $settings->applyMailSettings();
            $settings->applyLocalizationSettings();
            $settings->applySecurityPolicy();
            $settings->applyPasswordPolicy();
            $settings->applyBrandingSettings();
        }
    }
}
