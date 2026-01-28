<?php

namespace App\Features\Timeline\Collections;

use Illuminate\Support\Collection;
use App\Features\Timeline\DTO\YardTimelineDTO;

/**
 * @extends Collection<int, YardTimelineDTO>
 */
final class YardTimelineDTOCollection extends Collection
{
    /**
     * @param iterable<YardTimelineDTO> $items
     */
    public function __construct($items = [])
    {
        foreach ($items as $item) {
            if (!$item instanceof YardTimelineDTO) {
                throw new \InvalidArgumentException(
                    'YardTimelineDTOCollection accepts only YardTimelineDTO'
                );
            }
        }

        parent::__construct($items);
    }

    /**
     * Named constructor from request
     *
     * @param array<int, array{yard: string, id?: int}> $yards
     */
    public static function fromRequest(array $yards): self
    {
        $dtos = [];

        foreach ($yards as $yard) {
            $dtos[] = new YardTimelineDTO(
                yard: $yard['yard'],
                id: $yard['id'] ?? null
            );
        }

        return new self($dtos);
    }

    /**
     * Convert to DB payload
     * IMPORTANT: returns ARRAY, not Collection
     */
    public function toDatabaseArray(): array
    {
        $result = [];

        foreach ($this->items as $dto) {
            $result[] = $dto->toArray();
        }

        return $result;
    }
}
