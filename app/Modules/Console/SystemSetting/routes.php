<?php

use App\Modules\Console\SystemSetting\Http\Controllers\SystemSettingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('console/system-settings')
    ->name('console.system-setting.')
    ->group(function () {
        Route::get('/', [SystemSettingController::class, 'index'])->name('index');
    });
