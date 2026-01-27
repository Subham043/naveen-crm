<?php

namespace App\Features\ServiceTeam\DTO;

use Illuminate\Support\Collection;

final class YardDTO
{
    public function __construct(
        public readonly string $yard,
        public readonly ?int $id,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $data = [
            'yard' => $this->yard,
        ];

        if ($this->id) {
            $data['id'] = $this->id;
        }

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, YardDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}