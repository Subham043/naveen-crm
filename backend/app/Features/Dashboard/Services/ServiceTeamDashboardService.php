<?php

namespace App\Features\Dashboard\Services;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Enums\PaymentCardType;
use App\Features\Order\Enums\PaymentGateway;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\POStatus;
use App\Features\Order\Enums\TrackingStatus;
use App\Features\Order\Models\Order;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;

class ServiceTeamDashboardService
{
    protected function model(): Builder
    {
        return Order::query()
            ->join('quotations', 'quotations.id', '=', 'orders.quotation_id')
            ->selectRaw("
                COUNT(*) as totalOrders,

                SUM(CASE WHEN quotations.lead_source = 1 THEN 1 ELSE 0 END) as totalWebsiteLeadOrders,
                SUM(CASE WHEN quotations.lead_source = 2 THEN 1 ELSE 0 END) as totalCallOrders,

                SUM(COALESCE(quotations.sale_price,0)) as salePrice,

                SUM(COALESCE(quotations.cost_price,0)) as costPrice,

                SUM(COALESCE(quotations.shipping_cost,0)) as shippingCost,

                ROUND(SUM((COALESCE(quotations.sale_price,0)) * 0.04), 2) as totalSalesTax,

                ROUND(SUM(
                    COALESCE(quotations.sale_price,0)
                    - (
                        COALESCE(quotations.cost_price,0)
                        + COALESCE(quotations.shipping_cost,0)
                        + (COALESCE(quotations.sale_price,0) * 0.04)
                    )
                ), 2) as totalGrossProfit,

                SUM(CASE WHEN orders.payment_status = ? THEN 1 ELSE 0 END) as totalPaymentPendingOrders,
                SUM(CASE WHEN orders.payment_status = ? THEN 1 ELSE 0 END) as totalPaymentPaidOrders,
                SUM(CASE WHEN orders.payment_status = ? THEN 1 ELSE 0 END) as totalPaymentPartiallyPaidOrders,

                SUM(CASE WHEN orders.payment_status != 0 AND orders.payment_card_type = ? THEN 1 ELSE 0 END) as totalPaymentMastercardOrders,
                SUM(CASE WHEN orders.payment_status != 0 AND orders.payment_card_type = ? THEN 1 ELSE 0 END) as totalPaymentVisacardOrders,
                SUM(CASE WHEN orders.payment_status != 0 AND orders.payment_card_type = ? THEN 1 ELSE 0 END) as totalPaymentAmexcardOrders,
                SUM(CASE WHEN orders.payment_status != 0 AND orders.payment_card_type = ? THEN 1 ELSE 0 END) as totalPaymentZellecardOrders,

                SUM(CASE WHEN orders.payment_status != 0 AND orders.payment_gateway = ? THEN 1 ELSE 0 END) as totalPaymentStripeOrders,
                SUM(CASE WHEN orders.payment_status != 0 AND orders.payment_gateway = ? THEN 1 ELSE 0 END) as totalPaymentBoaOrders,
                SUM(CASE WHEN orders.payment_status != 0 AND orders.payment_gateway = ? THEN 1 ELSE 0 END) as totalPaymentZelleOrders,

                SUM(CASE WHEN orders.invoice_status = ? THEN 1 ELSE 0 END) as totalInvoiceNotGeneratedOrders,
                SUM(CASE WHEN orders.invoice_status = ? THEN 1 ELSE 0 END) as totalInvoiceGeneratedOrders,
                SUM(CASE WHEN orders.invoice_status = ? THEN 1 ELSE 0 END) as totalInvoiceSentOrders,

                SUM(CASE WHEN orders.po_status = ? THEN 1 ELSE 0 END) as totalPOPendingOrders,
                SUM(CASE WHEN orders.po_status = ? THEN 1 ELSE 0 END) as totalPOSentOrders,

                SUM(CASE WHEN orders.tracking_status = ? THEN 1 ELSE 0 END) as totalTrackingPendingOrders,
                SUM(CASE WHEN orders.tracking_status = ? THEN 1 ELSE 0 END) as totalTrackingSentOrders,

                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalPendingOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalEscalationOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalCancelledOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalPendingForRefundOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalRefundedOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalPartShippedOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalCompletedOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalChargeBackOrders
            ", [
                PaymentStatus::Pending->value(),
                PaymentStatus::Paid->value(),
                PaymentStatus::Partial->value(),

                PaymentCardType::Mastercard->value(),
                PaymentCardType::Visa->value(),
                PaymentCardType::Amex->value(),
                PaymentCardType::Zelle->value(),

                PaymentGateway::Stripe->value(),
                PaymentGateway::Boa->value(),
                PaymentGateway::Zelle->value(),

                InvoiceStatus::NotGenerated->value(),
                InvoiceStatus::Generated->value(),
                InvoiceStatus::Sent->value(),

                POStatus::POPending->value(),
                POStatus::POSent->value(),

                TrackingStatus::Pending->value(),
                TrackingStatus::Sent->value(),

                OrderStatus::Pending->value(),
                OrderStatus::Escalation->value(),
                OrderStatus::Cancelled->value(),
                OrderStatus::PendingForRefund->value(),
                OrderStatus::Refunded->value(),
                OrderStatus::PartShipped->value(),
                OrderStatus::Completed->value(),
                OrderStatus::ChargeBack->value()
            ]);
    }

    protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model());
	}

    public function get()
	{
		$data =  $this->query()->first();
        if($data){
            return $data;
        }
        return collect([
            "totalOrders" => 0,
            "totalWebsiteLeadOrders" => 0,
            "totalCallOrders" => 0,
            "salePrice" => 0,
            "costPrice" => 0,
            "shippingCost" => 0,
            "totalSalesTax" => 0,
            "totalGrossProfit" => 0,
            "totalPaymentPendingOrders" => 0,
            "totalPaymentPaidOrders" => 0,
            "totalPaymentPartiallyPaidOrders" => 0,
            "totalPaymentMastercardOrders" => 0,
            "totalPaymentVisacardOrders" => 0,
            "totalPaymentAmexcardOrders" => 0,
            "totalPaymentZellecardOrders" => 0,
            "totalPaymentStripeOrders" => 0,
            "totalPaymentBoaOrders" => 0,
            "totalPaymentZelleOrders" => 0,
            "totalInvoiceNotGeneratedOrders" => 0,
            "totalInvoiceGeneratedOrders" => 0,
            "totalInvoiceSentOrders" => 0,
            "totalPOPendingOrders" => 0,
            "totalPOSentOrders" => 0,
            "totalTrackingPendingOrders" => 0,
            "totalTrackingSentOrders" => 0,
            "totalPendingOrders" => 0,
            "totalEscalationOrders" => 0,
            "totalCancelledOrders" => 0,
            "totalPendingForRefundOrders" => 0,
            "totalRefundedOrders" => 0,
            "totalPartShippedOrders" => 0,
            "totalCompletedOrders" => 0,
            "totalChargeBackOrders" => 0,
        ])->toArray();
	}
}