<?php

namespace App\Features\Order\Controllers;

use App\Features\Order\Enums\OrderStatus;
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
            DB::transaction(function () use ($request, $order) {
                $this->orderService->update(
                    [...$request->validated(), 'approval_by_id' => Auth::guard(Guards::API->value())->user()->id, 'approval_at' => now()],
                    $order
                );
            });
            return response()->json(["message" => $request->order_status == OrderStatus::Approved->value() ? "Order approved successfully." : "Order rejected successfully.", "data" => OrderCollection::make($order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
