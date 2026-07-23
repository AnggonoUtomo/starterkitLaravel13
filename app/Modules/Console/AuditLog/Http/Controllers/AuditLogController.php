<?php

namespace App\Modules\Console\AuditLog\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Console\AuditLog\Services\AuditLogQueryService;
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
        $logs = $this->queryService->getPaginatedLogs(
            perPage: 15,
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
