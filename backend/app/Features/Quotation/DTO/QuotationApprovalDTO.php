<?php

namespace App\Features\Quotation\DTO;

use App\Features\Quotation\Requests\QuotationApprovalRequests;
use Illuminate\Support\Collection;

final class QuotationApprovalDTO
{
    public function __construct(
        public readonly int $quotation_status,
    ) {}

    /**
     * @param QuotationApprovalRequests $request
     * @return self
     */
    public static function fromRequest(QuotationApprovalRequests $request): self
    {
        return new self(
            quotation_status: $request->validated('quotation_status'),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $data = [
            'quotation_status' => $this->quotation_status,
        ];

        return $data;
    }

    /**
     * @extends \Illuminate\Support\Collection<int, QuotationApprovalDTO>
     */
    public function toCollection(): Collection
    {
        return collect($this->toArray());
    }
}