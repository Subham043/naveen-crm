<?php

namespace App\Features\Report\Resources\ServiceTeam;

use Illuminate\Http\Resources\Json\JsonResource;


class ServiceTeamPerformanceReportCollection extends JsonResource
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
			'total_comments' => $this->total_comments,
			'orders_handled' => $this->orders_handled,
			'performance_score' => $this->performance_score,
			'avg_comments_per_order' => $this->avg_comments_per_order,
		];
	}
}
