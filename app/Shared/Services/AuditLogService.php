<?php

declare(strict_types=1);

namespace App\Shared\Services;

use App\Modules\Console\SystemSetting\Services\SettingService;
use App\Shared\Contracts\DomainEventContract;
use Illuminate\Support\Facades\Log;

class AuditLogService
{
    /**
     * Record a custom audit trail action into daily log.
     *
     * @param  array<string, mixed>  $payload
     */
    public function log(string $eventName, array $payload = [], int|string|null $causedByUserId = null): void
    {
        $security = app(SettingService::class)->getSecurityPolicy();

        if (array_key_exists('audit_sensitive_actions', $security) && ! $security['audit_sensitive_actions']) {
            return;
        }

        Log::channel('daily')->info('[AUDIT_TRAIL] '.$eventName, [
            'caused_by_user_id' => $causedByUserId ?? auth()->id(),
            'payload' => $payload,
            'timestamp' => now()->toIso8601String(),
        ]);
    }

    /**
     * Record a domain event into audit logs.
     */
    public function recordEvent(DomainEventContract $event): void
    {
        $this->log($event->getEventName(), $event->getPayload(), $event->getCausedByUserId());
    }
}
