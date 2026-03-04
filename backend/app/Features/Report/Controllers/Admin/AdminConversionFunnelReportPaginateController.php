<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\Admin\AdminConversionFunnelReportCollection;
use App\Features\Report\Services\AdminReportService;
use Illuminate\Http\Request;

class AdminConversionFunnelReportPaginateController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Returns a paginated collection of admin conversion funnel report.
     *
     * @param Request $request
     * @return AdminConversionFunnelReportCollection
     */
    public function index(Request $request){
        $data = $this->adminReportService->paginateAdminConversionFunnelModel($request->total ?? 10);
        return AdminConversionFunnelReportCollection::collection($data);
    }

}
