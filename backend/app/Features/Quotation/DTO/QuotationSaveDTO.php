<?php

namespace App\Features\Quotation\DTO;

use App\Features\Quotation\Requests\QuotationSaveRequests;
use Illuminate\Support\Collection;

final class QuotationSaveDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly bool $quotation_sent,
        public readonly string $phone,
        public readonly string $country_code,
        public readonly string $billing_address,
        public readonly string $shipping_address,
        public readonly string $part_year,
        public readonly string $part_model,
        public readonly string $part_make,
        public readonly string $part_name,
        public readonly string $part_number,
        public readonly string $part_description,
        public readonly float $sale_price,
        public readonly float $cost_price,
        public readonly float $shipping_cost,
    ) {}

    /**
     * @param QuotationSaveRequests $request
     * @return self
     */
    public static function fromRequest(QuotationSaveRequests $request): self
    {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            quotation_sent: $request->validated('quotation_sent'),
            phone: $request->validated('phone'),
            country_code: $request->validated('country_code'),
            billing_address: $request->validated('billing_address'),
            shipping_address: $request->validated('shipping_address'),
            part_year: $request->validated('part_year'),
            part_model: $request->validated('part_model'),
            part_make: $request->validated('part_make'),
            part_name: $request->validated('part_name'),
            part_number: $request->validated('part_number'),
            part_description: $request->validated('part_description'),
            sale_price: $request->validated('sale_price'),
            cost_price: $request->validated('cost_price'),
            shipping_cost: $request->validated('shipping_cost'),
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
            'quotation_sent' => $this->quotation_sent,
            'phone' => $this->phone,
            'country_code' => $this->country_code,
            'billing_address' => $this->billing_address,
            'shipping_address' => $this->shipping_address,
            'part_year' => $this->part_year,
            'part_model' => $this->part_model,
            'part_make' => $this->part_make,
            'part_name' => $this->part_name,
            'part_number' => $this->part_number,
            'part_description' => $this->part_description,
            'sale_price' => $this->sale_price,
            'cost_price' => $this->cost_price,
            'shipping_cost' => $this->shipping_cost,
        ];

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, QuotationSaveDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}