<?php

namespace App\Features\Report\Resources\SalesTeam;

use Illuminate\Http\Resources\Json\JsonResource;


class SalesTrendReportCollection extends JsonResource
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
			'total_sales' => $this->total_sales,
			'total_revenue' => $this->total_revenue,
		];
	}
}
