<?php

namespace App\Features\Order\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Order\Exports\OrderExport;
use App\Features\Order\Services\OrderService;
use Maatwebsite\Excel\Facades\Excel;

class OrderExportController extends Controller
{
    public function __construct(private OrderService $orderService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new OrderExport($this->orderService->query()), 'orders.xlsx');
    }
}
