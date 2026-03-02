<?php

namespace App\Features\Dashboard\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class AdminDashboardCollection extends JsonResource
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
			"totalInvoiceNotGeneratedOrders" => $this['totalInvoiceNotGeneratedOrders'],
			"totalInvoiceGeneratedOrders" => $this['totalInvoiceGeneratedOrders'],
			"totalInvoiceSentOrders" => $this['totalInvoiceSentOrders'],
			"totalShipmentPOPendingOrders" => $this['totalShipmentPOPendingOrders'],
			"totalShipmentPOSentOrders" => $this['totalShipmentPOSentOrders'],
			"totalTrackingPendingOrders" => $this['totalTrackingPendingOrders'],
			"totalTrackingSentOrders" => $this['totalTrackingSentOrders'],
			"totalPendingOrders" => $this['totalPendingOrders'],
			"totalEscalationOrders" => $this['totalEscalationOrders'],
			"totalCancelledOrders" => $this['totalCancelledOrders'],
			"totalRelocatePoSentOrders" => $this['totalRelocatePoSentOrders'],
			"totalPendingForRefundOrders" => $this['totalPendingForRefundOrders'],
			"totalRefundedOrders" => $this['totalRefundedOrders'],
			"totalPendingPartShippedOrders" => $this['totalPendingPartShippedOrders'],
			"totalCompletedOrders" => $this['totalCompletedOrders'],
			"totalChargeBackOrders" => $this['totalChargeBackOrders'],
			"totalYardRelocateOrders" => $this['totalYardRelocateOrders'],
			"totalApprovedByMeOrders" => $this['totalApprovedByMeOrders'],
			"totalRejectedByMeOrders" => $this['totalRejectedByMeOrders'],
		];
	}
}
