<?php

namespace App\Features\Roles\Traits;

use Illuminate\Database\Eloquent\Builder;

trait RoleTrait
{
    public function currentRole()
    {
        $roles_array = $this->getRoleNames();
        $currentRole = count($roles_array) > 0 ? $roles_array[0] : null;
        return $currentRole;
    }

    public function scopeHasRoles(Builder $query, array $roles): Builder
    {
        return $query->with('roles')
        ->whereHas('roles', function($q) use($roles){
            $q->whereIn('name', $roles);
        });
    }

    public function scopeDoesNotHaveRoles(Builder $query, array $roles): Builder
    {
        return $query->with('roles')
        ->whereHas('roles', function($q) use($roles){
            $q->whereNotIn('name', $roles);
        });
    }
}
