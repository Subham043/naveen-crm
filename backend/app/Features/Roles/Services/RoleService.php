<?php

namespace App\Features\Roles\Services;

use App\Http\Abstracts\AbstractService;
use App\Features\Roles\Enums\Roles;
use Spatie\Permission\Models\Role;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;

class RoleService extends AbstractService
{
    protected $employee_roles = [Roles::SuperAdmin, Roles::Sales, Roles::Service];

    public function model(): Builder
    {
        return Role::whereIn('name', $this->employee_roles);
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
        ->defaultSort('-id')
        ->allowedSorts('id', 'name')
        ->allowedFilters([
            AllowedFilter::custom('search', new CommonFilter, null, false),
        ]);
    }

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where('name', 'LIKE', '%' . $value . '%');
    }
}
