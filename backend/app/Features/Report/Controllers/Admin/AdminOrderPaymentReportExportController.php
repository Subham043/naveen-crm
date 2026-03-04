<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Exports\Admin\AdminOrderPaymentReportExport;
use App\Features\Report\Services\AdminReportService;
use Maatwebsite\Excel\Facades\Excel;

class AdminOrderPaymentReportExportController extends Controller
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
        return Excel::download(new AdminOrderPaymentReportExport($this->adminReportService->adminOrderPaymentQuery()), 'admin_order_payment_report.xlsx');
    }
}
