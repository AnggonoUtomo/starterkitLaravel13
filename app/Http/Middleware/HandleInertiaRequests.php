<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Modules\Console\SystemSetting\Services\SettingService;
use App\Modules\Console\UserManagement\Domain\Entities\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        /** @var User|null $user */
        $user = $request->user();
        $settingService = app(SettingService::class);
        $branding = $settingService->getBrandingSettings();

        return array_merge(parent::share($request), [
            'name' => $branding['app_name'] ?? config('app.name'),
            'branding' => $branding,
            'localization' => $settingService->getLocalizationSettings(),
            'pagination' => $settingService->getPaginationSettings(),
            'securityPolicy' => $settingService->getSecurityPolicy(),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'auth' => [
                'user' => $user ? $this->sharedUser($user) : null,
                'super' => $user ? $user->isSuperSystem() : false,
                'roles' => $user ? $user->getRoleNames()->mapWithKeys(fn ($r) => [$r => true])->toArray() : [],
                'permissions' => $user ? $user->getAllPermissions()->pluck('name')->mapWithKeys(fn ($p) => [$p => true])->toArray() : [],
                'impersonator' => $request->session()->get('impersonator_id') ? [
                    'id' => $request->session()->get('impersonator_id'),
                    'name' => $request->session()->get('impersonator_name'),
                ] : null,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ]);
    }

    /**
     * Get array representation of shared user attributes.
     *
     * @return array<string, mixed>
     */
    private function sharedUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at,
            'two_factor_enabled' => ! is_null($user->two_factor_secret),
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];
    }
}
