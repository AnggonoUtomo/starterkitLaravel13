<?php

declare(strict_types=1);

namespace App\Modules\Console\AuditLog\Domain\Events;

use App\Shared\Events\AbstractDomainEvent;

class AuditLogViewed extends AbstractDomainEvent {}
