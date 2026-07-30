<?php

declare(strict_types=1);

use App\Modules\Console\SystemSetting\Http\Controllers\SystemSettingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('console/system-settings')
    ->name('console.system-setting.')
    ->group(function () {
        Route::get('/', [SystemSettingController::class, 'index'])->name('index');
        Route::put('/email', [SystemSettingController::class, 'updateEmail'])->name('update-email');
        Route::post('/email/test', [SystemSettingController::class, 'sendTestEmail'])->name('send-test-email');
        Route::post('/branding', [SystemSettingController::class, 'updateBranding'])->name('update-branding');
        Route::put('/localization', [SystemSettingController::class, 'updateLocalization'])->name('update-localization');
        Route::put('/pagination', [SystemSettingController::class, 'updatePagination'])->name('update-pagination');
        Route::put('/security-policy', [SystemSettingController::class, 'updateSecurityPolicy'])->name('update-security-policy');
        Route::put('/password-policy', [SystemSettingController::class, 'updatePasswordPolicy'])->name('update-password-policy');
        Route::put('/maintenance-mode', [SystemSettingController::class, 'updateMaintenanceMode'])->name('update-maintenance-mode');
        Route::put('/map', [SystemSettingController::class, 'updateMap'])->name('update-map');
    });
