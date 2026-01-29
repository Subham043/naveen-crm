<?php

namespace App\Features\Order\Events;

use App\Features\Order\DTO\OrderApprovalDTO;
use App\Features\Order\Models\Order;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderApproval implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Order $order,
        public OrderApprovalDTO $orderApprovalDTO,
        public int $userId,
        public string $userName,
        public string $userEmail,
    ) {
    }
}
