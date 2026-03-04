<?php

namespace App\Features\Report\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;


class AdminOrderPaymentReportCollection extends JsonResource
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
			'paid_orders' => $this->paid_orders,
			'partial_paid_orders' => $this->partial_paid_orders,
			'unpaid_orders' => $this->unpaid_orders,
			'payment_success_rate' => $this->payment_success_rate,
		];
	}
}
