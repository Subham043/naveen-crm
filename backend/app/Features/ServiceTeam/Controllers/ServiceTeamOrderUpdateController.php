<?php

namespace App\Features\ServiceTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\ServiceTeam\Requests\ServiceTeamOrderSaveRequests;
use App\Features\ServiceTeam\Resources\ServiceTeamOrderCollection;
use App\Features\ServiceTeam\Services\ServiceTeamOrderService;
use Illuminate\Support\Facades\DB;

class ServiceTeamOrderUpdateController extends Controller
{
    public function __construct(private ServiceTeamOrderService $serviceTeamOrderService){}

    /**
     * Update an user
     *
     * @param ServiceTeamOrderSaveRequests $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ServiceTeamOrderSaveRequests $request, $id){
        $order = $this->serviceTeamOrderService->getById($id);
        try {
            //code...
            $updated_order = DB::transaction(function () use ($request, $order) {
                $updated_order = $this->serviceTeamOrderService->update(
                    [...$request->safe()->except(['yards', 'comment'])],
                    $order
                );
                if($request->yard_located && $request->has('yards')){
                    $this->serviceTeamOrderService->syncYards($request->yards, $updated_order);
                }
                if($request->has('comment')){
                    $this->serviceTeamOrderService->createComment($request->comment, $updated_order);
                }
                return $updated_order->fresh();
            });
            return response()->json(["message" => "Order updated successfully.", "data" => ServiceTeamOrderCollection::make($updated_order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
