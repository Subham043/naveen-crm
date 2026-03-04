<?php

namespace App\Features\Report\Services;

use App\Features\Timeline\Models\Timeline;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ServiceTeamReportService
{
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

    public function productivityModel(): Builder
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
                COUNT(id) as total_comments,
                COUNT(DISTINCT quotation_id) as orders_handled,
                ROUND(
                    COUNT(id) / NULLIF(COUNT(DISTINCT quotation_id), 0),
                    2
                ) as avg_comments_per_order,
                (
                    COUNT(DISTINCT quotation_id) * 2 +
                    COUNT(id)
                ) as performance_score
            ")
            ->whereNotNull('user_id')
            ->whereNotNull('comment')
            ->where('user_id', request()->user()->id)
            ->groupBy(DB::raw($groupByPeriod));
    }

    public function productivityQuery(): QueryBuilder
    {
        return $this->query($this->productivityModel())
            ->defaultSort('-period')
            ->allowedSorts('period', 'total_comments', 'orders_handled', 'performance_score', 'avg_comments_per_order');
    }

    public function paginateProductivityModel(Int $total = 10): LengthAwarePaginator
    {
        return $this->productivityQuery()
            ->paginate($total)
            ->appends(request()->query());
    }


}