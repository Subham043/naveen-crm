<?php

namespace App\Features\Order\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Order\Resources\OrderCollection;
use App\Features\Order\Services\OrderService;

class OrderViewController extends Controller
{
    public function __construct(private OrderService $orderService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $order = $this->orderService->getById($id);
        return response()->json(["message" => "Order fetched successfully.", "data" => OrderCollection::make($order)], 200);
    }
}
