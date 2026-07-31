<?php

declare(strict_types=1);

namespace App\Modules\Console\Dashboard\DTO;

final class DashboardStatsDTO
{
    /**
     * @param array<string, mixed> $systemHealth
     * @param array<int, array<string, mixed>> $recentActivities
     */
    public function __construct(
        public readonly int $totalUsers,
        public readonly int $activeRoles,
        public readonly int $totalAuditLogs,
        public readonly array $systemHealth,
        public readonly array $recentActivities
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'total_users' => $this->totalUsers,
            'active_roles' => $this->activeRoles,
            'total_audit_logs' => $this->totalAuditLogs,
            'system_health' => $this->systemHealth,
            'recent_activities' => $this->recentActivities,
        ];
    }
}
