<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\Admin\AdminRevenueSummaryReportCollection;
use App\Features\Report\Services\AdminReportService;
use Illuminate\Http\Request;

class AdminRevenueSummaryReportPaginateController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Returns a paginated collection of admin revenue summary report.
     *
     * @param Request $request
     * @return AdminRevenueSummaryReportCollection
     */
    public function index(Request $request){
        $data = $this->adminReportService->paginateAdminRevenueSummaryModel($request->total ?? 10);
        return AdminRevenueSummaryReportCollection::collection($data);
    }

}
