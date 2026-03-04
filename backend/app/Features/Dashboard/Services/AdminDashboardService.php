<?php

namespace App\Features\Dashboard\Services;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Enums\PaymentCardType;
use App\Features\Order\Enums\PaymentGateway;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\ShipmentStatus;
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

                SUM(quotations.lead_source = 1) as totalWebsiteLeadOrders,
                SUM(quotations.lead_source = 2) as totalCallOrders,

                SUM(COALESCE(quotations.sale_price,0)) as salePrice,

                SUM(COALESCE(quotations.cost_price,0)) as costPrice,

                SUM(COALESCE(quotations.shipping_cost,0)) as shippingCost,

                ROUND(SUM(COALESCE(quotations.cost_price,0) * 0.03), 2) as totalSalesTax,

                ROUND(SUM(COALESCE(quotations.sale_price,0)
                        - (
                            COALESCE(quotations.cost_price,0)
                            + COALESCE(quotations.shipping_cost,0)
                            + (COALESCE(quotations.cost_price,0) * 0.03)
                        )) as totalGrossProfit,

                SUM(orders.payment_status = ?) as totalPaymentPendingOrders,
                SUM(orders.payment_status = ?) as totalPaymentPaidOrders,
                SUM(orders.payment_status = ?) as totalPaymentPartiallyPaidOrders,

                SUM(orders.payment_status != 0 AND orders.payment_card_type = ?) as totalPaymentMastercardOrders,
                SUM(orders.payment_status != 0 AND orders.payment_card_type = ?) as totalPaymentVisacardOrders,
                SUM(orders.payment_status != 0 AND orders.payment_card_type = ?) as totalPaymentAmexcardOrders,
                SUM(orders.payment_status != 0 AND orders.payment_card_type = ?) as totalPaymentZellecardOrders,

                SUM(orders.payment_status != 0 AND orders.payment_gateway = ?) as totalPaymentStripeOrders,
                SUM(orders.payment_status != 0 AND orders.payment_gateway = ?) as totalPaymentBoaOrders,
                SUM(orders.payment_status != 0 AND orders.payment_gateway = ?) as totalPaymentZelleOrders,

                SUM(orders.invoice_status = ?) as totalInvoiceNotGeneratedOrders,
                SUM(orders.invoice_status = ?) as totalInvoiceGeneratedOrders,
                SUM(orders.invoice_status = ?) as totalInvoiceSentOrders,

                SUM(orders.shipment_status = ?) as totalShipmentPOPendingOrders,
                SUM(orders.shipment_status = ?) as totalShipmentPOSentOrders,

                SUM(orders.tracking_status = ?) as totalTrackingPendingOrders,
                SUM(orders.tracking_status = ?) as totalTrackingSentOrders,

                SUM(orders.order_status = ?) as totalPendingOrders,
                SUM(orders.order_status = ?) as totalEscalationOrders,
                SUM(orders.order_status = ?) as totalCancelledOrders,
                SUM(orders.order_status = ?) as totalRelocatePoSentOrders,
                SUM(orders.order_status = ?) as totalPendingForRefundOrders,
                SUM(orders.order_status = ?) as totalRefundedOrders,
                SUM(orders.order_status = ?) as totalPendingPartShippedOrders,
                SUM(orders.order_status = ?) as totalCompletedOrders,
                SUM(orders.order_status = ?) as totalChargeBackOrders,
                SUM(orders.order_status = ?) as totalYardRelocateOrders,

                SUM(quotations.quotation_status = 1 AND quotations.approval_by_id = ?) as totalApprovedByMeOrders,
                SUM(quotations.quotation_status = 2 AND quotations.approval_by_id = ?) as totalRejectedByMeOrders
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

                ShipmentStatus::POPending->value(),
                ShipmentStatus::POSent->value(),

                TrackingStatus::Pending->value(),
                TrackingStatus::Sent->value(),

                OrderStatus::Pending->value(),
                OrderStatus::Escalation->value(),
                OrderStatus::Cancelled->value(),
                OrderStatus::RelocatePoSent->value(),
                OrderStatus::PendingForRefund->value(),
                OrderStatus::Refunded->value(),
                OrderStatus::PendingPartShipped->value(),
                OrderStatus::Completed->value(),
                OrderStatus::ChargeBack->value(),
                OrderStatus::YardRelocate->value(),

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
            "totalShipmentPOPendingOrders" => 0,
            "totalShipmentPOSentOrders" => 0,
            "totalTrackingPendingOrders" => 0,
            "totalTrackingSentOrders" => 0,
            "totalPendingOrders" => 0,
            "totalEscalationOrders" => 0,
            "totalCancelledOrders" => 0,
            "totalRelocatePoSentOrders" => 0,
            "totalPendingForRefundOrders" => 0,
            "totalRefundedOrders" => 0,
            "totalPendingPartShippedOrders" => 0,
            "totalCompletedOrders" => 0,
            "totalChargeBackOrders" => 0,
            "totalYardRelocateOrders" => 0,
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
