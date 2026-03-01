<?php

namespace App\Features\Quotation\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Quotation\Exports\QuotationExport;
use App\Features\Quotation\Services\QuotationService;
use Maatwebsite\Excel\Facades\Excel;

class QuotationExportController extends Controller
{
    public function __construct(private QuotationService $quotationService){}

    /**
     * Download all users as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new QuotationExport($this->quotationService->query()), 'quotations.xlsx');
    }
}
