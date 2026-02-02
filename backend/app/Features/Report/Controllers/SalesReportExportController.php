<?php

namespace App\Features\Report\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Report\Exports\SalesReportExport;
use App\Features\Report\Services\ReportService;
use Maatwebsite\Excel\Facades\Excel;

class SalesReportExportController extends Controller
{
    public function __construct(private ReportService $reportService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new SalesReportExport($this->reportService->salesReportQuery()), 'sales_report.xlsx');
    }
}
