<?php

namespace App\Features\Report\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;


class AdminConversionFunnelReportCollection extends JsonResource
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
			'total_quotations' => $this->total_quotations,
			'approved_quotations' => $this->approved_quotations,
			'rejected_quotations' => $this->rejected_quotations,
		];
	}
}
