<?php

namespace App\Modules\Console\AuditLog\Integration;

use App\Modules\Console\AuditLog\Contracts\AuditLogModuleContract;
use App\Modules\Console\AuditLog\Services\AuditLogQueryService;
use Illuminate\Pagination\LengthAwarePaginator;

class AuditLogIntegrationService implements AuditLogModuleContract
{
    public function __construct(
        protected AuditLogQueryService $queryService
    ) {}

    public function getPaginatedLogs(int $perPage = 15, ?string $search = null): LengthAwarePaginator
    {
        return $this->queryService->getPaginatedLogs($perPage, $search);
    }
}
