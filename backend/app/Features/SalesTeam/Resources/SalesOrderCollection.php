<?php

namespace App\Features\SalesTeam\Resources;

use App\Features\Order\Enums\LeadSource;
use App\Features\Order\Enums\OrderStatus;
use Illuminate\Http\Resources\Json\JsonResource;


class SalesOrderCollection extends JsonResource {
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
			'name' => $this->name,
			'email' => $this->email,
			'phone' => $this->phone,
			'country_code' => $this->country_code,
            'phone_number' => $this->country_code && $this->phone ? $this->country_code . $this->phone : null,
			'billing_address' => $this->billing_address,
			'part_name' => $this->part_name,
			'part_description' => $this->part_description,
			'lead_source' => $this->lead_source,
			'lead_source_info' => LeadSource::getValue($this->lead_source),
			'sales_user_id' => $this->sales_user_id,
            'sales_user_info' => $this->salesUser,
			'is_created_by_agent' => $this->is_created_by_agent,
			'assigned_at' => $this->assigned_at,
			'order_status' => $this->order_status,
			'order_status_info' => OrderStatus::getValue($this->order_status),
			'approval_by_id' => $this->approval_by_id,
            'approval_by_info' => $this->approvalBy,
			'approval_at' => $this->approval_at,
			'is_active' => $this->is_active,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
	}
}
