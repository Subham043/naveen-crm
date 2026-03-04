<?php

namespace App\Features\Report\Controllers\ServiceTeam;

use App\Http\Controllers\Controller;
use App\Features\Report\Exports\ServiceTeam\ServiceTeamPerformanceReportExport;
use App\Features\Report\Services\ServiceTeamReportService;
use Maatwebsite\Excel\Facades\Excel;

class ServiceTeamPerformanceReportExportController extends Controller
{
    public function __construct(private ServiceTeamReportService $serviceTeamReportService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new ServiceTeamPerformanceReportExport($this->serviceTeamReportService->productivityQuery()), 'service_team_performance_report.xlsx');
    }
}
