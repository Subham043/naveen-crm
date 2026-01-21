<?php

namespace App\Features\Authentication\Services;

use App\Features\Authentication\Enums\AuthCacheKey;
use App\Features\Users\Models\User;
use Illuminate\Support\Facades\Cache;
use App\Http\Enums\Guards;
use Illuminate\Support\Facades\Auth;

class AuthCache
{
    public static function get($id)
    {
        return Cache::remember(AuthCacheKey::KEY->value($id), now()->addHours(24), function () use ($id) {
            return User::with(['roles', 'permissions'])->find($id);
        });
    }

    public static function forget($id)
    {
        Cache::forget(AuthCacheKey::KEY->value($id));
    }
    
    public static function getCachedUser($guard = null)
    {
        $cachedUser = AuthCache::get(Auth::guard($guard ?? Guards::API->value())->id());
    
        // Override Laravel's auth user
        Auth::guard($guard ?? Guards::API->value())->setUser($cachedUser);

        return $cachedUser;
    }
}
