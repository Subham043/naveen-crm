<?php

namespace App\Features\Report\Resources\SalesTeam;

use App\Features\Quotation\Enums\QuotationStatus;
use Illuminate\Http\Resources\Json\JsonResource;


class SalesPipelineStatusReportCollection extends JsonResource
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		return [
			'quotation_status' => QuotationStatus::getValue($this->quotation_status),
			'total_sales' => $this->total_sales,
			'total_revenue' => $this->total_revenue,
		];
	}
}
