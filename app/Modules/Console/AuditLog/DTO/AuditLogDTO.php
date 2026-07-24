<?php

namespace App\Modules\Console\AuditLog\DTO;

use App\Shared\DTO\BaseDTO;

class AuditLogDTO extends BaseDTO
{
    /**
     * @param  array<string, mixed>  $payload
     */
    public function __construct(
        public string $id,
        public string $event_name,
        public ?int $caused_by_user_id,
        public ?string $caused_by_user_name,
        public array $payload,
        public string $timestamp
    ) {}
}
