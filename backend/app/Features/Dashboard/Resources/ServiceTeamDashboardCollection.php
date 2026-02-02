<?php

namespace App\Features\Dashboard\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class ServiceTeamDashboardCollection extends JsonResource
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
			"totalPrice" => $this['totalPrice'],
			"costPrice" => $this['costPrice'],
			"shippingCost" => $this['shippingCost'],
			"totalSalesTax" => $this['totalSalesTax'],
			"totalGrossProfit" => $this['totalGrossProfit'],
			"totalPaymentPendingOrders" => $this['totalPaymentPendingOrders'],
			"totalPaymentPaidOrders" => $this['totalPaymentPaidOrders'],
			"totalPaymentPartiallyPaidOrders" => $this['totalPaymentPartiallyPaidOrders'],
			"totalInvoiceNotGeneratedOrders" => $this['totalInvoiceNotGeneratedOrders'],
			"totalInvoiceGeneratedOrders" => $this['totalInvoiceGeneratedOrders'],
			"totalInvoiceSentOrders" => $this['totalInvoiceSentOrders'],
			"totalShipmentProcessingOrders" => $this['totalShipmentProcessingOrders'],
			"totalShipmentShippedOrders" => $this['totalShipmentShippedOrders'],
			"totalShipmentDeliveredOrders" => $this['totalShipmentDeliveredOrders'],
			"totalShipmentClosedOrders" => $this['totalShipmentClosedOrders'],
			"totalShipmentCancelledOrders" => $this['totalShipmentCancelledOrders'],
		];
	}
}
