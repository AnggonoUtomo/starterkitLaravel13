<?php

declare(strict_types=1);

namespace App\Modules\Console\Dashboard\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Console\Dashboard\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

final class DashboardController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:dashboard.view', only: ['index']),
        ];
    }

    public function __construct(
        protected DashboardService $dashboardService
    ) {}

    public function index(): Response
    {
        $stats = $this->dashboardService->getDashboardStats();

        return Inertia::render('Console/Dashboard/Index', [
            'stats' => $stats,
        ]);
    }
}
