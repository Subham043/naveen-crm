<?php

namespace App\Features\Report\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class SalesReportCollection extends JsonResource
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
			'date' => $this->date,
			'total_orders' => $this->total_orders,
			'total_sales' => $this->total_sales,
			'total_tax' => $this->total_tax,
			'total_profit' => $this->total_profit,
		];
	}
}
