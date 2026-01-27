<?php

namespace App\Features\Authentication\Services;

use App\Features\Authentication\DTO\LoginDTO;
use App\Features\Authentication\DTO\RegisterDTO;
use App\Features\Roles\Enums\Roles;
use App\Features\Users\DTO\UserCreateDTO;
use App\Features\Users\DTO\UserRoleDTO;
use App\Features\Users\Models\User;
use App\Features\Users\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{

    public function register(RegisterDTO $data): User
    {
		$userDTo = new UserCreateDTO(
			name: $data->name,
			email: $data->email,
			password: $data->password,
			phone: $data->phone,
			is_blocked: false,
		);
        $user = (new UserService)->create($userDTo);
        (new UserService)->syncRoles($user, [new UserRoleDTO(role: Roles::Sales->value())]);
        $user->refresh();
        return $user;
    }

    public function login(LoginDTO $credentials, string $guard)
	{
		return Auth::guard($guard)->attempt($credentials->toArray());
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
		$token = JWTAuth::getToken();

		if (! $token) {
			throw new \Exception('Token not found');
		}

		return JWTAuth::refresh($token);
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
