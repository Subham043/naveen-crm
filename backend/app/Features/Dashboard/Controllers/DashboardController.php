<?php

namespace App\Features\Dashboard\Controllers;

use App\Features\Dashboard\Resources\AdminDashboardCollection;
use App\Features\Dashboard\Resources\SalesTeamDashboardCollection;
use App\Features\Dashboard\Resources\ServiceTeamDashboardCollection;
use App\Features\Dashboard\Services\AdminDashboardService;
use App\Features\Dashboard\Services\SalesTeamDashboardService;
use App\Features\Dashboard\Services\ServiceTeamDashboardService;
use App\Features\Roles\Enums\Roles;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function __construct(private AdminDashboardService $adminDashboardService, private SalesTeamDashboardService $salesTeamDashboardService, private ServiceTeamDashboardService $serviceTeamDashboardService){}

    /**
     * Update an user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        if(request()->user()->hasRole(Roles::SuperAdmin->value())){
            $data = $this->adminDashboardService->get();
            return response()->json([
                "message" => "Success",
                "data" => AdminDashboardCollection::make($data)
            ], 200);
        }else if(request()->user()->hasRole(Roles::Service->value())){
            $data = $this->serviceTeamDashboardService->get();
            return response()->json([
                "message" => "Success",
                "data" => ServiceTeamDashboardCollection::make($data)
            ], 200);
        }else {
            $data = $this->salesTeamDashboardService->get();
            return response()->json([
                "message" => "Success",
                "data" => SalesTeamDashboardCollection::make($data)
            ], 200);
        }
    }
}
