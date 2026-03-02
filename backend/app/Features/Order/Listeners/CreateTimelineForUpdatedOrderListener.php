<?php

namespace App\Features\Order\Listeners;

use App\Features\Order\Events\OrderUpdated;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Services\TimelineService;

class CreateTimelineForUpdatedOrderListener implements ShouldQueue
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
    public function handle(OrderUpdated $event): void
    {
        DB::transaction(function () use ($event) {
            $changes = new TimelineChangeCollection();
            foreach (array_merge($event->orderDto->toArray(), $event->quotationDto->toArray()) as $key => $newValue) {
                $oldValue = $event->oldOrderValues[$key] ?? null;
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
            
            if($event->yards && count($event->yards->toDatabaseArray())>0){
                $yardChanges = $this->timelineService->prepareYardChanges($event->oldYardValues, $event->yards);
                $yardChanges->each(function ($change) use ($changes) {
                    $changes->pushChange($change);
                });
            }

            if($changes->isEmpty()){
                return;
            }

            $message = "Order#{$event->order->id} was updated by {$event->userName}<{$event->userEmail}>";
            
            $this->timelineService->createTimeline($event->order->quotation, $changes, $message, $event->userId, null, null);
        });
    }
}
