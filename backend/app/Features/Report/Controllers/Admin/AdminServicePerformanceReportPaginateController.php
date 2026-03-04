<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\Admin\AdminServicePerformanceReportCollection;
use App\Features\Report\Services\AdminReportService;
use Illuminate\Http\Request;

class AdminServicePerformanceReportPaginateController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Returns a paginated collection of admin service performance report.
     *
     * @param Request $request
     * @return AdminServicePerformanceReportCollection
     */
    public function index(Request $request){
        $data = $this->adminReportService->paginateAdminServiceTeamPerformanceModel($request->total ?? 10);
        return AdminServicePerformanceReportCollection::collection($data);
    }

}
