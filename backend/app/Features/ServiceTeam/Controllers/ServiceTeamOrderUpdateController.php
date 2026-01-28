<?php

namespace App\Features\ServiceTeam\Controllers;

use App\Features\Timeline\Collections\YardTimelineDTOCollection;
use App\Features\ServiceTeam\DTO\ServiceTeamOrderSaveDTO;
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

                if ($request->yard_located && $request->has('yards')) {
                    $this->serviceTeamOrderService->syncYards(
                        YardTimelineDTOCollection::fromRequest($request->yards), 
                        $order
                    );
                }

                if($request->has('comment')){
                    $this->timelineService->createTimelineFromRequest($request, $order, 'update', null);
                }

                $order->save();
                return $order->fresh();
            });
            return response()->json(["message" => "Order updated successfully.", "data" => ServiceTeamOrderCollection::make($updated_order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
