<?php

namespace App\Features\Report\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\SalesReportCollection;
use App\Features\Report\Services\ReportService;
use Illuminate\Http\Request;

class SalesReportPaginateController extends Controller
{
    public function __construct(private ReportService $reportService){}

    /**
     * Returns a paginated collection of sales report.
     *
     * @param Request $request
     * @return SalesReportCollection
     */
    public function index(Request $request){
        $data = $this->reportService->paginateSalesReportModel($request->total ?? 10);
        return SalesReportCollection::collection($data);
    }

}
