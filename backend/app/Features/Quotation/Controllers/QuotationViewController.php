<?php

namespace App\Features\Quotation\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Quotation\Resources\QuotationCollection;
use App\Features\Quotation\Services\QuotationService;

class QuotationViewController extends Controller
{
    public function __construct(private QuotationService $quotationService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $quotation = $this->quotationService->getById($id);
        return response()->json(["message" => "Quotation fetched successfully.", "data" => QuotationCollection::make($quotation)], 200);
    }
}
