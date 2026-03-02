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
			"totalQuotations" => $this['totalQuotations'],
			"totalWebsiteLeadQuotations" => $this['totalWebsiteLeadQuotations'],
			"totalCallQuotations" => $this['totalCallQuotations'],
			"totalDraftQuotations" => $this['totalDraftQuotations'],
			"totalApprovalPendingQuotations" => $this['totalApprovalPendingQuotations'],
			"totalApprovedQuotations" => $this['totalApprovedQuotations'],
			"totalRejectedQuotations" => $this['totalRejectedQuotations'],
			"salePrice" => $this['salePrice'],
			"costPrice" => $this['costPrice'],
			"shippingCost" => $this['shippingCost'],
			"totalSalesTax" => $this['totalSalesTax'],
			"totalGrossProfit" => $this['totalGrossProfit'],
		];
	}
}
