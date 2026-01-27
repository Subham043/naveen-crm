<?php

namespace App\Features\SalesTeam\Controllers;

use App\Features\SalesTeam\DTO\SalesOrderSaveDTO;
use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Requests\SalesOrderSaveRequests;
use App\Features\SalesTeam\Resources\SalesOrderCollection;
use App\Features\SalesTeam\Services\SalesOrderService;
use Illuminate\Support\Facades\DB;

class SalesOrderUpdateController extends Controller
{
    public function __construct(private SalesOrderService $salesOrderService){}

    /**
     * Update an user
     *
     * @param SalesOrderSaveRequests $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(SalesOrderSaveRequests $request, $id){
        $order = $this->salesOrderService->getByIdAndIsInactive($id);
        try {
            //code...
            $updated_order = DB::transaction(function () use ($request, $order) {
                return $this->salesOrderService->update(
                    SalesOrderSaveDTO::fromRequest($request)->toArray(),
                    $order
                );
            });
            return response()->json(["message" => "Order updated successfully.", "data" => SalesOrderCollection::make($updated_order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
