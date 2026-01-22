<?php

namespace App\Features\SalesTeam\Controllers;

use App\Features\Roles\Enums\Roles;
use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Features\SalesTeam\Exports\SalesOrderExport;
use App\Features\SalesTeam\Services\SalesOrderService;
use Maatwebsite\Excel\Facades\Excel;

class SalesOrderExportController extends Controller
{
    public function __construct(private SalesOrderService $salesOrderService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::API->value())->user()->current_role == Roles::Sales->value()) ? Excel::download(new SalesOrderExport($this->salesOrderService->query()), 'orders.xlsx') : abort(403);
    }
}
