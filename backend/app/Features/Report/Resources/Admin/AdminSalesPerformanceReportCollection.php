<?php

namespace App\Features\Report\Resources\Admin;

use App\Features\Quotation\Resources\QuotationUserCollection;
use Illuminate\Http\Resources\Json\JsonResource;


class AdminSalesPerformanceReportCollection extends JsonResource
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
			'period' => $this->period,
			'sales_user_id' => $this->sales_user_id,
			'total_leads' => $this->total_leads,
			'converted_leads' => $this->converted_leads,
			'total_revenue' => $this->total_revenue,
			'total_profit' => $this->total_profit,
			'conversion_rate' => $this->conversion_rate,
			'sales_user_info' => $this->sales_user_id ? QuotationUserCollection::make($this->salesUser) : null,
		];
	}
}
