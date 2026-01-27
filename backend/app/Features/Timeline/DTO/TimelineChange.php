<?php

namespace App\Features\Timeline\DTO;

final class TimelineChange
{
    public function __construct(
        public readonly string $field,
        public readonly mixed $old,
        public readonly mixed $new,
    ) {}

    public static function fromValues(
        string $field,
        mixed $old,
        mixed $new
    ): self {
        return new self($field, $old, $new);
    }

    public function toArray(): array
    {
        return [
            'old' => [
                'field' => $this->field,
                'value' => $this->old,
            ],
            'new' => [
                'field' => $this->field,
                'value' => $this->new,
            ],
        ];
    }
}