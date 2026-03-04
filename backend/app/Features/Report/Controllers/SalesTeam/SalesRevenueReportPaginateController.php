<?php

namespace App\Features\Report\Controllers\SalesTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\SalesTeam\SalesRevenueReportCollection;
use App\Features\Report\Services\SalesTeamReportService;
use Illuminate\Http\Request;

class SalesRevenueReportPaginateController extends Controller
{
    public function __construct(private SalesTeamReportService $salesTeamReportService){}

    /**
     * Returns a paginated collection of sales revenue report.
     *
     * @param Request $request
     * @return SalesRevenueReportCollection
     */
    public function index(Request $request){
        $data = $this->salesTeamReportService->paginateSalesRevenueModel($request->total ?? 10);
        return SalesRevenueReportCollection::collection($data);
    }

}
