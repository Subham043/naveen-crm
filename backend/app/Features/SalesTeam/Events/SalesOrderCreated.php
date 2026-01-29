<?php

namespace App\Features\SalesTeam\Events;

use App\Features\Order\Models\Order;
use App\Features\SalesTeam\DTO\SalesOrderSaveDTO;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SalesOrderCreated implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Order $order,
        public SalesOrderSaveDTO $salesOrderSaveDTO,
        public int $userId,
        public string $userName,
        public string $userEmail,
    ) {
    }
}
