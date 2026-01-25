<?php

namespace App\Features\Users\Services;

use App\Features\Authentication\Services\AuthCache;
use App\Features\Users\Models\User;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
// use Illuminate\Auth\Events\Registered;

class UserService
{

    public function model(): Builder
    {
        return User::with(['roles', 'permissions']);
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

    public function all(): Collection
	{
		return $this->query()->lazy(100)->collect();
	}

	public function paginate(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()
			->paginate($total)
			->appends(request()->query());
	}

	public function getById(Int $id): User
	{
		return $this->model()->findOrFail($id);
	}

	public function getByEmail(String $email): User
	{
		return $this->model()->where('email', $email)->firstOrFail();
	}

	public function getByPhone(String $phone): User
	{
		return $this->model()->where('phone', $phone)->firstOrFail();
	}

	public function create(array $data): User
	{
		$user = $this->model()->create([...$data]);
		// event(new Registered($user));
		return $user;
	}

	public function update(array $data, $user): User
	{
		$user->update($data);
		$user->refresh();
		return $user;
	}

	public function syncRoles(array $roles = [], $user): void
	{
		$user->syncRoles($roles);
		AuthCache::forget($user->id);
		app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
	}

	public function delete($user): bool
	{
		return $user->delete();
	}

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->where('name', 'LIKE', '%' . $value . '%')
            ->orWhere('email', 'LIKE', '%' . $value . '%')
            ->orWhere('phone', 'LIKE', '%' . $value . '%');
        });
    }
}
