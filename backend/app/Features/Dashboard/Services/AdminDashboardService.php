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
use App\Features\Quotation\Models\Quotation;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class AdminDashboardService
{
    protected function quotationModel(): Builder
    {
        return Quotation::query()
            ->selectRaw("
                COUNT(*) as totalQuotations,

                SUM(CASE WHEN quotations.is_active = 0 THEN 1 ELSE 0 END) as totalDraftQuotations,

                SUM(CASE WHEN quotations.is_active = 1 AND quotations.quotation_status = 0 THEN 1 ELSE 0 END) as totalApprovalPendingQuotations,

                SUM(CASE WHEN quotations.is_active = 1 AND quotations.quotation_status = 1 THEN 1 ELSE 0 END) as totalApprovedQuotations,

                SUM(CASE WHEN quotations.is_active = 1 AND quotations.quotation_status = 2 THEN 1 ELSE 0 END) as totalRejectedQuotations,

                SUM(CASE WHEN quotations.lead_source = 1 THEN 1 ELSE 0 END) as totalWebsiteLeadQuotations,

                SUM(CASE WHEN quotations.lead_source = 2 THEN 1 ELSE 0 END) as totalCallQuotations
            ");
    }

    protected function orderModel(): Builder
    {
        return Order::query()
            ->join('quotations', 'quotations.id', '=', 'orders.quotation_id')
            ->selectRaw("
                COUNT(orders.id) as totalOrders,

                SUM(CASE WHEN quotations.lead_source = 1 THEN 1 ELSE 0 END) as totalWebsiteLeadOrders,
                SUM(CASE WHEN quotations.lead_source = 2 THEN 1 ELSE 0 END) as totalCallOrders,

                SUM(COALESCE(quotations.sale_price,0)) as salePrice,

                SUM(COALESCE(quotations.cost_price,0)) as costPrice,

                SUM(COALESCE(quotations.shipping_cost,0)) as shippingCost,

                ROUND(SUM(COALESCE(quotations.cost_price,0) * 0.03), 2) as totalSalesTax,

                ROUND(SUM(
                    COALESCE(quotations.sale_price,0)
                    - (
                        COALESCE(quotations.cost_price,0)
                        + COALESCE(quotations.shipping_cost,0)
                        + (COALESCE(quotations.cost_price,0) * 0.03)
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
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalPendingPartShippedOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalCompletedOrders,
                SUM(CASE WHEN orders.order_status = ? THEN 1 ELSE 0 END) as totalChargeBackOrders,

                SUM(CASE WHEN quotations.quotation_status = 1 AND quotations.approval_by_id = ? THEN 1 ELSE 0 END) as totalApprovedByMeOrders,
                SUM(CASE WHEN quotations.quotation_status = 2 AND quotations.approval_by_id = ? THEN 1 ELSE 0 END) as totalRejectedByMeOrders
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
                OrderStatus::PendingPartShipped->value(),
                OrderStatus::Completed->value(),
                OrderStatus::ChargeBack->value(),

                Auth::guard(Guards::API->value)->id(),
                Auth::guard(Guards::API->value)->id(),
            ]);
    }

    protected function quotationQuery(): QueryBuilder
    {
        return QueryBuilder::for($this->quotationModel());
    }

    protected function orderQuery(): QueryBuilder
    {
        return QueryBuilder::for($this->orderModel());
    }

    protected function defaultStructure(array $data = []): array
    {
        return array_merge([
            "totalQuotations" => 0,
            "totalDraftQuotations" => 0,
            "totalApprovalPendingQuotations" => 0,
            "totalApprovedQuotations" => 0,
            "totalRejectedQuotations" => 0,
            "totalWebsiteLeadQuotations" => 0,
            "totalCallQuotations" => 0,
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
            "totalPendingPartShippedOrders" => 0,
            "totalCompletedOrders" => 0,
            "totalChargeBackOrders" => 0,
            "totalApprovedByMeOrders" => 0,
            "totalRejectedByMeOrders" => 0
        ], $data);
    }

    public function get(): array
    {
        $quotationData = $this->quotationQuery()->first();
        $orderData     = $this->orderQuery()->first();

        // Convert to pure attribute arrays
        $quotationArray = $quotationData?->getAttributes() ?? [];
        $orderArray     = $orderData?->getAttributes() ?? [];

        $data = array_merge($quotationArray, $orderArray);

        return $this->defaultStructure($data);
    }
}
