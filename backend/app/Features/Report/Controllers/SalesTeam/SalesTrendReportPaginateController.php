<?php

namespace App\Features\Report\Controllers\SalesTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\SalesTeam\SalesTrendReportCollection;
use App\Features\Report\Services\SalesTeamReportService;
use Illuminate\Http\Request;

class SalesTrendReportPaginateController extends Controller
{
    public function __construct(private SalesTeamReportService $salesTeamReportService){}

    /**
     * Returns a paginated collection of sales trend report.
     *
     * @param Request $request
     * @return SalesTrendReportCollection
     */
    public function index(Request $request){
        $data = $this->salesTeamReportService->paginateSalesTrendModel($request->total ?? 10);
        return SalesTrendReportCollection::collection($data);
    }

}
