<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Exports\Admin\AdminOrderStatusReportExport;
use App\Features\Report\Services\AdminReportService;
use Maatwebsite\Excel\Facades\Excel;

class AdminOrderStatusReportExportController extends Controller
{
    public function __construct(private AdminReportService $adminReportService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new AdminOrderStatusReportExport($this->adminReportService->adminOrderStatusQuery()), 'admin_order_status_report.xlsx');
    }
}
