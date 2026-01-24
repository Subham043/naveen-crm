<?php

namespace App\Features\SalesTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Resources\SalesOrderCollection;
use App\Features\SalesTeam\Services\SalesOrderService;
use Illuminate\Support\Facades\DB;

class SalesOrderSubmitForApprovalController extends Controller
{
    public function __construct(private SalesOrderService $salesOrderService){}

    /**
     * Update an user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $order = $this->salesOrderService->getByIdAndIsInactive($id);
        if(empty($order->country_code) || empty($order->phone) || empty($order->billing_address) || empty($order->part_name) || empty($order->part_description)){
            return response()->json(["message" => "Please fill all the required fields to submit for approval."], 400);
        }
        DB::beginTransaction();
        try {
            //code...
            $this->salesOrderService->update(
                ['is_active' => 1],
                $order
            );
            return response()->json(["message" => "Order submitted for approval successfully.", "data" => SalesOrderCollection::make($order)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
