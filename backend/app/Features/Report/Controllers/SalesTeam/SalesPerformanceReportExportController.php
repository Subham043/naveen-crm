<?php

namespace App\Features\Report\Controllers\SalesTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Exports\SalesTeam\SalesPerformanceReportExport;
use App\Features\Report\Services\SalesTeamReportService;
use Maatwebsite\Excel\Facades\Excel;

class SalesPerformanceReportExportController extends Controller
{
    public function __construct(private SalesTeamReportService $salesTeamReportService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new SalesPerformanceReportExport($this->salesTeamReportService->salesPerformanceQuery()), 'sales_performance_report.xlsx');
    }
}
