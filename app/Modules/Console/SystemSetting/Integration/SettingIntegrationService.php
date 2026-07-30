<?php

declare(strict_types=1);

namespace App\Modules\Console\SystemSetting\Integration;

use App\Modules\Console\SystemSetting\Contracts\SettingModuleContract;
use App\Modules\Console\SystemSetting\Services\SettingService;

final class SettingIntegrationService implements SettingModuleContract
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    public function getGroupSettings(string $group): array
    {
        return $this->settingService->getGroupSettings($group);
    }

    public function formatDateTime(?\DateTimeInterface $date, string $type = 'datetime'): ?string
    {
        return $this->settingService->formatDateTime($date, $type);
    }
}
