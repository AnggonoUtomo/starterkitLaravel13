<?php

declare(strict_types=1);

namespace App\Modules\Console\Dashboard\Services;

use App\Modules\Console\AuditLog\Services\AuditLogQueryService;
use App\Modules\Console\Dashboard\Contracts\DashboardModuleContract;
use App\Modules\Console\Dashboard\DTO\DashboardStatsDTO;
use App\Modules\Console\SystemSetting\Services\SystemHealthService;
use App\Modules\Console\UserManagement\Domain\Entities\User;
use Spatie\Permission\Models\Role;

final class DashboardService implements DashboardModuleContract
{
    public function __construct(
        protected SystemHealthService $healthService,
        protected AuditLogQueryService $auditLogQueryService
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function getDashboardStats(): array
    {
        $totalUsers = User::count();
        $activeRoles = Role::count();

        $auditData = $this->auditLogQueryService->getPaginatedLogs(10, null, null);
        $totalAuditLogs = $auditData->total();
        $recentActivities = array_slice($auditData->items(), 0, 5);

        $systemHealth = $this->healthService->getHealthStatus();

        $dto = new DashboardStatsDTO(
            totalUsers: $totalUsers,
            activeRoles: $activeRoles,
            totalAuditLogs: $totalAuditLogs,
            systemHealth: $systemHealth,
            recentActivities: $recentActivities
        );

        return $dto->toArray();
    }
}
