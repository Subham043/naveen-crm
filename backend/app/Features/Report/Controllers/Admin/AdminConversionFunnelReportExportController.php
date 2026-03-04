<?php

namespace App\Features\Report\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Features\Report\Exports\Admin\AdminConversionFunnelReportExport;
use App\Features\Report\Services\AdminReportService;
use Maatwebsite\Excel\Facades\Excel;

class AdminConversionFunnelReportExportController extends Controller
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
        return Excel::download(new AdminConversionFunnelReportExport($this->adminReportService->adminConversionFunnelQuery()), 'admin_conversion_funnel_report.xlsx');
    }
}
