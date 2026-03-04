<?php

namespace App\Features\Report\Controllers\ServiceTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\ServiceTeam\ServiceTeamPerformanceReportCollection;
use App\Features\Report\Services\ServiceTeamReportService;
use Illuminate\Http\Request;

class ServiceTeamPerformanceReportPaginateController extends Controller
{
    public function __construct(private ServiceTeamReportService $serviceTeamReportService){}

    /**
     * Returns a paginated collection of service team performance report.
     *
     * @param Request $request
     * @return ServiceTeamPerformanceReportCollection
     */
    public function index(Request $request){
        $data = $this->serviceTeamReportService->paginateProductivityModel($request->total ?? 10);
        return ServiceTeamPerformanceReportCollection::collection($data);
    }

}
