<?php

namespace App\Features\Report\Controllers\SalesTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\SalesTeam\SalesLeadSourcePerformanceReportCollection;
use App\Features\Report\Services\SalesTeamReportService;
use Illuminate\Http\Request;

class SalesLeadSourcePerformanceReportPaginateController extends Controller
{
    public function __construct(private SalesTeamReportService $salesTeamReportService){}

    /**
     * Returns a paginated collection of sales lead source performance report.
     *
     * @param Request $request
     * @return SalesLeadSourcePerformanceReportCollection
     */
    public function index(Request $request){
        $data = $this->salesTeamReportService->paginateLeadSourcePerformanceModel($request->total ?? 10);
        return SalesLeadSourcePerformanceReportCollection::collection($data);
    }

}
