<?php

namespace App\Modules\Console\AuditLog\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Console\AuditLog\Services\AuditLogQueryService;
use App\Modules\Console\SystemSetting\Services\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    public function __construct(
        protected AuditLogQueryService $queryService
    ) {}

    public function index(Request $request): Response
    {
        $paginationSettings = app(SettingService::class)->getPaginationSettings();
        $defaultPerPage = (int) ($paginationSettings['default_per_page'] ?? 10);
        $perPage = (int) $request->query('per_page', $defaultPerPage);

        $logs = $this->queryService->getPaginatedLogs(
            perPage: $perPage,
            search: $request->query('search')
        );

        return Inertia::render('Console/AuditLog/Index', [
            'title' => 'System Audit Logs',
            'logs' => $logs,
            'filters' => [
                'search' => $request->query('search', ''),
            ],
        ]);
    }
}
