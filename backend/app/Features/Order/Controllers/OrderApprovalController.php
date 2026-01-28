<?php

namespace App\Features\Order\Controllers;

use App\Features\Order\DTO\OrderApprovalDTO;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Requests\OrderApprovalRequests;
use App\Http\Controllers\Controller;
use App\Features\Order\Resources\OrderCollection;
use App\Features\Order\Services\OrderService;
use App\Features\Timeline\Services\TimelineService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class OrderApprovalController extends Controller
{
    public function __construct(private OrderService $orderService, private TimelineService $timelineService){}

    /**
     * Update an user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(OrderApprovalRequests $request, $id){
        $order = $this->orderService->getByIdAndActiveStatus($id, true);
        try {
            //code...
            DB::transaction(function () use ($request, $order) {
                $user = Auth::guard(Guards::API->value())->user();
                $order->fill([...OrderApprovalDTO::fromRequest($request)->toArray(), 'approval_by_id' => $user->id, 'approval_at' => now()]);
                $is_approved = $request->order_status == OrderStatus::Approved->value();
                $is_approved_message = $is_approved ? 'approved' : 'rejected';
                $message = "Order#{$order->id} was {$is_approved_message} by {$user->name}<{$user->email}>";
                $this->timelineService->createTimelineFromRequest($request, $order, 'update', $message);
                $order->save();
                return $order->fresh();
            });
            return response()->json(["message" => $request->order_status == OrderStatus::Approved->value() ? "Order approved successfully." : "Order rejected successfully.", "data" => OrderCollection::make($order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
