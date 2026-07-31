<?php

declare(strict_types=1);

use App\Modules\Console\Dashboard\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('console')
    ->name('console.')
    ->group(function () {
        Route::get('/', function () {
            return redirect()->route('console.dashboard.index');
        });

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    });
