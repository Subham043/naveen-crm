<?php

namespace App\Features\Report\Services;

use App\Features\Order\Enums\OrderStatus;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use App\Features\Order\Models\Order;

class ReportService
{
    public function salesReportModel(): Builder
    {
        return Order::query()
        ->selectRaw('
            DATE(created_at) as date,
            COUNT(id) as total_orders,
            SUM(total_price) as total_sales,
            SUM(cost_price * 0.04) as total_tax,
            SUM(total_price - (cost_price + shipping_cost + (cost_price * 0.04))) as total_profit
        ')
        ->where('is_active', true)
        ->where('order_status', OrderStatus::Approved->value())
        ->groupBy(DB::raw('DATE(created_at)'));
    }
    
    public function agentWisePerformanceModel(): Builder
    {
        return Order::query()
        ->selectRaw('
            sales_user_id,
            COUNT(id) as total_leads,
            SUM(total_price) as total_sales,
            SUM(total_price - (cost_price + shipping_cost + (cost_price * 0.04))) as total_profit,
            SUM(CASE WHEN order_status > 0 THEN 1 ELSE 0 END) as converted_leads,
            ROUND(
                (SUM(CASE WHEN order_status > 0 THEN 1 ELSE 0 END) / COUNT(id)) * 100,
                2
            ) as conversion_rate
        ')
        ->where('is_active', true)
        ->where('order_status', OrderStatus::Approved->value())
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
        return Order::query()
        ->selectRaw("
            {$groupBy} as period,
            SUM(total_price) as total_revenue,
            SUM(cost_price) as total_cost,
            SUM(shipping_cost) as total_shipping,
            SUM(cost_price * 0.04) as total_tax,
            SUM(total_price - (cost_price + shipping_cost + (cost_price * 0.04))) as total_profit
        ")
        ->where('is_active', true)
        ->where('order_status', OrderStatus::Approved->value())
        ->groupBy(DB::raw($groupBy))
        ->orderBy('period');
    }

    public function query(Builder $model): QueryBuilder
    {
        return QueryBuilder::for($model)
        ->allowedFilters([
            AllowedFilter::callback('from_date', function (Builder $query, $value) {
                if($value){
                    $query->where('created_at', '>=', $value);
                }
            }),
            AllowedFilter::callback('to_date', function (Builder $query, $value) {
                if($value){
                    $query->where('created_at', '<=', $value);
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
