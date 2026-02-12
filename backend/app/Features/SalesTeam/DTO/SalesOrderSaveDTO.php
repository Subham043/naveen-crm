<?php

namespace App\Features\SalesTeam\DTO;

use App\Features\SalesTeam\Requests\SalesOrderSaveRequests;
use Illuminate\Support\Collection;

final class SalesOrderSaveDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly bool $is_active,
        public readonly int $lead_source,
        public readonly ?string $phone,
        public readonly ?string $country_code,
        public readonly ?string $billing_address,
        public readonly ?string $part_year,
        public readonly ?string $part_model,
        public readonly ?string $part_name,
        public readonly ?string $part_description,
    ) {}

    /**
     * @param SalesOrderSaveRequests $request
     * @return self
     */
    public static function fromRequest(SalesOrderSaveRequests $request): self
    {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            is_active: $request->validated('is_active'),
            lead_source: $request->validated('lead_source'),
            phone: $request->validated('phone'),
            country_code: $request->validated('country_code'),
            billing_address: $request->validated('billing_address'),
            part_year: $request->validated('part_year'),
            part_model: $request->validated('part_model'),
            part_name: $request->validated('part_name'),
            part_description: $request->validated('part_description'),
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

        if ($this->part_year) {
            $data['part_year'] = $this->part_year;
        }

        if ($this->part_model) {
            $data['part_model'] = $this->part_model;
        }

        if ($this->part_name) {
            $data['part_name'] = $this->part_name;
        }

        if ($this->part_description) {
            $data['part_description'] = $this->part_description;
        }

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, SalesOrderSaveDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}