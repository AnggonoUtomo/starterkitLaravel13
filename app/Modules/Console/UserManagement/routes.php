<?php

use App\Modules\Console\UserManagement\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('console/users')
    ->name('console.user-management.')
    ->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');

        Route::post('/{user}/impersonate', [UserController::class, 'impersonate'])->name('impersonate');
        Route::post('/stop-impersonating', [UserController::class, 'stopImpersonating'])->name('stop-impersonating');
    });
