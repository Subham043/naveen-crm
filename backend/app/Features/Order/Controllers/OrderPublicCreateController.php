<?php

namespace App\Features\Order\Controllers;

use App\Features\Order\Enums\LeadSource;
use App\Http\Controllers\Controller;
use App\Features\Order\Requests\OrderPublicCreateRequests;
use App\Features\Order\Services\OrderService;
use Illuminate\Support\Facades\DB;

class OrderPublicCreateController extends Controller
{

    public function __construct(private OrderService $orderService){}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function index(OrderPublicCreateRequests $request){
        DB::beginTransaction();
        try {
            //code...
            $this->orderService->create([
                ...$request->validated(),
                'is_active' => true,
                'is_created_by_agent' => false,
                'lead_source' => LeadSource::Website->value(),
            ]);
            return response()->json([
                "message" => "Order created successfully.",
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
