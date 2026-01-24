<?php
namespace App\Features\Roles\Interfaces;

use Illuminate\Database\Eloquent\Builder;

interface RoleTraitInterface
{
	public function currentRole();
	public function scopeHasRoles(Builder $query, array $roles): Builder;
	public function scopeDoesNotHaveRoles(Builder $query, array $roles): Builder;
}