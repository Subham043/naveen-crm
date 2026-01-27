<?php

namespace App\Features\Timeline\Collections;

use Illuminate\Support\Collection;
use App\Features\Timeline\DTO\TimelineChange;

/**
 * @extends \Illuminate\Support\Collection<int, TimelineChange>
 */
final class TimelineChangeCollection extends Collection
{

    /**
     * @param TimelineChange $item
     */
    public function add($item): self
    {
        if (!$item instanceof TimelineChange) {
            throw new \InvalidArgumentException('Only TimelineChange allowed');
        }

        return parent::add($item);
    }
    
    /**
     * @param TimelineChange $change
     */
    public function pushChange(TimelineChange $change): self
    {
        parent::push($change);
        return $this;
    }

    public function toArray(): array
    {
        return array_map(
            static fn (TimelineChange $c) => $c->toArray(),
            $this->items
        );
    }
}