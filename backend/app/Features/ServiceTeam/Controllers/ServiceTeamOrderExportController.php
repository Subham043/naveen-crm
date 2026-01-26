<?php

namespace App\Features\ServiceTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\ServiceTeam\Exports\ServiceTeamOrderExport;
use App\Features\ServiceTeam\Services\ServiceTeamOrderService;
use Maatwebsite\Excel\Facades\Excel;

class ServiceTeamOrderExportController extends Controller
{
    public function __construct(private ServiceTeamOrderService $serviceTeamOrderService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new ServiceTeamOrderExport($this->serviceTeamOrderService->query()), 'orders.xlsx');
    }
}
