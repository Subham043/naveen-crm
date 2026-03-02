<?php

namespace App\Features\Quotation\Listeners;

use App\Features\Quotation\Events\QuotationUpdated;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Services\TimelineService;

class CreateTimelineForUpdatedQuotationListener implements ShouldQueue
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
    public function handle(QuotationUpdated $event): void
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

            $message = "Quotation#{$event->quotation->id} was updated by {$event->userName}<{$event->userEmail}>";
            
            $this->timelineService->createTimeline($event->quotation, $changes, $message, $event->userId, null, null);
        });
    }
}
