<?php

namespace App\Shared\Contracts;

interface DomainEventContract
{
    /**
     * Get the name of the domain event.
     */
    public function getEventName(): string;

    /**
     * Get the event payload as an associative array.
     *
     * @return array<string, mixed>
     */
    public function getPayload(): array;

    /**
     * Get the ID of the user who triggered the event, if applicable.
     */
    public function getCausedByUserId(): ?int;
}
