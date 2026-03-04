<?php

namespace App\Features\Report\Resources\Admin;

use App\Features\Quotation\Resources\QuotationUserCollection;
use Illuminate\Http\Resources\Json\JsonResource;


class AdminApprovalTurnAroundReportCollection extends JsonResource
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
			'sales_user_id' => $this->sales_user_id,
			'avg_approval_hours' => $this->avg_approval_hours,
			'sales_user_info' => $this->sales_user_id ? QuotationUserCollection::make($this->salesUser) : null,
		];
	}
}
