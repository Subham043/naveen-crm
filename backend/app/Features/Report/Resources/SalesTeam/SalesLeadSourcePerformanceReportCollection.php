<?php

namespace App\Features\Report\Resources\SalesTeam;

use App\Features\Quotation\Enums\LeadSource;
use Illuminate\Http\Resources\Json\JsonResource;


class SalesLeadSourcePerformanceReportCollection extends JsonResource
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
			'lead_source' => LeadSource::getValue($this->lead_source),
			'total_leads' => $this->total_leads,
			'approved' => $this->approved,
			'total_revenue' => $this->total_revenue,
		];
	}
}
