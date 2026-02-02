<?php

namespace App\Features\Report\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\AgentPerformanceReportCollection;
use App\Features\Report\Services\ReportService;
use Illuminate\Http\Request;

class AgentPerformanceReportPaginateController extends Controller
{
    public function __construct(private ReportService $reportService){}

    /**
     * Returns a paginated collection of agent performance report.
     *
     * @param Request $request
     * @return AgentPerformanceReportCollection
     */
    public function index(Request $request){
        $data = $this->reportService->paginateAgentWisePerformanceModel($request->total ?? 10);
        return AgentPerformanceReportCollection::collection($data);
    }

}
