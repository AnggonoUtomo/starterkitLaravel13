<?php

declare(strict_types=1);

namespace App\Shared\Listeners;

use App\Shared\Contracts\DomainEventContract;
use App\Shared\Services\AuditLogService;

class AuditTrailListener
{
    public function __construct(
        protected AuditLogService $auditLogService
    ) {}

    /**
     * Handle incoming domain events and record them in the Audit Log.
     */
    public function handle(DomainEventContract $event): void
    {
        $this->auditLogService->recordEvent($event);
    }
}
