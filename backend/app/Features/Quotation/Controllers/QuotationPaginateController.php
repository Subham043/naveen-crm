<?php

namespace App\Features\Quotation\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Quotation\Resources\QuotationCollection;
use App\Features\Quotation\Services\QuotationService;
use Illuminate\Http\Request;

class QuotationPaginateController extends Controller
{
    public function __construct(private QuotationService $quotationService){}

    /**
     * Returns a paginated collection of users.
     *
     * @param Request $request
     * @return QuotationCollection
     */
    public function index(Request $request){
        $data = $this->quotationService->paginate($request->total ?? 10);
        return QuotationCollection::collection($data);
    }

}
