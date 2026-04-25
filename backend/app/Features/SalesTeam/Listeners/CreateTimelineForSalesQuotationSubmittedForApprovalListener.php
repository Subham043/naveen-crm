<?php

namespace App\Features\SalesTeam\Listeners;

use App\Features\Roles\Enums\Roles;
use App\Features\SalesTeam\Events\SalesQuotationSubmittedForApproval;
use App\Features\SalesTeam\Mail\QuotationApprovalPendingMail;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Services\TimelineService;
use App\Features\Users\Models\User;
use Illuminate\Support\Facades\Mail;

class CreateTimelineForSalesQuotationSubmittedForApprovalListener implements ShouldQueue
{
    use InteractsWithQueue;

    public $tries = 3;

    /**
     * Create the event listener.
     */
    public function __construct(private TimelineService $timelineService)
    {}

    /**
     * Handle the event.
     */
    public function handle(SalesQuotationSubmittedForApproval $event): void
    {
        DB::transaction(function () use ($event) {
            $changes = new TimelineChangeCollection();
            $changes->pushChange(
                new TimelineChange(
                    field: 'is_active',
                    old: false,
                    new: true
                )
            );

            $message = "Quotation#{$event->quotation->id} was submitted for approval by agent named {$event->userName}<{$event->userEmail}>";
            
            $this->timelineService->createTimeline($event->quotation, $changes, $message, $event->userId, null, null);

            // Mail::to(config('mail.mailers.smtp.admin_email'))->send(
            //     (new QuotationApprovalPendingMail($event->userName, $event->quotation->id))->afterCommit()
            // );

            User::whereHas('roles', function ($q) {
                $q->where('name', Roles::SuperAdmin->value());
            })
            ->select('email') // keep it lightweight
            ->cursor()
            ->each(function ($admin) use ($event) {
                Mail::to($admin->email)->queue(
                    (new QuotationApprovalPendingMail(
                        $event->userName,
                        $event->quotation->id
                    ))->afterCommit()
                );
            });
        });
    }
}
