<?php

declare(strict_types=1);

namespace App\Modules\Console\AuditLog\Events;

use App\Modules\Console\AuditLog\Domain\Events\AuditLogViewed as DomainAuditLogViewed;

class AuditLogViewed extends DomainAuditLogViewed {}
