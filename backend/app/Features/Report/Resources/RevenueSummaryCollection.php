<?php

namespace App\Features\Report\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class RevenueSummaryCollection extends JsonResource
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
			'total_revenue' => $this->total_revenue,
			'total_cost' => $this->total_cost,
			'total_shipping' => $this->total_shipping,
			'total_tax' => $this->total_tax,
			'total_profit' => $this->total_profit,
		];
	}
}
