<?php

namespace App\Features\Report\Services;

use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Quotation\Models\Quotation;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function salesReportModel(): Builder
    {
        return Quotation::query()
        ->selectRaw('
            DATE(created_at) as date,
            COUNT(id) as total_orders,
            SUM(COALESCE(sale_price,0)) as total_sales,
            SUM(COALESCE(cost_price,0) * 0.03) as total_tax,
            SUM(COALESCE(sale_price,0) - (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + (COALESCE(cost_price,0) * 0.03))) as total_profit
        ')
        ->where('is_active', true)
        ->where('quotation_status', QuotationStatus::Approved->value())
        ->whereHas('order')
        ->groupBy(DB::raw('DATE(created_at)'));
    }
    
    public function agentWisePerformanceModel(): Builder
    {
        return Quotation::query()
        ->selectRaw('
            sales_user_id,
            COUNT(id) as total_leads,
            SUM(CASE WHEN quotation_status = 1 AND is_active = 1 THEN COALESCE(sale_price,0) ELSE 0 END) as total_sales,
            SUM(CASE WHEN quotation_status = 1 AND is_active = 1 THEN (COALESCE(sale_price,0) - (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + (COALESCE(cost_price,0) * 0.03))) ELSE 0 END) as total_profit,
            SUM(CASE WHEN quotation_status = 1 AND is_active = 1 THEN 1 ELSE 0 END) as converted_leads,
            ROUND(
                (SUM(CASE WHEN quotation_status = 1 AND is_active = 1 THEN 1 ELSE 0 END) / COUNT(id)) * 100,
                2
            ) as conversion_rate
        ')
        ->whereNotNull('sales_user_id')
        ->groupBy('sales_user_id')
        ->orderByDesc('conversion_rate')
        ->with('salesUser:id,name,email,phone');
    }
    
    public function revenueSummaryModel(): Builder
    {
        $type = request('type', 'day');

        $groupBy = match ($type) {
            'year'  => 'YEAR(created_at)',
            'month' => 'DATE_FORMAT(created_at, "%Y-%m")',
            default => 'DATE(created_at)',
        };
        return Quotation::query()
        ->selectRaw("
            {$groupBy} as period,
            SUM(COALESCE(sale_price,0)) as total_revenue,
            SUM(COALESCE(cost_price,0)) as total_cost,
            SUM(COALESCE(shipping_cost,0)) as total_shipping,
            SUM(COALESCE(cost_price,0) * 0.03) as total_tax,
            SUM(COALESCE(sale_price,0) - (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + (COALESCE(cost_price,0) * 0.03))) as total_profit
        ")
        ->where('is_active', true)
        ->where('quotation_status', QuotationStatus::Approved->value())
        ->whereHas('order')
        ->groupBy(DB::raw($groupBy))
        ->orderBy('period');
    }

    public function query(Builder $model): QueryBuilder
    {
        return QueryBuilder::for($model)
        ->allowedFilters([
            AllowedFilter::callback('from_date', function (Builder $query, $value) {
                if($value){
                    $query->whereDate('created_at', '>=', $value);
                }
            }),
            AllowedFilter::callback('to_date', function (Builder $query, $value) {
                if($value){
                    $query->whereDate('created_at', '<=', $value);
                }
            }),
        ]);
    }

    public function salesReportQuery(): QueryBuilder
    {
        return $this->query($this->salesReportModel())
        ->defaultSort('-date')
        ->allowedSorts('date');
    }

    public function paginateSalesReportModel(Int $total = 10): LengthAwarePaginator
	{
		return $this->salesReportQuery()
			->paginate($total)
			->appends(request()->query());
	}

    public function agentWisePerformanceQuery(): QueryBuilder
    {
        return $this->query($this->agentWisePerformanceModel())
        ->defaultSort('-conversion_rate')
        ->allowedSorts('conversion_rate', 'total_leads', 'converted_leads');
    }

    public function paginateAgentWisePerformanceModel(Int $total = 10): LengthAwarePaginator
	{
		return $this->agentWisePerformanceQuery()
			->paginate($total)
			->appends(request()->query());
	}

    public function revenueSummaryQuery(): QueryBuilder
    {
        return $this->query($this->revenueSummaryModel())
        ->defaultSort('-period')
        ->allowedSorts('period', 'total_revenue', 'total_cost', 'total_shipping', 'total_tax', 'total_profit');
    }

    public function paginateRevenueSummaryModel(Int $total = 10): LengthAwarePaginator
	{
		return $this->revenueSummaryQuery()
			->paginate($total)
			->appends(request()->query());
	}
}
