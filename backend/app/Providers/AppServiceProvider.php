<?php

namespace App\Providers;

use App\Features\Order\Events\PublicOrderCreated;
use App\Features\Order\Listeners\AssignAgentToCreatedPublicOrderListener;
use App\Features\Roles\Enums\Roles;
use App\Features\SalesTeam\Events\SalesOrderCreated;
use App\Features\SalesTeam\Events\SalesOrderSubmittedForApproval;
use App\Features\SalesTeam\Events\SalesOrderUpdated;
use App\Features\SalesTeam\Listeners\CreateTimelineForCreatedSalesOrderListener;
use App\Features\SalesTeam\Listeners\CreateTimelineForSalesOrderSubmittedForApprovalListener;
use App\Features\SalesTeam\Listeners\CreateTimelineForUpdatedSalesOrderListener;
use App\Features\Users\Models\User;
use App\Http\Enums\Throttle;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('local') && class_exists(\Laravel\Telescope\TelescopeServiceProvider::class)) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Gate::before(function ($user, $ability) {
            return $user->hasRole(Roles::SuperAdmin->value()) ? true : null;
        });

        //custom link for reset password
        ResetPassword::createUrlUsing(function (User $user, string $token) {
            // Your frontend base URL (e.g., from config or .env)
            $frontendBase = rtrim(config('auth.client_password_url'), '/');

            // Construct final URL for frontend
            $finalUrl = "{$frontendBase}/{$token}";

            return $finalUrl;
        });

        //custom message for verify email
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            $message = (new MailMessage);
            $message->subject('Verify Email Address');
            $message->greeting('Hello ' . $notifiable->name);
            $message->line('Please click the button below to verify your email address.');
            $message->action('Verify Email Address', $url);
            $message->line('If you did not create an account, no further action is required.');
            return $message;
        });

        //event listeners
        Event::listen(
            PublicOrderCreated::class,
            AssignAgentToCreatedPublicOrderListener::class,
        );
        
        Event::listen(
            SalesOrderCreated::class,
            CreateTimelineForCreatedSalesOrderListener::class,
        );
        
        Event::listen(
            SalesOrderUpdated::class,
            CreateTimelineForUpdatedSalesOrderListener::class,
        );
        
        Event::listen(
            SalesOrderSubmittedForApproval::class,
            CreateTimelineForSalesOrderSubmittedForApprovalListener::class,
        );

        //global rate limiter for all api requests
        RateLimiter::for(Throttle::API->value(), function (Request $request) {
            $key = $this->throttleKey($request, 'throttle-api');
            return Limit::perMinute(100)->by($key)->response(fn(Request $request, array $headers)=>$this->throttleResponse($request, $headers));
        });

        //rate limiter for all api auth requests
        RateLimiter::for(Throttle::AUTH->value(), function (Request $request) {
            $key = $this->throttleKey($request, 'throttle-auth');
            return Limit::perMinute(3)->by($key)->response(fn(Request $request, array $headers)=>$this->throttleResponse($request, $headers));
        });
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    private function throttleKey(Request $request, string $for): string
    {
        if(!empty($request->user()->email)){
            return str()->transliterate(str()->lower($for.':'.$request->user()->email).'|'.$request->user()->id.'|'.$request->ip());
        }
        if(!empty($request->email)){
            return str()->transliterate(
                str()->lower($for.':'.$request->email).'|'.$request->ip()
            );
        }
        return str()->transliterate(
            $for.':'.$request->ip()
        );
    }

    /**
     * Get the rate limiting throttle response for the request.
     */
    private function throttleResponse(Request $request, array $headers)
    {
        $seconds = (int) $headers['Retry-After'] ?? 0;
        $message = 'Too many attempts! You may try again in ';
        if($seconds > 60){
            $message .= ceil($seconds / 60).' minutes.';
        }else{
            $message .= $seconds.' seconds.';
        }
        throw new ThrottleRequestsException($message, null, $headers, 429);
    }
}
