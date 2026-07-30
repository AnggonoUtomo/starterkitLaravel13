<?php

declare(strict_types=1);

use App\Modules\Console\Profile\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('console/profile')
    ->name('console.profile.')
    ->group(function () {
        Route::get('/', [ProfileController::class, 'index'])->name('index');
    });
