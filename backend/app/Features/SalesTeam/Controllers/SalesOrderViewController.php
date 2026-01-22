<?php

namespace App\Features\SalesTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Resources\SalesOrderCollection;
use App\Features\SalesTeam\Services\SalesOrderService;

class SalesOrderViewController extends Controller
{
    public function __construct(private SalesOrderService $salesOrderService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $salesOrder = $this->salesOrderService->getById($id);
        return response()->json(["message" => "Sales Order fetched successfully.", "data" => SalesOrderCollection::make($salesOrder)], 200);
    }
}
