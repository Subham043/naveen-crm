<?php 

namespace App\Http\Middlewares;

use Closure;
use Illuminate\Http\Request;

class JwtCookieParser
{
    public function handle(Request $request, Closure $next)
    {
        // Skip CORS preflight requests
        if ($request->isMethod('OPTIONS')) {
            return $next($request);
        }

        // If token is missing in Authorization header, pull from cookie
        $token = $request->bearerToken();
        if ((! $token || $token === 'null' || $token === 'undefined') && $request->hasCookie(config('session.cookie', 'WISEMAN_AUTOMART_AUTH'))) {
            $token = $request->cookie(config('session.cookie', 'WISEMAN_AUTOMART_AUTH'));
        }

        if ($token) {
            // Attach header (for guards)
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        return $next($request);
    }
}
