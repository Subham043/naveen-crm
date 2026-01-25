<?php 

namespace App\Http\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtCookieParser
{
    public function handle(Request $request, Closure $next)
    {
        // Skip CORS preflight requests
        if ($request->isMethod('OPTIONS')) {
            return $next($request);
        }

        // Skip auth routes and public order create route
        if($request->is('api/v1/auth/*') || $request->is('api/v1/order/public/create')){
            return $next($request);
        }

        // If token is missing in Authorization header, pull from cookie
        $token = $request->bearerToken();
        if ((! $token || $token === 'null' || $token === 'undefined') && $request->hasCookie(config('session.cookie'))) {
            $token = $request->cookie(config('session.cookie'));
            // $request->headers->set('Authorization', 'Bearer ' . $token);
        }
        if ($token) {
            // Make JWTAuth aware of the token
            JWTAuth::setToken($token);

            // Also attach header (for guards)
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        return $next($request);
    }
}
