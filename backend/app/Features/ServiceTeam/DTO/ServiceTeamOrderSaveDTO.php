<?php

namespace App\Features\ServiceTeam\DTO;

use App\Features\ServiceTeam\Requests\ServiceTeamOrderSaveRequests;
use Illuminate\Support\Collection;

final class ServiceTeamOrderSaveDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $phone,
        public readonly string $country_code,
        public readonly string $billing_address,
        public readonly string $shipping_address,
        public readonly string $part_year,
        public readonly string $part_model,
        public readonly string $part_make,
        public readonly string $part_name,
        public readonly string $part_description,
        public readonly float $sale_price,
        public readonly float $cost_price,
        public readonly float $shipping_cost,
        public readonly bool $yard_located,
        public readonly int $payment_status,
        public readonly ?int $payment_card_type,
        public readonly ?int $payment_gateway,
        public readonly ?string $transaction_id,
        public readonly int $invoice_status,
        public readonly int $shipment_status,
        public readonly int $order_status,
        public readonly int $tracking_status,
        public readonly ?string $tracking_details,
    ) {}

    /**
     * @param ServiceTeamOrderSaveRequests $request
     * @return self
     */
    public static function fromRequest(ServiceTeamOrderSaveRequests $request): self
    {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            phone: $request->validated('phone'),
            country_code: $request->validated('country_code'),
            billing_address: $request->validated('billing_address'),
            shipping_address: $request->validated('shipping_address'),
            part_year: $request->validated('part_year'),
            part_model: $request->validated('part_model'),
            part_make: $request->validated('part_make'),
            part_name: $request->validated('part_name'),
            part_description: $request->validated('part_description'),
            sale_price: $request->validated('sale_price'),
            cost_price: $request->validated('cost_price'),
            shipping_cost: $request->validated('shipping_cost'),
            yard_located: $request->validated('yard_located'),
            payment_status: $request->validated('payment_status'),
            payment_card_type: $request->validated('payment_card_type'),
            payment_gateway: $request->validated('payment_gateway'),
            transaction_id: $request->validated('transaction_id'),
            invoice_status: $request->validated('invoice_status'),
            shipment_status: $request->validated('shipment_status'),
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'country_code' => $this->country_code,
            'billing_address' => $this->billing_address,
            'shipping_address' => $this->shipping_address,
            'part_year' => $this->part_year,
            'part_model' => $this->part_model,
            'part_make' => $this->part_make,
            'part_name' => $this->part_name,
            'part_description' => $this->part_description,
            'yard_located' => $this->yard_located,
            'payment_status' => $this->payment_status,
            'payment_card_type' => $this->payment_card_type,
            'payment_gateway' => $this->payment_gateway,
            'transaction_id' => $this->transaction_id,
            'invoice_status' => $this->invoice_status,
            'shipment_status' => $this->shipment_status,
            'order_status' => $this->order_status,
            'tracking_status' => $this->tracking_status,
            'sale_price' => $this->sale_price,
            'cost_price' => $this->cost_price,
            'shipping_cost' => $this->shipping_cost,
        ];

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