<?php

namespace App\Features\Dashboard\Services;

use App\Features\Order\Enums\InvoiceStatus;
use App\Features\Order\Enums\PaymentStatus;
use App\Features\Order\Enums\ShipmentStatus;
use App\Features\Order\Models\Order;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;

class ServiceTeamDashboardService
{
    protected function model(): Builder
	{
		return Order::query()
        ->selectRaw("
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 THEN 1 ELSE 0 END) as totalOrders,

            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.lead_source = 1 THEN 1 ELSE 0 END) as totalWebsiteLeadOrders,

            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.lead_source = 2 THEN 1 ELSE 0 END) as totalLeadOrders,

            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.lead_source = 3 THEN 1 ELSE 0 END) as totalCallOrders,

            SUM(CASE 
                WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.total_price IS NOT NULL 
                THEN orders.total_price ELSE 0 END
            ) as totalPrice,

            SUM(CASE 
                WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.cost_price IS NOT NULL 
                THEN orders.cost_price ELSE 0 END
            ) as costPrice,

            SUM(CASE 
                WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.shipping_cost IS NOT NULL 
                THEN orders.shipping_cost ELSE 0 END
            ) as shippingCost,

            SUM(CASE 
                WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.cost_price IS NOT NULL 
                THEN orders.cost_price * 0.04 ELSE 0 END
            ) as salesTax,

            SUM(CASE 
                WHEN orders.is_active = 1 
                AND orders.order_status = 1
                AND orders.total_price IS NOT NULL
                AND orders.cost_price IS NOT NULL
                AND orders.shipping_cost IS NOT NULL
                THEN (
                    orders.total_price
                    - (orders.cost_price + orders.shipping_cost + (orders.cost_price * 0.04))
                )
                ELSE 0 END
            ) as grossProfit,

            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.payment_status = ? THEN 1 ELSE 0 END) as totalPaymentPendingOrders,
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.payment_status = ? THEN 1 ELSE 0 END) as totalPaymentPaidOrders,
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.payment_status = ? THEN 1 ELSE 0 END) as totalPaymentPartiallyPaidOrders,

            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.invoice_status = ? THEN 1 ELSE 0 END) as totalInvoiceNotGeneratedOrders,
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.invoice_status = ? THEN 1 ELSE 0 END) as totalInvoiceGeneratedOrders,
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.invoice_status = ? THEN 1 ELSE 0 END) as totalInvoiceSentOrders,

            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.shipment_status = ? THEN 1 ELSE 0 END) as totalShipmentProcessingOrders,
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.shipment_status = ? THEN 1 ELSE 0 END) as totalShipmentShippedOrders,
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.shipment_status = ? THEN 1 ELSE 0 END) as totalShipmentDeliveredOrders,
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.shipment_status = ? THEN 1 ELSE 0 END) as totalShipmentClosedOrders,
            SUM(CASE WHEN orders.is_active = 1 AND orders.order_status = 1 AND orders.shipment_status = ? THEN 1 ELSE 0 END) as totalShipmentCancelledOrders
        ", [
            PaymentStatus::Pending->value(),
            PaymentStatus::Paid->value(),
            PaymentStatus::Partial->value(),

            InvoiceStatus::NotGenerated->value(),
            InvoiceStatus::Generated->value(),
            InvoiceStatus::Sent->value(),

            ShipmentStatus::Processing->value(),
            ShipmentStatus::Shipped->value(),
            ShipmentStatus::Delivered->value(),
            ShipmentStatus::Closed->value(),
            ShipmentStatus::Cancelled->value(),
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
            "totalLeadOrders" => 0,
            "totalCallOrders" => 0,
            "totalPrice" => 0,
            "costPrice" => 0,
            "shippingCost" => 0,
            "salesTax" => 0,
            "grossProfit" => 0,
            "totalPaymentPendingOrders" => 0,
            "totalPaymentPaidOrders" => 0,
            "totalPaymentPartiallyPaidOrders" => 0,
            "totalInvoiceNotGeneratedOrders" => 0,
            "totalInvoiceGeneratedOrders" => 0,
            "totalInvoiceSentOrders" => 0,
            "totalShipmentProcessingOrders" => 0,
            "totalShipmentShippedOrders" => 0,
            "totalShipmentDeliveredOrders" => 0,
            "totalShipmentClosedOrders" => 0,
            "totalShipmentCancelledOrders" => 0,
            "totalDraftOrders" => 0,
            "totalApprovalPendingOrders" => 0,
            "totalApprovedOrders" => 0,
            "totalRejectedOrders" => 0
        ])->toArray();
	}
}