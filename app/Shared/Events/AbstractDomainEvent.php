<?php

namespace App\Shared\Events;

use App\Shared\Contracts\DomainEventContract;
use Illuminate\Foundation\Events\Dispatchable;

abstract class AbstractDomainEvent implements DomainEventContract
{
    use Dispatchable;

    /**
     * @param  array<string, mixed>  $payload
     */
    public function __construct(
        public array $payload = [],
        public ?int $causedByUserId = null
    ) {
        $this->causedByUserId = $this->causedByUserId ?? auth()->id();
    }

    public function getEventName(): string
    {
        return class_basename(static::class);
    }

    public function getPayload(): array
    {
        return $this->payload;
    }

    public function getCausedByUserId(): ?int
    {
        return $this->causedByUserId;
    }
}
