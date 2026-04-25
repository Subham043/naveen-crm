<?php

namespace App\Features\Quotation\Listeners;

use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Quotation\Events\QuotationApproval;
use App\Features\Quotation\Mail\OrderGeneratedMail;
use App\Features\Quotation\Mail\QuotationApprovalMail;
use App\Features\Roles\Enums\Roles;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use App\Features\Timeline\Services\TimelineService;
use App\Features\Users\Models\User;
use Illuminate\Support\Facades\Mail;

class CreateTimelineForQuotationApprovalListener implements ShouldQueue
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
    public function handle(QuotationApproval $event): void
    {
        DB::transaction(function () use ($event) {
            $changes = new TimelineChangeCollection();

            $event->quotationApprovalDTO
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

            $order_id = null;

            if($event->quotationApprovalDTO->quotation_status == QuotationStatus::Approved->value()){
                $order_id = $event->quotation->order->id;
                $message = "Quotation#{$event->quotation->id} was approved by {$event->userName}<{$event->userEmail}>. Order#{$order_id} was created.";
            }else{
                $message = "Quotation#{$event->quotation->id} was rejected by {$event->userName}<{$event->userEmail}>";
            }
            
            $this->timelineService->createTimeline($event->quotation, $changes, $message, $event->userId, null, null);

            Mail::to($event->quotation->salesUser->email)->send(
                (new QuotationApprovalMail($event->quotation->salesUser->name, $event->quotation->id, $event->quotationApprovalDTO->quotation_status == QuotationStatus::Approved->value() ? 'approved' : 'rejected'))->afterCommit()
            );

            if($order_id){
                User::whereHas('roles', function ($q) {
                        $q->where('name', Roles::Service->value());
                    })
                    ->select('email') // keep it lightweight
                    ->cursor()
                    ->each(function ($admin) use ($event, $order_id) {
                        Mail::to($admin->email)->queue(
                            (new OrderGeneratedMail(
                                $event->userName,
                                $order_id
                            ))->afterCommit()
                        );
                    });
            }

        });
    }
}
