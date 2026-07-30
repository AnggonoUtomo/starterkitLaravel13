<?php

declare(strict_types=1);

namespace App\Providers;

use App\Modules\Console\SystemSetting\Services\SettingService;
use App\Modules\Console\UserManagement\Domain\Entities\User;
use App\Shared\Contracts\DomainEventContract;
use App\Shared\Events\UserLoggedIn;
use App\Shared\Events\UserLoggedOut;
use App\Shared\Events\UserLoginFailed;
use App\Shared\Listeners\AuditTrailListener;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
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
        $this->registerDomainEventAuditListeners();
    }

    protected function registerDomainEventAuditListeners(): void
    {
        // 1. Listen to all Domain Events implementing DomainEventContract
        Event::listen(
            DomainEventContract::class,
            AuditTrailListener::class
        );

        // 2. Map standard Laravel Auth events to Domain Events
        Event::listen(Login::class, function (Login $event) {
            /** @var User $user */
            $user = $event->user;
            event(new UserLoggedIn([
                'user_id' => $user->id,
                'email' => $user->email,
                'guard' => $event->guard,
                'ip' => request()->ip(),
            ], $user->id));
        });

        Event::listen(Logout::class, function (Logout $event) {
            /** @var User|null $user */
            $user = $event->user;
            if ($user) {
                event(new UserLoggedOut([
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'guard' => $event->guard,
                    'ip' => request()->ip(),
                ], $user->id));
            }
        });

        Event::listen(Failed::class, function (Failed $event) {
            event(new UserLoginFailed([
                'email' => $event->credentials['email'] ?? null,
                'guard' => $event->guard,
                'ip' => request()->ip(),
            ], null));
        });
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
