<?php

namespace App\Modules\Console\SystemSetting\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Console\SystemSetting\Services\SystemHealthService;
use Inertia\Inertia;
use Inertia\Response;

class SystemSettingController extends Controller
{
    public function __construct(
        protected SystemHealthService $healthService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Console/SystemSetting/Index', [
            'title' => 'System Settings & Health Status',
            'health' => $this->healthService->getHealthStatus(),
            'modules' => $this->healthService->getDiscoveredModules(),
        ]);
    }
}
