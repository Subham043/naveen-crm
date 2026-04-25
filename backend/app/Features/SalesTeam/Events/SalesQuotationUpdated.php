<?php

namespace App\Features\SalesTeam\Events;

use App\Features\Quotation\Models\Quotation;
use App\Features\SalesTeam\DTO\SalesQuotationSaveDTO;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SalesQuotationUpdated implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Quotation $quotation,
        public array $oldValues,
        public SalesQuotationSaveDTO $dto,
        public int $userId,
        public string $userName,
        public string $userEmail,
        public string $comment
    ) {
    }
}
