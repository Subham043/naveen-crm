<?php

namespace App\Features\Report\Resources\SalesTeam;

use Illuminate\Http\Resources\Json\JsonResource;


class SalesPerformanceReportCollection extends JsonResource
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
			'total_leads' => $this->total_leads,
			'converted_leads' => $this->converted_leads,
			'conversion_rate' => $this->conversion_rate,
		];
	}
}
