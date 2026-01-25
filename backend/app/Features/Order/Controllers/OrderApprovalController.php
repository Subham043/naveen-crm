<?php

namespace App\Features\Order\Controllers;

use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Requests\OrderApprovalRequests;
use App\Http\Controllers\Controller;
use App\Features\Order\Resources\OrderCollection;
use App\Features\Order\Services\OrderService;
use Illuminate\Support\Facades\DB;

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
        DB::beginTransaction();
        try {
            //code...
            $this->orderService->update(
                $request->validated(),
                $order
            );
            return response()->json(["message" => $request->order_status == OrderStatus::Approved->value() ? "Order approved successfully." : "Order rejected successfully.", "data" => OrderCollection::make($order)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
