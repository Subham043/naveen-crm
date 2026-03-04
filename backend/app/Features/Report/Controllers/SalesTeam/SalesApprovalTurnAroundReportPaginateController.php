<?php

namespace App\Features\Report\Controllers\SalesTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\SalesTeam\SalesApprovalTurnAroundReportCollection;
use App\Features\Report\Services\SalesTeamReportService;
use Illuminate\Http\Request;

class SalesApprovalTurnAroundReportPaginateController extends Controller
{
    public function __construct(private SalesTeamReportService $salesTeamReportService){}

    /**
     * Returns a paginated collection of sales approval turnaround report.
     *
     * @param Request $request
     * @return SalesApprovalTurnAroundReportCollection
     */
    public function index(Request $request){
        $data = $this->salesTeamReportService->paginateApprovalTurnaroundModel($request->total ?? 10);
        return SalesApprovalTurnAroundReportCollection::collection($data);
    }

}
