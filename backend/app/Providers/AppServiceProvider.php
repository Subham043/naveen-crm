<?php

namespace App\Providers;

use App\Features\Order\Events\OrderUpdated;
use App\Features\Order\Listeners\CreateTimelineForUpdatedOrderListener;
use App\Features\Quotation\Events\QuotationApproval;
use App\Features\Quotation\Events\PublicQuotationCreated;
use App\Features\Quotation\Events\QuotationCreated;
use App\Features\Quotation\Events\QuotationUpdated;
use App\Features\Quotation\Events\WebhookQuotationCreated;
// use App\Features\Quotation\Listeners\AssignAgentToCreatedPublicQuotationListener;
use App\Features\Quotation\Listeners\CreateTimelineForCreatedAdminQuotationListener;
use App\Features\Quotation\Listeners\CreateTimelineForCreatedPublicQuotationListener;
use App\Features\Quotation\Listeners\CreateTimelineForQuotationApprovalListener;
use App\Features\Quotation\Listeners\CreateTimelineForUpdatedQuotationListener;
use App\Features\Roles\Enums\Roles;
use App\Features\SalesTeam\Events\AssignSalesQuotationToAgent;
use App\Features\SalesTeam\Events\SalesQuotationCreated;
use App\Features\SalesTeam\Events\SalesQuotationSubmittedForApproval;
use App\Features\SalesTeam\Events\SalesQuotationUpdated;
use App\Features\SalesTeam\Listeners\AssignAgentToQuotationListener;
use App\Features\SalesTeam\Listeners\CreateTimelineForCreatedSalesQuotationListener;
use App\Features\SalesTeam\Listeners\CreateTimelineForSalesQuotationSubmittedForApprovalListener;
use App\Features\SalesTeam\Listeners\CreateTimelineForUpdatedSalesQuotationListener;
use App\Features\ServiceTeam\Events\ServiceTeamOrderUpdated;
use App\Features\ServiceTeam\Listeners\CreateTimelineForUpdatedServiceTeamOrderListener;
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
            PublicQuotationCreated::class,
            CreateTimelineForCreatedPublicQuotationListener::class,
        );
        
        Event::listen(
            WebhookQuotationCreated::class,
            CreateTimelineForCreatedPublicQuotationListener::class,
        );
        
        // Event::listen(
        //     PublicQuotationCreated::class,
        //     AssignAgentToCreatedPublicQuotationListener::class,
        // );
        
        // Event::listen(
        //     WebhookQuotationCreated::class,
        //     AssignAgentToCreatedPublicQuotationListener::class,
        // );
        
        Event::listen(
            AssignSalesQuotationToAgent::class,
            AssignAgentToQuotationListener::class,
        );
        
        Event::listen(
            QuotationCreated::class,
            CreateTimelineForCreatedAdminQuotationListener::class,
        );
        
        Event::listen(
            SalesQuotationCreated::class,
            CreateTimelineForCreatedSalesQuotationListener::class,
        );
        
        Event::listen(
            SalesQuotationUpdated::class,
            CreateTimelineForUpdatedSalesQuotationListener::class,
        );
        
        Event::listen(
            QuotationUpdated::class,
            CreateTimelineForUpdatedQuotationListener::class,
        );
        
        Event::listen(
            SalesQuotationSubmittedForApproval::class,
            CreateTimelineForSalesQuotationSubmittedForApprovalListener::class,
        );

        Event::listen(
            ServiceTeamOrderUpdated::class,
            CreateTimelineForUpdatedServiceTeamOrderListener::class,
        );

        Event::listen(
            OrderUpdated::class,
            CreateTimelineForUpdatedOrderListener::class,
        );
        
        Event::listen(
            QuotationApproval::class,
            CreateTimelineForQuotationApprovalListener::class,
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
