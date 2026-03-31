<?php

namespace App\Features\Order\DTO;

use App\Features\Order\Requests\OrderSaveRequests;
use Illuminate\Support\Collection;

final class OrderSaveDTO
{
    public function __construct(
        public readonly int $yard_located,
        public readonly int $payment_status,
        public readonly ?int $payment_card_type,
        public readonly ?int $payment_gateway,
        public readonly ?string $transaction_id,
        public readonly int $invoice_status,
        public readonly int $po_status,
        public readonly int $order_status,
        public readonly int $tracking_status,
        public readonly ?string $tracking_details,
    ) {}

    /**
     * @param OrderSaveRequests $request
     * @return self
     */
    public static function fromRequest(OrderSaveRequests $request): self
    {
        return new self(
            yard_located: $request->validated('yard_located'),
            payment_status: $request->validated('payment_status'),
            payment_card_type: $request->validated('payment_card_type'),
            payment_gateway: $request->validated('payment_gateway'),
            transaction_id: $request->validated('transaction_id'),
            invoice_status: $request->validated('invoice_status'),
            po_status: $request->validated('po_status'),
            order_status: $request->validated('order_status'),
            tracking_status: $request->validated('tracking_status'),
            tracking_details: $request->validated('tracking_details'),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $data = [
            'yard_located' => $this->yard_located,
            'payment_status' => $this->payment_status,
            'payment_card_type' => $this->payment_card_type,
            'transaction_id' => $this->transaction_id,
            'invoice_status' => $this->invoice_status,
            'po_status' => $this->po_status,
            'order_status' => $this->order_status,
            'tracking_status' => $this->tracking_status,
        ];

        if ($this->tracking_details) {
            $data['tracking_details'] = $this->tracking_details;
        }
        
        if ($this->payment_gateway) {
            $data['payment_gateway'] = $this->payment_gateway;
        }

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, OrderSaveDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}