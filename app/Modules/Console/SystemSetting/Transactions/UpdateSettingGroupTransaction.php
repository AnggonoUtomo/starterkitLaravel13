<?php

declare(strict_types=1);

namespace App\Modules\Console\SystemSetting\Transactions;

use App\Modules\Console\SystemSetting\Models\SystemSetting;

final class UpdateSettingGroupTransaction
{
    /**
     * Execute atomic setting group update transaction.
     *
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    public function execute(string $group, array $payload): array
    {
        return SystemSetting::setGroup($group, $payload);
    }
}
