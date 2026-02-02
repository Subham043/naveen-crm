<?php

namespace App\Features\SalesTeam\Listeners;

use App\Features\SalesTeam\Events\SalesOrderSubmittedForApproval;
use App\Features\SalesTeam\Mail\OrderApprovalPendingMail;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Services\TimelineService;
use Illuminate\Support\Facades\Mail;

class CreateTimelineForSalesOrderSubmittedForApprovalListener implements ShouldQueue
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
    public function handle(SalesOrderSubmittedForApproval $event): void
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

            $message = "Order#{$event->order->id} was submitted for approval by agent named {$event->userName}<{$event->userEmail}>";
            
            $this->timelineService->createTimeline($event->order, $changes, $message, null, $event->userId);

            Mail::to(config('mail.mailers.smtp.admin_email'))->send(
                (new OrderApprovalPendingMail($event->userName, $event->order->id))->afterCommit()
            );
        });
    }
}
