<?php

namespace App\Features\Order\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Order\Resources\OrderCollection;
use App\Features\Order\Services\OrderService;
use Illuminate\Http\Request;

class OrderPaginateController extends Controller
{
    public function __construct(private OrderService $orderService){}

    /**
     * Returns a paginated collection of users.
     *
     * @param Request $request
     * @return OrderCollection
     */
    public function index(Request $request){
        $data = $this->orderService->paginate($request->total ?? 10);
        return OrderCollection::collection($data);
    }

}
