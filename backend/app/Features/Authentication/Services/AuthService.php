<?php

namespace App\Features\Authentication\Services;

use App\Features\Authentication\DTO\LoginDTO;
use App\Features\Authentication\DTO\RegisterDTO;
use App\Features\Roles\Enums\Roles;
use App\Features\Users\DTO\UserCreateDTO;
use App\Features\Users\DTO\UserRoleDTO;
use App\Features\Users\Models\User;
use App\Features\Users\Services\UserService;
use App\Http\Enums\Guards;
use Illuminate\Support\Facades\Auth;

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

    public function login(LoginDTO $credentials, Guards $guard)
	{
		return Auth::guard($guard->value())->attempt($credentials->toArray());
	}

	public function set_cookie(string $token): \Symfony\Component\HttpFoundation\Cookie
	{
		$cookie = cookie(
			config('session.cookie', 'CRM_AUTH'),
			$token,
			(int) config('session.lifetime'), // minutes
			config('session.path'),
			config('session.domain'),
			app()->environment('production'),  // Secure (only over HTTPS)
			true,  // HttpOnly (not accessible via JS)
			(bool) !config('session.encrypt'),
			'Strict'
		);
		return $cookie;
	}

	public function refresh_token(?Guards $guard = Guards::API): string
	{
		/** @var \Tymon\JWTAuth\JWTGuard $guard */
		$guard = Auth::guard($guard->value());
		return $guard->refresh();
	}

	public function profile(Guards $guard): User
	{
		return AuthCache::getCachedUser($guard);
	}

	public function logout(Guards $guard): void
	{
		AuthCache::forget(Auth::guard($guard->value())->id());
		Auth::guard($guard->value())->logout(true);
	}

}
