<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\Admin\AdminOrderPaymentReportCollection;
use App\Features\Report\Services\AdminReportService;
use Illuminate\Http\Request;

class AdminOrderPaymentReportPaginateController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Returns a paginated collection of admin service performance report.
     *
     * @param Request $request
     * @return AdminOrderPaymentReportCollection
     */
    public function index(Request $request){
        $data = $this->adminReportService->paginateAdminOrderPaymentModel($request->total ?? 10);
        return AdminOrderPaymentReportCollection::collection($data);
    }

}
