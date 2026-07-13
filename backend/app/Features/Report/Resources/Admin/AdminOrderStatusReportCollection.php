<?php

namespace App\Features\Report\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;


class AdminOrderStatusReportCollection extends JsonResource
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
			'total_orders' => $this->total_orders,
			'pending_orders' => $this->pending_orders,
			'relocate_orders' => $this->relocate_orders,
			'escalation_orders' => $this->escalation_orders,
			'invoice_sent_orders' => $this->invoice_sent_orders,
			'tracking_sent_orders' => $this->tracking_sent_orders,
			'refund_pending_from_yard_orders' => $this->refund_pending_from_yard_orders,
			'refund_pending_to_customer_orders' => $this->refund_pending_to_customer_orders,
			'cancelled_orders' => $this->cancelled_orders,
			'po_sent_orders' => $this->po_sent_orders,
			'part_shipped_orders' => $this->part_shipped_orders,
			'chargeback_orders' => $this->chargeback_orders,
			'completed_orders' => $this->completed_orders,
		];
	}
}
