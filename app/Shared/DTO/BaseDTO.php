<?php

namespace App\Shared\DTO;

use JsonSerializable;
use ReflectionClass;
use ReflectionProperty;

abstract class BaseDTO implements JsonSerializable
{
    /**
     * Convert DTO to an associative array.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $class = new ReflectionClass($this);
        $properties = $class->getProperties(ReflectionProperty::IS_PUBLIC);
        $data = [];

        foreach ($properties as $property) {
            $value = $property->getValue($this);
            if ($value instanceof BaseDTO) {
                $value = $value->toArray();
            }
            $data[$property->getName()] = $value;
        }

        return $data;
    }

    /**
     * Serialize to JSON array.
     *
     * @return array<string, mixed>
     */
    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}
