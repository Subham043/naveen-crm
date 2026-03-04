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
        $userId = Auth::guard(Guards::API->value)->id();

        return Quotation::query()
            ->where('quotations.sales_user_id', $userId)
            ->selectRaw("
                COUNT(*) as totalQuotations,

                SUM(CASE WHEN quotations.is_active = 0 THEN 1 ELSE 0 END) as totalDraftQuotations,

                SUM(CASE WHEN quotations.is_active = 1 AND quotations.quotation_status = 0 THEN 1 ELSE 0 END) as totalApprovalPendingQuotations,

                SUM(CASE WHEN quotations.is_active = 1 AND quotations.quotation_status = 1 THEN 1 ELSE 0 END) as totalApprovedQuotations,

                SUM(CASE WHEN quotations.is_active = 1 AND quotations.quotation_status = 2 THEN 1 ELSE 0 END) as totalRejectedQuotations,

                SUM(CASE WHEN quotations.lead_source = 1 THEN 1 ELSE 0 END) as totalWebsiteLeadQuotations,

                SUM(CASE WHEN quotations.lead_source = 2 THEN 1 ELSE 0 END) as totalCallQuotations,

                SUM(CASE 
                    WHEN quotations.is_active = 1 
                    AND quotations.quotation_status = 1 
                    THEN COALESCE(quotations.sale_price,0) 
                    ELSE 0 END
                ) as salePrice,

                SUM(CASE 
                    WHEN quotations.is_active = 1 
                    AND quotations.quotation_status = 1 
                    THEN COALESCE(quotations.cost_price,0) 
                    ELSE 0 END
                ) as costPrice,

                SUM(CASE 
                    WHEN quotations.is_active = 1 
                    AND quotations.quotation_status = 1 
                    THEN COALESCE(quotations.shipping_cost,0) 
                    ELSE 0 END
                ) as shippingCost,

                ROUND(SUM(CASE 
                    WHEN quotations.is_active = 1 
                    AND quotations.quotation_status = 1 
                    THEN COALESCE(quotations.cost_price,0) * 0.03 
                    ELSE 0 END
                ), 2) as totalSalesTax,

                ROUND(SUM(CASE 
                    WHEN quotations.is_active = 1 
                    AND quotations.quotation_status = 1 
                    THEN (
                        COALESCE(quotations.sale_price,0)
                        - (
                            COALESCE(quotations.cost_price,0)
                            + COALESCE(quotations.shipping_cost,0)
                            + (COALESCE(quotations.cost_price,0) * 0.03)
                        )
                    )
                    ELSE 0 END
                ), 2) as totalGrossProfit
            ");
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
            "salePrice" => 0,
            "costPrice" => 0,
            "shippingCost" => 0,
            "totalSalesTax" => 0,
            "totalGrossProfit" => 0,
        ];
	}
}