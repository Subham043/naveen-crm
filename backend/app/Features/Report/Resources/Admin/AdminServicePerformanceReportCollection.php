<?php

namespace App\Features\Report\Resources\Admin;

use App\Features\Quotation\Resources\QuotationUserCollection;
use Illuminate\Http\Resources\Json\JsonResource;


class AdminServicePerformanceReportCollection extends JsonResource
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
			'user_id' => $this->user_id,
			'total_comments' => $this->total_comments,
			'orders_handled' => $this->orders_handled,
			'performance_percentage' => $this->performance_percentage,
			'user_info' => $this->user_id ? QuotationUserCollection::make($this->doneBy) : null,
		];
	}
}
