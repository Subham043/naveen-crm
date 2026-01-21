<?php

namespace App\Features\Authentication\Services;

use App\Features\Roles\Enums\Roles;
use App\Features\Users\Models\User;
use App\Features\Users\Services\UserService;
use App\Http\Enums\Guards;
use Illuminate\Support\Facades\Auth;

class AuthService
{

    public function register(array $data): User
    {
        $user = (new UserService)->create($data);
        (new UserService)->syncRoles([Roles::User->value()], $user);
        $user->refresh();
        return $user;
    }

    public function login(array $credentials, string $guard)
	{
		return Auth::guard($guard)->attempt($credentials);
	}

	public function set_cookie(string $token): \Symfony\Component\HttpFoundation\Cookie
	{
		$cookie = cookie(
			config('session.cookie'),
			$token,
			(int) config('session.lifetime'), // minutes
			config('session.path'),
			config('session.domain'),
			app()->environment('production'),  // Secure (only over HTTPS)
			true,  // HttpOnly (not accessible via JS)
			false,
			'Strict'
		);
		return $cookie;
	}

	public function refresh_token(): string
	{
		/** @var \Tymon\JWTAuth\JWTGuard $guard */
		$guard = Auth::guard(Guards::API->value());
		return $guard->refresh();
	}

	public function profile(string $guard): User
	{
		return AuthCache::getCachedUser($guard);
	}

	public function logout(string $guard): void
	{
		AuthCache::forget(Auth::guard($guard)->id());
		Auth::guard($guard)->logout(true);
	}

}
