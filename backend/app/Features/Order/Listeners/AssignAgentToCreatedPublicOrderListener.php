<?php

namespace App\Features\Order\Listeners;

use App\Features\Order\Events\PublicOrderCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Features\Users\Models\User;
use Illuminate\Support\Facades\DB;
use App\Features\Roles\Enums\Roles;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use App\Features\Timeline\Services\TimelineService;

class AssignAgentToCreatedPublicOrderListener implements ShouldQueue
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
    public function handle(PublicOrderCreated $event): void
    {
        DB::transaction(function () use ($event) {
            $order = $event->order->fresh();

            if ($order->sales_user_id !== null) {
                return;
            }

            $user = User::query()
                ->whereHas('roles', fn($q) => $q->where('name', Roles::Sales->value()))
                ->where('is_blocked', false)
                ->whereNotNull('email_verified_at')
                ->withCount([
                    'orders_assigned as order_count' => fn($q) => $q->where('is_created_by_agent', false)
                ])
                ->orderBy('order_count', 'asc')
                ->lockForUpdate()
                ->first();  

            if ($user) {
                $order->fill([
                    'sales_user_id' => $user->id,
                    'assigned_at' => now(),
                ]);

                $changes = new TimelineChangeCollection([
                    new TimelineChange('sales_user_id', null, $user->id),
                    new TimelineChange('assigned_at', null, now()),
                ]);
                
                $this->timelineService->createTimeline($order, $changes, "Order#{$order->id} was auto-assigned to {$user->name}<{$user->email}>", null, $user->id);
                
                $order->disableLogging();

                $order->save();

                $doneBy = "{$user->name} <{$user->email}> ({$user->currentRole()})";
                activity("order_{$order->id}")
                ->causedBy($user)
                ->performedOn($order)
                ->event("order_auto_assigned_to_agent")
                ->withProperties([
                    'old' => ['sales_user_id' => null, 'assigned_at' => null],
                    'attributes' => ['sales_user_id' => $user->id, 'assigned_at' => now()]
                ])
                ->log("Order was auto assigned to {$doneBy}");
            }
        });
    }
}
