<?php

namespace App\Features\Dashboard\Services;

use App\Features\Quotation\Models\Quotation;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class SalesTeamDashboardService
{
    protected function model(): Builder
	{
		return Quotation::query()
        ->selectRaw("
            SUM(CASE WHEN quotations.sales_user_id = ? THEN 1 ELSE 0 END) as totalQuotations,

            SUM(CASE WHEN quotations.sales_user_id = ? AND quotations.is_active = 0 THEN 1 ELSE 0 END) as totalDraftQuotations,

            SUM(CASE WHEN quotations.sales_user_id = ? AND quotations.is_active = 1 AND quotations.order_status = 0 THEN 1 ELSE 0 END) as totalApprovalPendingQuotations,

            SUM(CASE WHEN quotations.sales_user_id = ? AND quotations.is_active = 1 AND quotations.order_status = 1 THEN 1 ELSE 0 END) as totalApprovedQuotations,

            SUM(CASE WHEN quotations.sales_user_id = ? AND quotations.is_active = 1 AND quotations.order_status = 2 THEN 1 ELSE 0 END) as totalRejectedQuotations,

            SUM(CASE WHEN quotations.sales_user_id = ? AND quotations.lead_source = 1 THEN 1 ELSE 0 END) as totalWebsiteLeadQuotations,

            SUM(CASE WHEN quotations.sales_user_id = ? AND quotations.lead_source = 2 THEN 1 ELSE 0 END) as totalCallQuotations
        ", [
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
            "totalQuotations" => 0,
            "totalDraftQuotations" => 0,
            "totalApprovalPendingQuotations" => 0,
            "totalApprovedQuotations" => 0,
            "totalRejectedQuotations" => 0,
            "totalWebsiteLeadQuotations" => 0,
            "totalCallQuotations" => 0,
        ];
	}
}