<?php

namespace App\Features\ActivityLogs\Services;

use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Activitylog\Models\Activity;
use Spatie\QueryBuilder\Filters\Filter;
use Spatie\QueryBuilder\AllowedFilter;

class ActivityLogService
{

	protected function model(): Builder
	{
		return Activity::with([
			'causer' => function ($q) {
				$q->with(['roles', 'permissions']);
			}
		]);
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id')
			->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
					AllowedFilter::callback('log_name', function (Builder $query, $value) {
						$value = explode('~', $value);
						if(count($value) == 2){
							$query->where('log_name', 'LIKE', $value[0] . '%')->where('event', $value[1]);
						}
						if(count($value) == 1){
							$query->where('log_name', 'LIKE', $value[0] . '%');
						}
                    }),
					AllowedFilter::callback('causer_id', function (Builder $query, $value) {
						$query->where('causer_id', $value)->whereHas('causer', function($q) use($value){
							$q->where('id', $value);
						});
                    }),
			]);
	}

	public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}

	public function getById(string $id): Activity
	{
		return $this->model()->findOrFail($id);
	}
}


class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->where('log_name', 'LIKE', '%' . $value . '%')
            ->orWhere('event', 'LIKE', '%' . $value . '%')
            ->orWhere('description', 'LIKE', '%' . $value . '%')
            ->orWhereHas('causer', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%')
                ->orWhere('email', 'LIKE', '%' . $value . '%')
                ->orWhere('phone', 'LIKE', '%' . $value . '%');
            });
        });
    }
}