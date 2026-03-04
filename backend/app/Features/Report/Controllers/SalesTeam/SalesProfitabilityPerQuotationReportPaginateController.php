<?php

namespace App\Features\Report\Controllers\SalesTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\SalesTeam\SalesProfitabilityPerQuotationReportCollection;
use App\Features\Report\Services\SalesTeamReportService;
use Illuminate\Http\Request;

class SalesProfitabilityPerQuotationReportPaginateController extends Controller
{
    public function __construct(private SalesTeamReportService $salesTeamReportService){}

    /**
     * Returns a paginated collection of sales profitability per quotation report.
     *
     * @param Request $request
     * @return SalesProfitabilityPerQuotationReportCollection
     */
    public function index(Request $request){
        $data = $this->salesTeamReportService->paginateProfitabilityPerQuotationModel($request->total ?? 10);
        return SalesProfitabilityPerQuotationReportCollection::collection($data);
    }

}
