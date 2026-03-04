<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\Admin\AdminApprovalTurnAroundReportCollection;
use App\Features\Report\Services\AdminReportService;
use Illuminate\Http\Request;

class AdminApprovalTurnAroundReportPaginateController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Returns a paginated collection of admin approval turn around report.
     *
     * @param Request $request
     * @return AdminApprovalTurnAroundReportCollection
     */
    public function index(Request $request){
        $data = $this->adminReportService->paginateAdminApprovalTurnAroundModel($request->total ?? 10);
        return AdminApprovalTurnAroundReportCollection::collection($data);
    }

}
