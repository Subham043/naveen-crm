<?php

namespace App\Features\Report\Services;

use App\Features\Order\Models\Order;
use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Quotation\Models\Quotation;
use App\Features\Roles\Enums\Roles;
use App\Features\Timeline\Models\Timeline;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class AdminReportService
{
    public function adminSalesPerformanceModel(): Builder
    {
        $type = request('type', 'day');

        $groupByPeriod = match ($type) {
            'year'  => 'YEAR(created_at)',
            'month' => 'DATE_FORMAT(created_at, "%Y-%m")',
            default => 'DATE(created_at)',
        };

        return Quotation::query()
            ->selectRaw("
                {$groupByPeriod} as period,
                sales_user_id,
                COUNT(id) as total_leads,
                SUM(CASE WHEN quotation_status = 1 THEN 1 ELSE 0 END) as converted_leads,
                SUM(COALESCE(sale_price,0)) as total_revenue,
                ROUND(SUM(CASE WHEN quotation_status = 1 THEN 
                    (COALESCE(sale_price,0) -
                    (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + ((COALESCE(cost_price,0) + COALESCE(shipping_cost,0)) * 0.04))) 
                    ELSE 0 END
                ), 2) as total_profit,
                ROUND(
                    (SUM(CASE WHEN quotation_status = 1 THEN 1 ELSE 0 END) / COUNT(id)) * 100,
                    2
                ) as conversion_rate
            ")
            ->whereNotNull('sales_user_id')
            ->groupBy(DB::raw("{$groupByPeriod}, sales_user_id"))
            ->with('salesUser:id,name,email');
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

    public function adminSalesPerformanceQuery(): QueryBuilder
    {
        return $this->query($this->adminSalesPerformanceModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_leads', 'converted_leads', 'total_revenue', 'total_profit', 'conversion_rate');
    }

    public function paginateAdminSalesPerformanceModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminSalesPerformanceQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function adminRevenueSummaryModel(): Builder
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
                SUM(COALESCE(sale_price,0)) as total_revenue,
                SUM(COALESCE(cost_price,0)) as total_cost,
                SUM(COALESCE(shipping_cost,0)) as total_shipping,
                ROUND(SUM(((COALESCE(cost_price,0) + COALESCE(shipping_cost,0)) * 0.04)), 2) as total_tax,
                ROUND(SUM(
                    COALESCE(sale_price,0) -
                    (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + ((COALESCE(cost_price,0) + COALESCE(shipping_cost,0)) * 0.04))
                ), 2) as total_profit,
                ROUND(
                    (
                        SUM(
                            COALESCE(sale_price,0) -
                            (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + ((COALESCE(cost_price,0) + COALESCE(shipping_cost,0)) * 0.04))
                        )
                        / NULLIF(SUM(COALESCE(sale_price,0)),0)
                    ) * 100,
                    2
                ) as profit_margin_percent
            ")
            ->where('is_active', true)
            ->where('quotation_status', QuotationStatus::Approved->value())
            ->whereHas('order')
            ->groupBy(DB::raw($groupBy));
    }

    public function adminRevenueSummaryQuery(): QueryBuilder
    {
        return $this->query($this->adminRevenueSummaryModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_revenue', 'total_cost', 'total_shipping', 'total_tax', 'total_profit', 'profit_margin_percent');
    }

    public function paginateAdminRevenueSummaryModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminRevenueSummaryQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function adminConversionFunnelModel(): Builder
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
                COUNT(id) as total_quotations,
                SUM(CASE WHEN quotation_status = 1 THEN 1 ELSE 0 END) as approved_quotations,
                SUM(CASE WHEN quotation_status = 2 THEN 1 ELSE 0 END) as rejected_quotations
            ")
            ->groupBy(DB::raw($groupBy));
    }

    public function adminConversionFunnelQuery(): QueryBuilder
    {
        return $this->query($this->adminConversionFunnelModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_quotations', 'approved_quotations', 'rejected_quotations');
    }

    public function paginateAdminConversionFunnelModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminConversionFunnelQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function adminProfitLeaderboardModel(): Builder
    {
        return Quotation::query()
            ->selectRaw("
                sales_user_id,
                ROUND(SUM(
                    COALESCE(sale_price,0) -
                    (COALESCE(cost_price,0) + COALESCE(shipping_cost,0) + ((COALESCE(cost_price,0) + COALESCE(shipping_cost,0)) * 0.04))
                ), 2) as total_profit,
                SUM(COALESCE(sale_price,0)) as total_revenue
            ")
            ->where('quotation_status', 1)
            ->groupBy('sales_user_id')
            ->orderByDesc('total_profit')
            ->with('salesUser:id,name,email')
            ->whereHas('salesUser', function (Builder $query) {
                $query->whereHas('roles', function ($q) {
                    $q->where('name', Roles::Sales->value());
                });
            });
    }

    public function adminProfitLeaderboardQuery(): QueryBuilder
    {
        return $this->query($this->adminProfitLeaderboardModel())
            ->defaultSort('-total_profit')
            ->allowedSorts('total_profit', 'total_revenue');
    }

    public function paginateAdminProfitLeaderboardModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminProfitLeaderboardQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function adminApprovalTurnaroundModel(): Builder
    {
        return Quotation::query()
            ->selectRaw("
                sales_user_id,
                ROUND(AVG(TIMESTAMPDIFF(HOUR, created_at, approval_at)), 2) as avg_approval_hours
            ")
            ->whereNotNull('approval_at')
            ->groupBy('sales_user_id')
            ->with('salesUser:id,name,email')
            ->whereHas('salesUser', function (Builder $query) {
                $query->whereHas('roles', function ($q) {
                    $q->where('name', Roles::Sales->value());
                });
            });
    }

    public function adminApprovalTurnaroundQuery(): QueryBuilder
    {
        return $this->query($this->adminApprovalTurnaroundModel())
            ->defaultSort('-avg_approval_hours')
            ->allowedSorts('avg_approval_hours');
    }

    public function paginateAdminApprovalTurnaroundModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminApprovalTurnaroundQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function adminOrderPaymentModel(): Builder
    {
        $type = request('type', 'day');

        $groupByPeriod = match ($type) {
            'year'  => 'YEAR(created_at)',
            'month' => 'DATE_FORMAT(created_at, "%Y-%m")',
            default => 'DATE(created_at)',
        };

        return Order::query()
            ->selectRaw("
                {$groupByPeriod} as period,
                COUNT(id) as total_orders,
                SUM(CASE WHEN payment_status = 1 THEN 1 ELSE 0 END) as paid_orders,
                SUM(CASE WHEN payment_status = 2 THEN 1 ELSE 0 END) as partial_paid_orders,
                SUM(CASE WHEN payment_status = 0 THEN 1 ELSE 0 END) as unpaid_orders,
                ROUND(
                    (SUM(CASE WHEN payment_status = 1 THEN 1 ELSE 0 END) / COUNT(id)) * 100,
                    2
                ) as payment_success_rate
            ")
            ->groupBy(DB::raw($groupByPeriod));
    }

    public function adminOrderPaymentQuery(): QueryBuilder
    {
        return $this->query($this->adminOrderPaymentModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_orders', 'paid_orders', 'partial_paid_orders', 'unpaid_orders', 'payment_success_rate');
    }

    public function paginateAdminOrderPaymentModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminOrderPaymentQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function adminServiceTeamPerformanceModel(): Builder
    {
        $type = request('type', 'day');

        $groupByPeriod = match ($type) {
            'year'  => 'YEAR(timelines.created_at)',
            'month' => 'DATE_FORMAT(timelines.created_at, "%Y-%m")',
            default => 'DATE(timelines.created_at)',
        };

        return Timeline::query()
            ->selectRaw("
                {$groupByPeriod} as period,
                user_id,
                COUNT(id) as total_comments,
                COUNT(DISTINCT quotation_id) as orders_handled,
                ROUND(
                    (COUNT(DISTINCT quotation_id) / COUNT(id)) * 100,
                    2
                ) as performance_percentage
            ")
            ->whereNotNull('user_id')
            ->whereNotNull('comment')
            ->groupBy(DB::raw("{$groupByPeriod}, user_id"))
            ->with('doneBy:id,name,email')
            ->whereHas('doneBy', function (Builder $query) {
                $query->whereHas('roles', function ($q) {
                    $q->where('name', Roles::Service->value());
                });
            });
    }

    public function adminServiceTeamPerformanceQuery(): QueryBuilder
    {
        return $this->query($this->adminServiceTeamPerformanceModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_comments', 'orders_handled');
    }

    public function paginateAdminServiceTeamPerformanceModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminServiceTeamPerformanceQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function adminServiceTeamWorkloadDistributionModel(): Builder
    {
        $type = request('type', 'day');

        $groupByPeriod = match ($type) {
            'year'  => 'YEAR(timelines.created_at)',
            'month' => 'DATE_FORMAT(timelines.created_at, "%Y-%m")',
            default => 'DATE(timelines.created_at)',
        };

        return Timeline::query()
            ->selectRaw("
                {$groupByPeriod} as period,
                user_id,
                COUNT(DISTINCT quotation_id) as orders_handled,
                COUNT(id) as total_actions
            ")
            ->whereNotNull('user_id')
            ->groupBy(DB::raw($groupByPeriod))
            ->groupBy('user_id')
            ->with('doneBy:id,name,email')
            ->whereHas('doneBy', function (Builder $query) {
                $query->whereHas('roles', function ($q) {
                    $q->where('name', Roles::Service->value());
                });
            });
    }

    public function adminServiceTeamWorkloadDistributionQuery(): QueryBuilder
    {
        return $this->query($this->adminServiceTeamWorkloadDistributionModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_actions', 'orders_handled');
    }

    public function paginateAdminServiceTeamWorkloadDistributionModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminServiceTeamWorkloadDistributionQuery()
            ->paginate($total)
            ->appends(request()->query());
    }

    public function adminServiceTeamRankingModel(): Builder
    {
        $type = request('type', 'day');

        $groupByPeriod = match ($type) {
            'year'  => 'YEAR(timelines.created_at)',
            'month' => 'DATE_FORMAT(timelines.created_at, "%Y-%m")',
            default => 'DATE(timelines.created_at)',
        };

        return Timeline::query()
            ->selectRaw("
                {$groupByPeriod} as period,
                user_id,
                COUNT(DISTINCT quotation_id) as orders_handled,
                COUNT(id) as total_comments,
                (
                    COUNT(DISTINCT quotation_id) * 2 +
                    COUNT(id)
                ) as performance_score
            ")
            ->whereNotNull('user_id')
            ->groupBy(DB::raw($groupByPeriod))
            ->groupBy('user_id')
            ->with('doneBy:id,name,email')
            ->whereHas('doneBy', function (Builder $query) {
                $query->whereHas('roles', function ($q) {
                    $q->where('name', Roles::Service->value());
                });
            });
    }

    public function adminServiceTeamRankingQuery(): QueryBuilder
    {
        return $this->query($this->adminServiceTeamRankingModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_comments', 'orders_handled', 'performance_score');
    }

    public function paginateAdminServiceTeamRankingModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->adminServiceTeamRankingQuery()
            ->paginate($total)
            ->appends(request()->query());
    }
}
