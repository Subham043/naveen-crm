<?php

namespace App\Features\ServiceTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\ServiceTeam\Resources\ServiceTeamOrderCollection;
use App\Features\ServiceTeam\Services\ServiceTeamOrderService;
use Illuminate\Http\Request;

class ServiceTeamOrderPaginateController extends Controller
{
    public function __construct(private ServiceTeamOrderService $serviceTeamOrderService){}

    /**
     * Returns a paginated collection of users.
     *
     * @param Request $request
     * @return ServiceTeamOrderCollection
     */
    public function index(Request $request){
        $data = $this->serviceTeamOrderService->paginate($request->total ?? 10);
        return ServiceTeamOrderCollection::collection($data);
    }

}
