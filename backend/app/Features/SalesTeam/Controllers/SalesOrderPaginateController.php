<?php

namespace App\Features\SalesTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Resources\SalesOrderCollection;
use App\Features\SalesTeam\Services\SalesOrderService;
use Illuminate\Http\Request;

class SalesOrderPaginateController extends Controller
{
    public function __construct(private SalesOrderService $salesOrderService){}

    /**
     * Returns a paginated collection of users.
     *
     * @param Request $request
     * @return SalesOrderCollection
     */
    public function index(Request $request){
        $data = $this->salesOrderService->paginate($request->total ?? 10);
        return SalesOrderCollection::collection($data);
    }

}
