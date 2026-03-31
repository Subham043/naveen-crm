<?php

namespace App\Features\SalesTeam\DTO;

use App\Features\SalesTeam\Requests\SalesQuotationSaveRequests;
use Illuminate\Support\Collection;

final class SalesQuotationSaveDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly bool $is_active,
        public readonly bool $quotation_sent,
        public readonly int $lead_source,
        public readonly ?string $phone,
        public readonly ?string $country_code,
        public readonly ?string $billing_address,
        public readonly ?string $shipping_address,
        public readonly ?string $part_year,
        public readonly ?string $part_model,
        public readonly ?string $part_make,
        public readonly ?string $part_name,
        public readonly ?string $part_number,
        public readonly ?string $part_warranty,
        public readonly ?string $part_description,
        public readonly ?float $sale_price,
        public readonly ?float $cost_price,
        public readonly ?float $shipping_cost,
    ) {}

    /**
     * @param SalesOrderSaveRequests $request
     * @return self
     */
    public static function fromRequest(SalesQuotationSaveRequests $request): self
    {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            is_active: $request->validated('is_active'),
            quotation_sent: $request->validated('quotation_sent'),
            lead_source: $request->validated('lead_source'),
            phone: $request->validated('phone'),
            country_code: $request->validated('country_code'),
            billing_address: $request->validated('billing_address'),
            shipping_address: $request->validated('shipping_address'),
            part_year: $request->validated('part_year'),
            part_model: $request->validated('part_model'),
            part_make: $request->validated('part_make'),
            part_name: $request->validated('part_name'),
            part_number: $request->validated('part_number'),
            part_warranty: $request->validated('part_warranty'),
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
            'is_active' => $this->is_active,
            'quotation_sent' => $this->quotation_sent,
            'lead_source' => $this->lead_source,
        ];

        if ($this->phone) {
            $data['phone'] = $this->phone;
        }

        if ($this->country_code) {
            $data['country_code'] = $this->country_code;
        }

        if ($this->billing_address) {
            $data['billing_address'] = $this->billing_address;
        }

        if ($this->shipping_address) {
            $data['shipping_address'] = $this->shipping_address;
        }

        if ($this->part_year) {
            $data['part_year'] = $this->part_year;
        }

        if ($this->part_model) {
            $data['part_model'] = $this->part_model;
        }

        if ($this->part_make) {
            $data['part_make'] = $this->part_make;
        }

        if ($this->part_name) {
            $data['part_name'] = $this->part_name;
        }

        if ($this->part_number) {
            $data['part_number'] = $this->part_number;
        }

        if ($this->part_warranty) {
            $data['part_warranty'] = $this->part_warranty;
        }

        if ($this->part_description) {
            $data['part_description'] = $this->part_description;
        }

        if ($this->sale_price) {
            $data['sale_price'] = $this->sale_price;
        }

        if ($this->cost_price) {
            $data['cost_price'] = $this->cost_price;
        }

        if ($this->shipping_cost) {
            $data['shipping_cost'] = $this->shipping_cost;
        }

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, SalesQuotationSaveDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}