<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\Admin\AdminOrderStatusReportCollection;
use App\Features\Report\Services\AdminReportService;
use Illuminate\Http\Request;

class AdminOrderStatusReportPaginateController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Returns a paginated collection of admin service performance report.
     *
     * @param Request $request
     * @return AdminOrderStatusReportCollection
     */
    public function index(Request $request){
        $data = $this->adminReportService->paginateAdminOrderStatusModel($request->total ?? 10);
        return AdminOrderStatusReportCollection::collection($data);
    }

}
