<?php

namespace App\Features\SalesTeam\Events;

use App\Features\Quotation\Models\Quotation;
use App\Features\SalesTeam\DTO\SalesQuotationSaveDTO;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SalesQuotationCreated implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Quotation $quotation,
        public SalesQuotationSaveDTO $salesQuotationSaveDTO,
        public int $userId,
        public string $userName,
        public string $userEmail,
    ) {
    }
}
