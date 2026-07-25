<?php

namespace App\Modules\Console\AuditLog\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;

interface AuditLogModuleContract
{
    /**
     * @return LengthAwarePaginator<int, array<string, mixed>>
     */
    public function getPaginatedLogs(int $perPage = 15, ?string $search = null): LengthAwarePaginator;
}
