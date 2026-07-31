<?php

declare(strict_types=1);

namespace App\Modules\Console\SystemSetting\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Console\SystemSetting\Http\Requests\SendTestEmailRequest;
use App\Modules\Console\SystemSetting\Http\Requests\UpdateBrandingSettingsRequest;
use App\Modules\Console\SystemSetting\Http\Requests\UpdateEmailSettingsRequest;
use App\Modules\Console\SystemSetting\Http\Requests\UpdateLocalizationSettingsRequest;
use App\Modules\Console\SystemSetting\Http\Requests\UpdateMaintenanceModeRequest;
use App\Modules\Console\SystemSetting\Http\Requests\UpdateMapSettingsRequest;
use App\Modules\Console\SystemSetting\Http\Requests\UpdatePaginationSettingsRequest;
use App\Modules\Console\SystemSetting\Http\Requests\UpdatePasswordPolicyRequest;
use App\Modules\Console\SystemSetting\Http\Requests\UpdateSecurityPolicyRequest;
use App\Modules\Console\SystemSetting\Services\SettingService;
use App\Modules\Console\SystemSetting\Services\SystemHealthService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

final class SystemSettingController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:system_setting.manage'),
        ];
    }

    public function __construct(
        protected SettingService $settingService,
        protected SystemHealthService $healthService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Console/SystemSetting/Index', $this->settingService->getSystemSettingsViewProps($this->healthService));
    }

    public function updateEmail(UpdateEmailSettingsRequest $request): RedirectResponse
    {
        $this->settingService->updateEmailSettings($request->validated());

        return back()->with('success', 'Konfigurasi Email & SMTP berhasil diperbarui.');
    }

    public function sendTestEmail(SendTestEmailRequest $request): RedirectResponse
    {
        $data = $request->validated();

        try {
            Mail::raw('Halo, ini adalah email uji coba dari sistem '.config('app.name').'.', function ($message) use ($data) {
                $message->to($data['recipient'])
                    ->subject('Uji Coba Pengiriman Email System Setting');
            });

            return back()->with('success', 'Email uji coba berhasil dikirimkan ke '.$data['recipient']);
        } catch (\Throwable $e) {
            return back()->with('error', 'Gagal mengirim email uji coba: '.$e->getMessage());
        }
    }

    public function updateBranding(UpdateBrandingSettingsRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $logo = $request->file('logo');
        $favicon = $request->file('favicon');

        $this->settingService->updateBrandingSettings($validated, $logo, $favicon);

        return back()->with('success', 'Branding identitas aplikasi berhasil diperbarui.');
    }

    public function updateLocalization(UpdateLocalizationSettingsRequest $request): RedirectResponse
    {
        $this->settingService->updateLocalizationSettings($request->validated());

        return back()->with('success', 'Konfigurasi Zona Waktu dan Format Tanggal berhasil diperbarui.');
    }

    public function updatePagination(UpdatePaginationSettingsRequest $request): RedirectResponse
    {
        $this->settingService->updatePaginationSettings($request->validated());

        return back()->with('success', 'Pengaturan Default Pagination berhasil diperbarui.');
    }

    public function updateSecurityPolicy(UpdateSecurityPolicyRequest $request): RedirectResponse
    {
        $this->settingService->updateSecurityPolicy($request->validated());

        return back()->with('success', 'Kebijakan Keamanan Sistem berhasil diperbarui.');
    }

    public function updatePasswordPolicy(UpdatePasswordPolicyRequest $request): RedirectResponse
    {
        $this->settingService->updatePasswordPolicy($request->validated());

        return back()->with('success', 'Kebijakan Kata Sandi berhasil diperbarui.');
    }

    public function updateMaintenanceMode(UpdateMaintenanceModeRequest $request): RedirectResponse
    {
        $this->settingService->updateMaintenanceMode($request->validated());

        return back()->with('success', 'Pengaturan Mode Pemeliharaan berhasil diperbarui.');
    }

    public function updateMap(UpdateMapSettingsRequest $request): RedirectResponse
    {
        $this->settingService->updateMapSettings($request->validated());

        return back()->with('success', 'Konfigurasi Google Maps API berhasil diperbarui.');
    }
}
