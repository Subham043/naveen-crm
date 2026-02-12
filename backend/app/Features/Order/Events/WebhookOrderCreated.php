<?php

namespace App\Features\Order\Events;

use App\Features\Order\DTO\OrderWebhookCreateDTO;
use App\Features\Order\Models\Order;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WebhookOrderCreated implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Order $order,
        public OrderWebhookCreateDTO $orderCreateDTO,
    ) {
    }
}
