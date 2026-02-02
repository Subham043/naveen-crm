<?php

namespace App\Features\Report\Resources;

use App\Features\Order\Resources\OrderUserCollection;
use Illuminate\Http\Resources\Json\JsonResource;


class AgentPerformanceReportCollection extends JsonResource
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
			'sales_user_id' => $this->sales_user_id,
			'total_leads' => $this->total_leads,
			'total_sales' => $this->total_sales,
			'total_profit' => $this->total_profit,
			'converted_leads' => $this->converted_leads,
			'conversion_rate' => $this->conversion_rate,
			'sales_user_info' => $this->sales_user_id ? OrderUserCollection::make($this->salesUser) : null,
		];
	}
}
