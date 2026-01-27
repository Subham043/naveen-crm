<?php

namespace App\Features\Order\DTO;

use App\Features\Order\Requests\OrderApprovalRequests;
use Illuminate\Support\Collection;

final class OrderApprovalDTO
{
    public function __construct(
        public readonly int $order_status,
    ) {}

    /**
     * @param OrderApprovalRequests $request
     * @return self
     */
    public static function fromRequest(OrderApprovalRequests $request): self
    {
        return new self(
            order_status: $request->validated('order_status'),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $data = [
            'order_status' => $this->order_status,
        ];

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, OrderApprovalDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}