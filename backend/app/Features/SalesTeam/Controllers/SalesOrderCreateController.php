<?php

namespace App\Features\SalesTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Requests\SalesOrderSaveRequests;
use App\Features\SalesTeam\Resources\SalesOrderCollection;
use App\Features\SalesTeam\Services\SalesOrderService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class SalesOrderCreateController extends Controller
{

    public function __construct(private SalesOrderService $salesOrderService){}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function index(SalesOrderSaveRequests $request){
        try {
            //code...
            $order = DB::transaction(function () use ($request) {
                return $this->salesOrderService->create([
                    ...$request->validated(),
                    'sales_user_id' => Auth::guard(Guards::API->value())->user()->id,
                    'is_created_by_agent' => true,
                ]);
            });
            return response()->json([
                "message" => $request->is_active ? "Order saved successfully." : "Order saved as draft successfully.",
                "data" => SalesOrderCollection::make($order),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
