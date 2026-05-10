<?php

namespace App\Features\SalesTeam\Events;

use App\Features\Quotation\Models\Quotation;
use App\Features\Users\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AssignSalesQuotationToAgent implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Quotation $quotation,
        public User $user,
    ) {
    }
}
