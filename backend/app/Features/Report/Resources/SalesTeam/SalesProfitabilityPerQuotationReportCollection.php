<?php

namespace App\Features\Report\Resources\SalesTeam;

use Illuminate\Http\Resources\Json\JsonResource;


class SalesProfitabilityPerQuotationReportCollection extends JsonResource
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
			'id' => $this->id,
			'sale_price' => $this->sale_price,
			'cost_price' => $this->cost_price,
			'shipping_cost' => $this->shipping_cost,
			'tax' => $this->tax,
			'gross_profit' => $this->gross_profit,
		];
	}
}
