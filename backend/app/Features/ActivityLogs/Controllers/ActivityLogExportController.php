<?php

namespace App\Features\ActivityLogs\Controllers;

use App\Http\Controllers\Controller;
use App\Features\ActivityLogs\Exports\ActivityLogExport;
use App\Features\ActivityLogs\Services\ActivityLogService;
use Maatwebsite\Excel\Facades\Excel;

class ActivityLogExportController extends Controller
{
    public function __construct(private ActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new ActivityLogExport($this->logService->getExcelQuery()), 'activity_logs.xlsx');
    }

}
