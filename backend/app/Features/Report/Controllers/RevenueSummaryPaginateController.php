<?php

namespace App\Features\Report\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\RevenueSummaryCollection;
use App\Features\Report\Services\ReportService;
use Illuminate\Http\Request;

class RevenueSummaryPaginateController extends Controller
{
    public function __construct(private ReportService $reportService){}

    /**
     * Returns a paginated collection of revenue summary.
     *
     * @param Request $request
     * @return RevenueSummaryCollection
     */
    public function index(Request $request){
        $data = $this->reportService->paginateRevenueSummaryModel($request->total ?? 10);
        return RevenueSummaryCollection::collection($data);
    }

}
