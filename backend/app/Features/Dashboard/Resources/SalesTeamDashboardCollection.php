<?php

namespace App\Features\Dashboard\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class SalesTeamDashboardCollection extends JsonResource
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
			"totalOrders" => $this['totalOrders'],
			"totalWebsiteLeadOrders" => $this['totalWebsiteLeadOrders'],
			"totalLeadOrders" => $this['totalLeadOrders'],
			"totalCallOrders" => $this['totalCallOrders'],
			"totalDraftOrders" => $this['totalDraftOrders'],
			"totalApprovalPendingOrders" => $this['totalApprovalPendingOrders'],
			"totalApprovedOrders" => $this['totalApprovedOrders'],
			"totalRejectedOrders" => $this['totalRejectedOrders'],
		];
	}
}
