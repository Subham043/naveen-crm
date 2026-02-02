<?php

namespace App\Features\Dashboard\Services;

use App\Features\Order\Models\Order;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class SalesTeamDashboardService
{
    protected function model(): Builder
	{
		return Order::query()
        ->selectRaw("
            SUM(CASE WHEN orders.sales_user_id = ? THEN 1 ELSE 0 END) as totalOrders,

            SUM(CASE WHEN orders.sales_user_id = ? AND orders.is_active = 0 THEN 1 ELSE 0 END) as totalDraftOrders,

            SUM(CASE WHEN orders.sales_user_id = ? AND orders.is_active = 1 AND orders.order_status = 0 THEN 1 ELSE 0 END) as totalApprovalPendingOrders,

            SUM(CASE WHEN orders.sales_user_id = ? AND orders.is_active = 1 AND orders.order_status = 1 THEN 1 ELSE 0 END) as totalApprovedOrders,

            SUM(CASE WHEN orders.sales_user_id = ? AND orders.is_active = 1 AND orders.order_status = 2 THEN 1 ELSE 0 END) as totalRejectedOrders,

            SUM(CASE WHEN orders.sales_user_id = ? AND orders.lead_source = 1 THEN 1 ELSE 0 END) as totalWebsiteLeadOrders,

            SUM(CASE WHEN orders.sales_user_id = ? AND orders.lead_source = 2 THEN 1 ELSE 0 END) as totalLeadOrders,

            SUM(CASE WHEN orders.sales_user_id = ? AND orders.lead_source = 3 THEN 1 ELSE 0 END) as totalCallOrders
        ", [
            Auth::guard(Guards::API->value)->id(),
            Auth::guard(Guards::API->value)->id(),
            Auth::guard(Guards::API->value)->id(),
            Auth::guard(Guards::API->value)->id(),
            Auth::guard(Guards::API->value)->id(),
            Auth::guard(Guards::API->value)->id(),
            Auth::guard(Guards::API->value)->id(),
            Auth::guard(Guards::API->value)->id(),
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
        return [
            "totalOrders" => 0,
            "totalDraftOrders" => 0,
            "totalApprovalPendingOrders" => 0,
            "totalApprovedOrders" => 0,
            "totalRejectedOrders" => 0,
            "totalWebsiteLeadOrders" => 0,
            "totalLeadOrders" => 0,
            "totalCallOrders" => 0,
        ];
	}
}