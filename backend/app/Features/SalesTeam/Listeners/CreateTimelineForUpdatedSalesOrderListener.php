<?php

namespace App\Features\SalesTeam\Listeners;

use App\Features\SalesTeam\Events\SalesOrderUpdated;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Services\TimelineService;

class CreateTimelineForUpdatedSalesOrderListener implements ShouldQueue
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
    public function handle(SalesOrderUpdated $event): void
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
            
            $this->timelineService->createTimeline($event->order, $changes, "Order#{$event->order->id} was updated by agent named {$event->userName}<{$event->userEmail}>", null, $event->userId);
        });
    }
}
