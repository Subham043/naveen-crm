<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\Admin\AdminSalesPerformanceReportCollection;
use App\Features\Report\Services\AdminReportService;
use Illuminate\Http\Request;

class AdminSalesPerformanceReportPaginateController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Returns a paginated collection of admin sales performance report.
     *
     * @param Request $request
     * @return AdminSalesPerformanceReportCollection
     */
    public function index(Request $request){
        $data = $this->adminReportService->paginateAdminSalesPerformanceModel($request->total ?? 10);
        return AdminSalesPerformanceReportCollection::collection($data);
    }

}
