<?php

namespace App\Features\Quotation\DTO;

use App\Features\Quotation\Requests\QuotationWebhookCreateRequests;
use Illuminate\Support\Collection;

final class QuotationWebhookCreateDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $phone,
        public readonly string $country_code,
        public readonly string $part_year,
        public readonly string $part_model,
        public readonly string $part_make,
        public readonly string $part_name,
        public readonly string $part_number,
        public readonly string $part_description,
    ) {}

    /**
     * @param QuotationWebhookCreateRequests $request
     * @return self
     */
    public static function fromRequest(QuotationWebhookCreateRequests $request): self
    {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            phone: $request->validated('phone'),
            country_code: $request->validated('country_code'),
            part_year: $request->validated('part_year'),
            part_model: $request->validated('part_model'),
            part_make: $request->validated('part_make'),
            part_name: $request->validated('part_name'),
            part_number: $request->validated('part_number'),
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
            'phone' => $this->phone,
            'country_code' => $this->country_code,
            'part_year' => $this->part_year,
            'part_model' => $this->part_model,
            'part_make' => $this->part_make,
            'part_name' => $this->part_name,
            'part_number' => $this->part_number,
            'part_description' => $this->part_description,
        ];

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, QuotationWebhookCreateDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}