<?php

namespace App\Features\Timeline\DTO;


final class YardTimelineDTO
{
    public function __construct(
        public readonly string $yard,
        public readonly ?int $id = null,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return array_filter(
            [
                'id'   => $this->id,
                'yard' => $this->yard,
            ],
            static fn ($v) => $v !== null
        );
    }
}