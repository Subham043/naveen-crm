<?php

namespace App\Features\Report\Resources\SalesTeam;

use Illuminate\Http\Resources\Json\JsonResource;


class SalesApprovalTurnAroundReportCollection extends JsonResource
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
			'avg_approval_hours' => $this->avg_approval_hours,
		];
	}
}
