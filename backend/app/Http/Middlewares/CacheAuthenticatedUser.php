<?php

namespace App\Http\Middlewares;

use App\Features\Authentication\Services\AuthCache;
use App\Http\Enums\Guards;
use Illuminate\Support\Facades\Auth;
use Closure;

class CacheAuthenticatedUser
{
    public function handle($request, Closure $next)
    {
        try {
            if (($request->bearerToken() || $request->hasCookie(config('session.cookie'))) && Auth::guard(Guards::API->value())->check()) {
                AuthCache::getCachedUser();
            }
        } catch (\Throwable $e) {
            // ignore
        }

        return $next($request);
    }
}
