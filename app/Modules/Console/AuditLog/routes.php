<?php

use App\Modules\Console\AuditLog\Http\Controllers\AuditLogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('console/audit-logs')
    ->name('console.audit-log.')
    ->group(function () {
        Route::get('/', [AuditLogController::class, 'index'])->name('index');
    });
