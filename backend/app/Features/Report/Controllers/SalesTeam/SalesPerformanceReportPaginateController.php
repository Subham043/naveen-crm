<?php

namespace App\Features\Report\Controllers\SalesTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\SalesTeam\SalesPerformanceReportCollection;
use App\Features\Report\Services\SalesTeamReportService;
use Illuminate\Http\Request;

class SalesPerformanceReportPaginateController extends Controller
{
    public function __construct(private SalesTeamReportService $salesTeamReportService){}

    /**
     * Returns a paginated collection of sales performance report.
     *
     * @param Request $request
     * @return SalesPerformanceReportCollection
     */
    public function index(Request $request){
        $data = $this->salesTeamReportService->paginateSalesPerformanceModel($request->total ?? 10);
        return SalesPerformanceReportCollection::collection($data);
    }

}
