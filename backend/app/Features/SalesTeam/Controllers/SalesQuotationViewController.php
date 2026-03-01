<?php

namespace App\Features\SalesTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Resources\SalesQuotationCollection;
use App\Features\SalesTeam\Services\SalesQuotationService;

class SalesQuotationViewController extends Controller
{
    public function __construct(private SalesQuotationService $salesQuotationService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $salesQuotation = $this->salesQuotationService->getById($id);
        return response()->json(["message" => "Sales Quotation fetched successfully.", "data" => SalesQuotationCollection::make($salesQuotation)], 200);
    }
}
