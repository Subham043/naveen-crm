<?php

namespace App\Features\SalesTeam\Events;

use App\Features\Order\Models\Order;
use App\Features\SalesTeam\DTO\SalesOrderSaveDTO;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SalesOrderUpdated implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Order $order,
        public array $oldValues,
        public SalesOrderSaveDTO $dto,
        public int $userId,
        public string $userName,
        public string $userEmail,
    ) {
    }
}
