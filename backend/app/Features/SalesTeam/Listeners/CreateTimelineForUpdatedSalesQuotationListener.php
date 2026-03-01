<?php

namespace App\Features\SalesTeam\Listeners;

use App\Features\SalesTeam\Events\SalesQuotationUpdated;
use App\Features\SalesTeam\Mail\QuotationApprovalPendingMail;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Services\TimelineService;
use Illuminate\Support\Facades\Mail;

class CreateTimelineForUpdatedSalesQuotationListener implements ShouldQueue
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
    public function handle(SalesQuotationUpdated $event): void
    {
        DB::transaction(function () use ($event) {
            $changes = new TimelineChangeCollection();
            foreach ($event->dto->toArray() as $key => $newValue) {
                $oldValue = $event->oldValues[$key] ?? null;
                if($oldValue != $newValue){
                    $changes->pushChange(
                        new TimelineChange(
                            field: $key,
                            old: $oldValue,
                            new: $newValue
                        )
                    );
                }
            }

            if($changes->isEmpty()){
                return;
            }

            $message = "Quotation#{$event->quotation->id} was updated by agent named {$event->userName}<{$event->userEmail}>";
            
            if($event->dto->is_active && $event->oldValues['is_active'] == 0){
                $message = "Quotation#{$event->quotation->id} was updated and submitted for approval by agent named {$event->userName}<{$event->userEmail}>";

                Mail::to(config('mail.mailers.smtp.admin_email'))->send(
                    (new QuotationApprovalPendingMail($event->userName, $event->quotation->id))->afterCommit()
                );
            }
            
            $this->timelineService->createTimeline($event->quotation, $changes, $message, null, $event->userId);
        });
    }
}
