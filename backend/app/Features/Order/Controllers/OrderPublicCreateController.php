<?php

namespace App\Features\Order\Controllers;

use App\Features\Order\DTO\OrderPublicCreateDTO;
use App\Features\Order\Enums\LeadSource;
use App\Features\Order\Events\PublicOrderCreated;
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
        try {
            $order = DB::transaction(function () use ($request) {
                return $this->orderService->create([
                    ...OrderPublicCreateDTO::fromRequest($request)->toArray(),
                    'is_active' => false,
                    'is_created_by_agent' => false,
                    'lead_source' => LeadSource::Website->value(),
                ]);
            });
            event(new PublicOrderCreated($order));
            return response()->json([
                "message" => "Order created successfully.",
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
