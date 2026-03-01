<?php

namespace App\Features\SalesTeam\Listeners;

use App\Features\SalesTeam\Events\SalesQuotationCreated;
use App\Features\SalesTeam\Mail\QuotationApprovalPendingMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use App\Features\Timeline\Services\TimelineService;
use Illuminate\Support\Facades\Mail;

class CreateTimelineForCreatedSalesQuotationListener implements ShouldQueue
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
    public function handle(SalesQuotationCreated $event): void
    {
        DB::transaction(function () use ($event) {
            $changes = new TimelineChangeCollection();

            $event->salesQuotationSaveDTO
            ->toCollection()
            ->each(function ($value, $key) use ($changes) {
                if($value == null){
                    return;
                }
                $changes->pushChange(
                    new TimelineChange(
                        field: $key,
                        old: null,
                        new: $value
                    )
                );
            });
            
            if($changes->isEmpty()){
                return;
            }

            $message = "Quotation#{$event->quotation->id} was created by agent named {$event->userName}<{$event->userEmail}>";

            if($event->salesQuotationSaveDTO->is_active){
                $message = "Quotation#{$event->quotation->id} was created and submitted for approval by agent named {$event->userName}<{$event->userEmail}>";

                Mail::to(config('mail.mailers.smtp.admin_email'))->send(
                    (new QuotationApprovalPendingMail($event->userName, $event->quotation->id))->afterCommit()
                );
            }
            
            $this->timelineService->createTimeline($event->quotation, $changes, $message, null, $event->userId);
        });
    }
}
