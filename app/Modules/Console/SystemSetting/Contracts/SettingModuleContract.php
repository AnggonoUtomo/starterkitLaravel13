<?php

namespace App\Modules\Console\SystemSetting\Contracts;

interface SettingModuleContract
{
    /**
     * @return array<string, mixed>
     */
    public function getGroupSettings(string $group): array;

    /**
     * Format Carbon date according to system setting.
     */
    public function formatDateTime(?\DateTimeInterface $date, string $type = 'datetime'): ?string;
}
