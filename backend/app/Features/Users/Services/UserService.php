<?php

namespace App\Features\Users\Services;

use App\Features\Authentication\Services\AuthCache;
use App\Features\Users\DTO\UserCreateDTO;
use App\Features\Users\DTO\UserRoleDTO;
use App\Features\Users\DTO\UserUpdateDTO;
use App\Features\Users\Models\User;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

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
                    AllowedFilter::callback('is_blocked', function (Builder $query, $value) {
						if(strtolower($value) == "yes"){
                            $query->where('is_blocked', true);
                        }
                        if(strtolower($value) == "no"){
                            $query->where('is_blocked', false);
                        }
                    }),
                    AllowedFilter::callback('is_verified', function (Builder $query, $value) {
						if(strtolower($value) == "yes"){
							$query->whereNotNull('email_verified_at');
						}
						if(strtolower($value) == "no"){
							$query->whereNull('email_verified_at');
						}
                    }),
                    AllowedFilter::callback('role', function (Builder $query, $value) {
                        $query->whereHas('roles', function($q) use($value){
                            $q->where('name', $value);
                        });
                    }),
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

	public function create(UserCreateDTO $data): User
	{
		$user = $this->model()->create($data->toArray());
		return $user;
	}

	public function update(UserUpdateDTO $data, $user): User
	{
		$user->update($data->toArray());
		$user->refresh();
		return $user;
	}
	
	public function toggleBlock($user): User
	{
		$user->update(['is_blocked' => !$user->is_blocked]);
		$user->refresh();
		return $user;
	}

	/**
	 * @param User $user
	 * @param UserRoleDTO[] $roles
	 */
	public function syncRoles(User $user, array $roles = []): void
	{
		$roleNames = array_map(
			static fn (UserRoleDTO $dto) => $dto->role,
			$roles
		);
		$user->syncRoles($roleNames);
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
