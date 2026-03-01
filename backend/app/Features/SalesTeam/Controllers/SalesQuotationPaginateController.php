<?php

namespace App\Features\SalesTeam\Controllers;

use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Resources\SalesQuotationCollection;
use App\Features\SalesTeam\Services\SalesQuotationService;
use Illuminate\Http\Request;

class SalesQuotationPaginateController extends Controller
{
    public function __construct(private SalesQuotationService $salesQuotationService){}

    /**
     * Returns a paginated collection of users.
     *
     * @param Request $request
     * @return SalesQuotationCollection
     */
    public function index(Request $request){
        $data = $this->salesQuotationService->paginate($request->total ?? 10);
        return SalesQuotationCollection::collection($data);
    }

}
