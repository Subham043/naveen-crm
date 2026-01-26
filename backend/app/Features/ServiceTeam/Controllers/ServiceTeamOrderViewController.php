<?php

namespace App\Features\ServiceTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\ServiceTeam\Resources\ServiceTeamOrderCollection;
use App\Features\ServiceTeam\Services\ServiceTeamOrderService;

class ServiceTeamOrderViewController extends Controller
{
    public function __construct(private ServiceTeamOrderService $serviceTeamOrderService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $serviceTeamOrder = $this->serviceTeamOrderService->getById($id);
        return response()->json(["message" => "Service Team Order fetched successfully.", "data" => ServiceTeamOrderCollection::make($serviceTeamOrder)], 200);
    }
}
