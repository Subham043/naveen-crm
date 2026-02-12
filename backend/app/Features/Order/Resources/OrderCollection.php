<?php

namespace App\Features\Order\Resources;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Order\Enums\LeadSource;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\ShipmentStatus;
use Illuminate\Http\Resources\Json\JsonResource;


class OrderCollection extends JsonResource
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
			'part_year' => $this->part_year,
			'part_model' => $this->part_model,
			'part_name' => $this->part_name,
			'part_description' => $this->part_description,
			'lead_source' => $this->lead_source,
			'lead_source_info' => LeadSource::getValue($this->lead_source),
			'sales_user_id' => $this->sales_user_id,
			'sales_user_info' => $this->sales_user_id ? OrderUserCollection::make($this->salesUser) : null,
			'is_created_by_agent' => $this->is_created_by_agent,
			'assigned_at' => $this->assigned_at,
			'payment_status' => $this->payment_status,
			'payment_status_info' => PaymentStatus::getValue($this->payment_status),
			'yard_located' => $this->yard_located,
			'total_price' => $this->total_price,
			'cost_price' => $this->cost_price,
			'shipping_cost' => $this->shipping_cost,
			'sales_tax' => $this->sales_tax,
			'gross_profit' => $this->gross_profit,
			'tracking_details' => $this->tracking_details,
			'invoice_status' => $this->invoice_status,
			'invoice_status_info' => InvoiceStatus::getValue($this->invoice_status),
			'shipment_status' => $this->shipment_status,
			'shipment_status_info' => ShipmentStatus::getValue($this->shipment_status),
			'order_status' => $this->order_status,
			'order_status_info' => OrderStatus::getValue($this->order_status),
			'approval_by_id' => $this->approval_by_id,
			'approval_by_info' => $this->approval_by_id ? OrderUserCollection::make($this->approvalBy) : null,
			'approval_at' => $this->approval_at,
			'is_active' => $this->is_active,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
			'yards' => OrderYardCollection::collection($this->yards),
		];
	}
}
