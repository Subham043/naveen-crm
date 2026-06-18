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
			"totalCallOrders" => $this['totalCallOrders'],
			"salePrice" => $this['salePrice'],
			"costPrice" => $this['costPrice'],
			"shippingCost" => $this['shippingCost'],
			"totalSalesTax" => $this['totalSalesTax'],
			"totalGrossProfit" => $this['totalGrossProfit'],
			"totalPaymentPendingOrders" => $this['totalPaymentPendingOrders'],
			"totalPaymentPaidOrders" => $this['totalPaymentPaidOrders'],
			"totalPaymentPartiallyPaidOrders" => $this['totalPaymentPartiallyPaidOrders'],
			"totalPaymentMastercardOrders" => $this['totalPaymentMastercardOrders'],
			"totalPaymentVisacardOrders" => $this['totalPaymentVisacardOrders'],
			"totalPaymentAmexcardOrders" => $this['totalPaymentAmexcardOrders'],
			"totalPaymentZellecardOrders" => $this['totalPaymentZellecardOrders'],
			"totalPaymentStripeOrders" => $this['totalPaymentStripeOrders'],
			"totalPaymentBoaOrders" => $this['totalPaymentBoaOrders'],
			"totalPaymentZelleOrders" => $this['totalPaymentZelleOrders'],
			"totalPendingOrders" => $this['totalPendingOrders'],
			"totalRelocateOrders" => $this['totalRelocateOrders'],
			"totalEscalationOrders" => $this['totalEscalationOrders'],
			"totalInvoiceSentOrders" => $this['totalInvoiceSentOrders'],
			"totalTrackingSentOrders" => $this['totalTrackingSentOrders'],
			"totalRefundPendingFromYardOrders" => $this['totalRefundPendingFromYardOrders'],
			"totalRefundPendingToCustomerOrders" => $this['totalRefundPendingToCustomerOrders'],
			"totalCancelledOrders" => $this['totalCancelledOrders'],
			"totalPOSentOrders" => $this['totalPOSentOrders'],
			"totalPartShippedOrders" => $this['totalPartShippedOrders'],
			"totalChargeBackOrders" => $this['totalChargeBackOrders'],
			"totalCompletedOrders" => $this['totalCompletedOrders'],
		];
	}
}
