<?php

namespace App\Features\Quotation\Events;

use App\Features\Quotation\DTO\QuotationWebhookCreateDTO;
use App\Features\Quotation\Models\Quotation;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WebhookQuotationCreated implements ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Quotation $quotation,
        public QuotationWebhookCreateDTO $quotationCreateDTO,
    ) {
    }
}
