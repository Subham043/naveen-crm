<?php

namespace App\Features\SalesTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Exports\SalesQuotationExport;
use App\Features\SalesTeam\Services\SalesQuotationService;
use Maatwebsite\Excel\Facades\Excel;

class SalesQuotationExportController extends Controller
{
    public function __construct(private SalesQuotationService $salesQuotationService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new SalesQuotationExport($this->salesQuotationService->query()), 'quotations.xlsx');
    }
}
