<?php

namespace App\Features\Report\Controllers\SalesTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\SalesTeam\SalesPipelineStatusReportCollection;
use App\Features\Report\Services\SalesTeamReportService;
use Illuminate\Http\Request;

class SalesPipelineStatusReportPaginateController extends Controller
{
    public function __construct(private SalesTeamReportService $salesTeamReportService){}

    /**
     * Returns a paginated collection of sales pipeline status report.
     *
     * @param Request $request
     * @return SalesPipelineStatusReportCollection
     */
    public function index(Request $request){
        $data = $this->salesTeamReportService->paginatePipelineStatusModel($request->total ?? 10);
        return SalesPipelineStatusReportCollection::collection($data);
    }

}
