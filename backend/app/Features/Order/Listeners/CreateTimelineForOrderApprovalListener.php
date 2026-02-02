<?php

namespace App\Features\Order\Listeners;

use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Events\OrderApproval;
use App\Features\Order\Mail\OrderApprovalMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use App\Features\Timeline\Services\TimelineService;
use Illuminate\Support\Facades\Mail;

class CreateTimelineForOrderApprovalListener implements ShouldQueue
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
    public function handle(OrderApproval $event): void
    {
        DB::transaction(function () use ($event) {
            $changes = new TimelineChangeCollection();

            $event->orderApprovalDTO
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

            if($event->orderApprovalDTO->order_status == OrderStatus::Approved->value()){
                $message = "Order#{$event->order->id} was approved by {$event->userName}<{$event->userEmail}>";
            }else{
                $message = "Order#{$event->order->id} was rejected by {$event->userName}<{$event->userEmail}>";
            }
            
            $this->timelineService->createTimeline($event->order, $changes, $message, null, $event->userId);

            Mail::to($event->order->salesUser->email)->send(
                (new OrderApprovalMail($event->order->salesUser->name, $event->order->id, $event->orderApprovalDTO->order_status == OrderStatus::Approved->value() ? 'approved' : 'rejected'))->afterCommit()
            );
        });
    }
}
