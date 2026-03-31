<?php

namespace App\Features\Quotation\Resources;

use App\Features\Quotation\Enums\LeadSource;
use App\Features\Quotation\Enums\QuotationStatus;
use Illuminate\Http\Resources\Json\JsonResource;


class QuotationCollection extends JsonResource
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
			'name' => $this->name,
			'email' => $this->email,
			'phone' => $this->phone,
			'country_code' => $this->country_code,
			'phone_number' => $this->country_code && $this->phone ? $this->country_code . ' ' . $this->phone : null,
			'billing_address' => $this->billing_address,
			'shipping_address' => $this->shipping_address,
			'part_year' => $this->part_year,
			'part_model' => $this->part_model,
			'part_make' => $this->part_make,
			'part_name' => $this->part_name,
			'part_number' => $this->part_number,
			'part_warranty' => $this->part_warranty,
			'part_vin' => $this->part_vin ?? null,
			'part_description' => $this->part_description,
			'lead_source' => $this->lead_source,
			'lead_source_info' => LeadSource::getValue($this->lead_source),
			'sales_user_id' => $this->sales_user_id,
			'sales_user_info' => $this->sales_user_id ? QuotationUserCollection::make($this->salesUser) : null,
			'is_created_by_agent' => $this->is_created_by_agent,
			'assigned_at' => $this->assigned_at,
			'sale_price' => $this->sale_price,
			'cost_price' => $this->cost_price,
			'shipping_cost' => $this->shipping_cost,
			'sales_tax' => $this->sales_tax,
			'gross_profit' => $this->gross_profit,
			'quotation_status' => $this->quotation_status,
			'quotation_status_info' => QuotationStatus::getValue($this->quotation_status),
			'approval_by_id' => $this->approval_by_id,
			'approval_by_info' => $this->approval_by_id ? QuotationUserCollection::make($this->approvalBy) : null,
			'approval_at' => $this->approval_at,
			'is_active' => $this->is_active,
			'quotation_sent' => $this->quotation_sent,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
	}
}
