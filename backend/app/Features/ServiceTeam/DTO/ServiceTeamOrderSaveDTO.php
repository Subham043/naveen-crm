<?php

namespace App\Features\ServiceTeam\DTO;

use App\Features\ServiceTeam\Requests\ServiceTeamOrderSaveRequests;
use Illuminate\Support\Collection;

final class ServiceTeamOrderSaveDTO
{
    public function __construct(
        public readonly bool $yard_located,
        public readonly int $payment_status,
        public readonly int $invoice_status,
        public readonly int $shipment_status,
        public readonly ?int $total_price,
        public readonly ?int $cost_price,
        public readonly ?int $shipping_cost,
        public readonly ?string $tracking_details,
    ) {}

    /**
     * @param ServiceTeamOrderSaveRequests $request
     * @return self
     */
    public static function fromRequest(ServiceTeamOrderSaveRequests $request): self
    {
        return new self(
            yard_located: $request->validated('yard_located'),
            payment_status: $request->validated('payment_status'),
            invoice_status: $request->validated('invoice_status'),
            shipment_status: $request->validated('shipment_status'),
            total_price: $request->validated('total_price'),
            cost_price: $request->validated('cost_price'),
            shipping_cost: $request->validated('shipping_cost'),
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
            'invoice_status' => $this->invoice_status,
            'shipment_status' => $this->shipment_status,
        ];

        if ($this->total_price) {
            $data['total_price'] = $this->total_price;
        }

        if ($this->cost_price) {
            $data['cost_price'] = $this->cost_price;
        }

        if ($this->shipping_cost) {
            $data['shipping_cost'] = $this->shipping_cost;
        }

        if ($this->tracking_details) {
            $data['tracking_details'] = $this->tracking_details;
        }

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, ServiceTeamOrderSaveDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}