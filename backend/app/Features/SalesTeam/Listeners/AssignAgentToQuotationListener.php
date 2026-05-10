<?php

namespace App\Features\SalesTeam\Listeners;

use App\Features\Quotation\Mail\QuotationAssignedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\SalesTeam\Events\AssignSalesQuotationToAgent;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use App\Features\Timeline\Services\TimelineService;
use Illuminate\Support\Facades\Mail;

class AssignAgentToQuotationListener implements ShouldQueue
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
    public function handle(AssignSalesQuotationToAgent $event): void
    {
        DB::transaction(function () use ($event) {
            $quotation = $event->quotation->fresh();
            $user = $event->user;

            if ($quotation->sales_user_id !== null) {
                return;
            } 

            if ($user) {
                $quotation->fill([
                    'sales_user_id' => $user->id,
                    'assigned_at' => now(),
                ]);

                $changes = new TimelineChangeCollection([
                    new TimelineChange('sales_user_id', null, $user->id),
                    new TimelineChange('assigned_at', null, now()),
                ]);
                
                $this->timelineService->createTimeline($quotation, $changes, "Quotation#{$quotation->id} was auto-assigned to {$user->name}<{$user->email}>", $user->id, null, null);
                
                $quotation->disableLogging();

                $quotation->save();

                Mail::to($user->email)->send(
                    (new QuotationAssignedMail($user->name, $quotation->id))->afterCommit()
                );

                $doneBy = "{$user->name} <{$user->email}> ({$user->currentRole()})";
                activity("quotation_{$quotation->id}")
                ->causedBy($user)
                ->performedOn($quotation)
                ->event("quotation_auto_assigned_to_agent")
                ->withProperties([
                    'old' => ['sales_user_id' => null, 'assigned_at' => null],
                    'attributes' => ['sales_user_id' => $user->id, 'assigned_at' => now()]
                ])
                ->log("Quotation was auto assigned to {$doneBy}");
            }
        });
    }
}
