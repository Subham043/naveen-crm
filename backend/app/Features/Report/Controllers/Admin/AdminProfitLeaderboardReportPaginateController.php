<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Resources\Admin\AdminProfitLeaderboardReportCollection;
use App\Features\Report\Services\AdminReportService;
use Illuminate\Http\Request;

class AdminProfitLeaderboardReportPaginateController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Returns a paginated collection of admin profit leaderboard report.
     *
     * @param Request $request
     * @return AdminProfitLeaderboardReportCollection
     */
    public function index(Request $request){
        $data = $this->adminReportService->paginateAdminProfitLeaderboardModel($request->total ?? 10);
        return AdminProfitLeaderboardReportCollection::collection($data);
    }

}
