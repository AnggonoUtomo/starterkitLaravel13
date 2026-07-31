<?php

declare(strict_types=1);

namespace App\Modules\Console\Dashboard\Contracts;

interface DashboardModuleContract
{
    /**
     * Get aggregate statistics for the dashboard.
     *
     * @return array<string, mixed>
     */
    public function getDashboardStats(): array;
}
