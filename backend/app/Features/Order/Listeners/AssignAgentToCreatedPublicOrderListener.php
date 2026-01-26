<?php

namespace App\Features\Order\Listeners;

use App\Features\Order\Events\PublicOrderCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Features\Users\Models\User;
use Illuminate\Support\Facades\DB;
use App\Features\Roles\Enums\Roles;

class AssignAgentToCreatedPublicOrderListener implements ShouldQueue
{
    use InteractsWithQueue;

    public $tries = 3;

    /**
     * Create the event listener.
     */
    public function __construct()
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
                $order->timelines()->create([
                    'comment'    => null,
                    'properties' => json_encode([
                        [
                            'old' => [
                                'field' => 'sales_user_id',
                                'value' => null,
                            ],
                            'new' => [
                                'field' => 'sales_user_id',
                                'value' => $user->id,
                            ],
                        ],
                        [
                            'old' => [
                                'field' => 'assigned_at',
                                'value' => null,
                            ],
                            'new' => [
                                'field' => 'assigned_at',
                                'value' => now(),
                            ],
                        ],
                    ]),
                    'message'    => "Order#{$order->id} was auto-assigned to agent named {$user->name}<{$user->email}>",
                    'user_id'    => $user->id,
                ]);
                $order->save();
            }
        });
    }
}
