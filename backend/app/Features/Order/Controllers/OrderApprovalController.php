<?php

namespace App\Features\Order\Controllers;

use App\Features\Order\DTO\OrderApprovalDTO;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Events\OrderApproval;
use App\Features\Order\Requests\OrderApprovalRequests;
use App\Http\Controllers\Controller;
use App\Features\Order\Resources\OrderCollection;
use App\Features\Order\Services\OrderService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class OrderApprovalController extends Controller
{
    public function __construct(private OrderService $orderService){}

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
            $dto = OrderApprovalDTO::fromRequest($request);
            $user = Auth::guard(Guards::API->value())->user();
            $order->disableLogging();
            DB::transaction(function () use ($order, $dto, $user) {
                $this->orderService->update([...$dto->toArray(), 'approval_by_id' => $user->id, 'approval_at' => now()], $order);
            });
            event(new OrderApproval($order, $dto, $user->id, $user->name, $user->email));
            $user2 = request()->user();
            $doneBy = "{$user2->name} <{$user2->email}> ({$user2->currentRole()})";
            $approval_status = $dto->order_status == OrderStatus::Approved->value() ? "approved" : "rejected";
            activity("order_{$order->id}")
			->causedBy($user2)
			->performedOn($order)
			->event("order_{$approval_status}")
			->withProperties([
                'old' => ['order_status' => 0, 'approval_by_id' => null, 'approval_at' => null],
				'attributes' => [...$dto->toArray(), 'approval_by_id' => $user->id, 'approval_at' => now()]
            ])
			->log("Order {$approval_status} by {$doneBy}");
            return response()->json(["message" => "Order {$approval_status} successfully.", "data" => OrderCollection::make($order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
