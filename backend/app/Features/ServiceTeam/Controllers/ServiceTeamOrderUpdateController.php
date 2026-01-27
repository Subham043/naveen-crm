<?php

namespace App\Features\ServiceTeam\Controllers;

use App\Features\ServiceTeam\DTO\ServiceTeamOrderSaveDTO;
use App\Features\ServiceTeam\DTO\YardDTO;
use App\Features\Timeline\Services\TimelineService;
use App\Http\Controllers\Controller;
use App\Features\ServiceTeam\Requests\ServiceTeamOrderSaveRequests;
use App\Features\ServiceTeam\Resources\ServiceTeamOrderCollection;
use App\Features\ServiceTeam\Services\ServiceTeamOrderService;
use Illuminate\Support\Facades\DB;

class ServiceTeamOrderUpdateController extends Controller
{
    public function __construct(private ServiceTeamOrderService $serviceTeamOrderService, private TimelineService $timelineService){}


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
                $order->fill(ServiceTeamOrderSaveDTO::fromRequest($request)->toArray());

                // ---- PREPARE yard changes BEFORE saving ----
                // $yardChanges = [];

                if ($request->yard_located && $request->has('yards')) {
                    $yards_collection = collect($request->yards)->map(function ($yard) {
                        return new YardDTO($yard['yard'], $yard['id'] ?? null);
                    }); 
                    // $yardChanges = $this->timelineService->prepareYardChanges($order, $request->yards);
                    $this->serviceTeamOrderService->syncYards(
                        $yards_collection->toArray(), 
                        $order
                    );
                }

                // if($request->has('comment')){
                //     $this->timelineService->createTimelineFromRequest($request, $order, $yardChanges, 'update', null);
                // }

                $order->save();
                return $order->fresh();
            });
            return response()->json(["message" => "Order updated successfully.", "data" => ServiceTeamOrderCollection::make($updated_order)], 200);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
