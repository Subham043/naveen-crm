<?php

namespace App\Features\Report\Services;

use App\Features\Quotation\Models\Quotation;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class SalesTeamReportService
{

    public function salesPerformanceModel(): Builder
    {
        $type = request('type', 'day');

        $groupBy = match ($type) {
            'year'  => 'YEAR(created_at)',
            'month' => 'DATE_FORMAT(created_at, "%Y-%m")',
            default => 'DATE(created_at)',
        };

        $query = Quotation::query()
            ->selectRaw("
                {$groupBy} as period,
                COUNT(id) as total_leads,
                SUM(CASE WHEN quotation_status = 1 THEN 1 ELSE 0 END) as converted_leads,
                ROUND(
                    (SUM(CASE WHEN quotation_status = 1 THEN 1 ELSE 0 END) / COUNT(id)) * 100,
                    2
                ) as conversion_rate
            ")
                ->where('is_active', true)
                ->whereNotNull('sales_user_id')
                ->where('sales_user_id', request()->user()->id)
                ->groupBy(DB::raw($groupBy));

        return $query;
    }

    public function query(Builder $model): QueryBuilder
    {
        return QueryBuilder::for($model)
            ->allowedFilters([
                AllowedFilter::callback('from_date', function (Builder $query, $value) {
                    if ($value) {
                        $query->whereDate('created_at', '>=', $value);
                    }
                }),
                AllowedFilter::callback('to_date', function (Builder $query, $value) {
                    if ($value) {
                        $query->whereDate('created_at', '<=', $value);
                    }
                }),
            ]);
    }

    public function salesPerformanceQuery(): QueryBuilder
    {
        return $this->query($this->salesPerformanceModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_leads', 'converted_leads', 'conversion_rate');
    }

    public function paginateSalesPerformanceModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->salesPerformanceQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function salesRevenueModel(): Builder
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
                ROUND(SUM(COALESCE(cost_price,0) * 0.03), 2) as total_tax,
                ROUND(SUM(
                    COALESCE(sale_price,0) -
                    (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + (COALESCE(cost_price,0) * 0.03))
                ), 2) as total_profit,
                ROUND(
                    (
                        SUM(
                            COALESCE(sale_price,0) -
                            (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + (COALESCE(cost_price,0) * 0.03))
                        )
                        / NULLIF(SUM(COALESCE(sale_price,0)),0)
                    ) * 100,
                    2
                ) as profit_margin_percent
            ")
            ->where('is_active', true)
            ->where('quotation_status', 1)
            ->whereNotNull('sales_user_id')
            ->where('sales_user_id', request()->user()->id)
            ->whereHas('order')
            ->groupBy(DB::raw($groupBy));
    }

    public function salesRevenueQuery(): QueryBuilder
    {
        return $this->query($this->salesRevenueModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_revenue', 'total_cost', 'total_shipping', 'total_tax', 'total_profit', 'profit_margin_percent');
    }

    public function paginateSalesRevenueModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->salesRevenueQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function salesTrendModel(): Builder
    {
        $type = request('type', 'month');

        $groupBy = match ($type) {
            'year'  => 'YEAR(created_at)',
            'month' => 'DATE_FORMAT(created_at, "%Y-%m")',
            default => 'DATE(created_at)',
        };

        return Quotation::query()
            ->selectRaw("
                {$groupBy} as period,
                COUNT(id) as total_sales,
                SUM(COALESCE(sale_price,0)) as total_revenue
            ")
            ->where('quotation_status', 1)
            ->whereHas('order')
            ->groupBy(DB::raw($groupBy));
    }

    public function salesTrendQuery(): QueryBuilder
    {
        return $this->query($this->salesTrendModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_sales', 'total_revenue');
    }

    public function paginateSalesTrendModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->salesTrendQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function pipelineStatusModel(): Builder
    {
        return Quotation::query()
            ->selectRaw("
                quotation_status,
                COUNT(id) as total_sales,
                SUM(COALESCE(sale_price,0)) as total_revenue
            ")
            ->where('is_active', true)
            ->whereNotNull('sales_user_id')
            ->where('sales_user_id', request()->user()->id)
            ->groupBy('quotation_status');
    }

    public function pipelineStatusQuery(): QueryBuilder
    {
        return $this->query($this->pipelineStatusModel())
            ->defaultSort('-quotation_status')
            ->allowedSorts('quotation_status', 'total_sales', 'total_revenue');
    }

    public function paginatePipelineStatusModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->pipelineStatusQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function leadSourcePerformanceModel(): Builder
    {
        return Quotation::query()
            ->selectRaw("
                lead_source,
                COUNT(id) as total_leads,
                SUM(CASE WHEN quotation_status = 1 THEN 1 ELSE 0 END) as approved,
                SUM(COALESCE(sale_price,0)) as total_revenue
            ")
            ->where('is_active', true)
            ->whereNotNull('sales_user_id')
            ->where('sales_user_id', request()->user()->id)
            ->groupBy('lead_source');
    }

    public function leadSourcePerformanceQuery(): QueryBuilder
    {
        return $this->query($this->leadSourcePerformanceModel())
            ->defaultSort('-lead_source')
            ->allowedSorts('lead_source', 'total_leads', 'approved', 'total_revenue');
    }

    public function paginateLeadSourcePerformanceModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->leadSourcePerformanceQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function approvalTurnaroundModel(): Builder
    {
        return Quotation::query()
            ->selectRaw("
                DATE(created_at) as date,
                ROUND(AVG(TIMESTAMPDIFF(HOUR, created_at, approval_at)), 2) as avg_approval_hours
            ")
            ->whereNotNull('approval_at')
            ->whereNotNull('sales_user_id')
            ->where('sales_user_id', request()->user()->id)
            ->groupBy(DB::raw('DATE(created_at)'));
    }

    public function approvalTurnaroundQuery(): QueryBuilder
    {
        return $this->query($this->approvalTurnaroundModel())
            ->defaultSort('-date')
            ->allowedSorts('date', 'avg_approval_hours');
    }

    public function paginateApprovalTurnaroundModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->approvalTurnaroundQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function profitabilityPerQuotationModel(): Builder
    {
        return Quotation::query()
            ->selectRaw("
                id,
                sale_price,
                cost_price,
                shipping_cost,
                ROUND(COALESCE(cost_price,0) * 0.03, 2) as tax,
                ROUND(
                    COALESCE(sale_price,0) -
                    (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + (COALESCE(cost_price,0) * 0.03)), 2
                ) as gross_profit
            ")
            ->where('quotation_status', 1)
            ->whereNotNull('sales_user_id')
            ->where('sales_user_id', request()->user()->id)
            ->orderByDesc('gross_profit');
    }

    public function profitabilityPerQuotationQuery(): QueryBuilder
    {
        return $this->query($this->profitabilityPerQuotationModel())
            ->defaultSort('-gross_profit')
            ->allowedSorts('gross_profit', 'sale_price', 'cost_price', 'shipping_cost', 'tax');
    }

    public function paginateProfitabilityPerQuotationModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->profitabilityPerQuotationQuery()
            ->paginate($total)
            ->appends(request()->query());
    }
}
