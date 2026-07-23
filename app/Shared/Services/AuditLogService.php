<?php

namespace App\Shared\Services;

use App\Shared\Contracts\DomainEventContract;
use Illuminate\Support\Facades\Log;

class AuditLogService
{
    /**
     * Record a domain event into audit logs.
     */
    public function recordEvent(DomainEventContract $event): void
    {
        Log::channel('daily')->info('[AUDIT_TRAIL] '.$event->getEventName(), [
            'caused_by_user_id' => $event->getCausedByUserId() ?? auth()->id(),
            'payload' => $event->getPayload(),
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
