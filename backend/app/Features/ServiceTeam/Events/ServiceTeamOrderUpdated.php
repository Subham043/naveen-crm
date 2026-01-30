<?php

namespace App\Features\ServiceTeam\Events;

use App\Features\Order\Models\Order;
use App\Features\ServiceTeam\DTO\ServiceTeamOrderSaveDTO;
use App\Features\Timeline\Collections\YardTimelineDTOCollection;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ServiceTeamOrderUpdated implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Order $order,
        public array $oldOrderValues,
        public ServiceTeamOrderSaveDTO $dto,
        public YardTimelineDTOCollection $oldYardValues,
        public ?YardTimelineDTOCollection $yards,
        public int $userId,
        public string $userName,
        public string $userEmail,
        public string $comment,
    ) {
    }
}
