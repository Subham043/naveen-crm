<?php

namespace App\Features\SalesTeam\Controllers;

use App\Features\SalesTeam\DTO\SalesOrderSaveDTO;
use App\Features\SalesTeam\Events\SalesOrderUpdated;
use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Requests\SalesOrderSaveRequests;
use App\Features\SalesTeam\Resources\SalesOrderCollection;
use App\Features\SalesTeam\Services\SalesOrderService;
use App\Features\Timeline\Collections\TimelineChangeCollection;
use App\Features\Timeline\DTO\TimelineChange;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

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
            $dto = SalesOrderSaveDTO::fromRequest($request);
            /**
             * Capture old values BEFORE update
             */
            $oldValues = $order->only(array_keys($dto->toArray()));
            $user = Auth::guard(Guards::API->value())->user();

            $updated_order = DB::transaction(function () use ($dto, $order) {
                return $this->salesOrderService->update(
                    $dto->toArray(),
                    $order
                );
            });
            
            event(new SalesOrderUpdated($updated_order, $oldValues, $dto, $user->id, $user->name, $user->email));
            return response()->json(["message" => "Order updated successfully.", "data" => SalesOrderCollection::make($updated_order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
