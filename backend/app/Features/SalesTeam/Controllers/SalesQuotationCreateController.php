<?php

namespace App\Features\SalesTeam\Controllers;

use App\Features\SalesTeam\DTO\SalesQuotationSaveDTO;
use App\Features\SalesTeam\Events\SalesQuotationCreated;
use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Requests\SalesQuotationSaveRequests;
use App\Features\SalesTeam\Resources\SalesQuotationCollection;
use App\Features\SalesTeam\Services\SalesQuotationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class SalesQuotationCreateController extends Controller
{

    public function __construct(private SalesQuotationService $salesQuotationService){}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function index(SalesQuotationSaveRequests $request){
        try {
            //code...
            $dto = SalesQuotationSaveDTO::fromRequest($request);
            $user = Auth::guard(Guards::API->value())->user();
            $quotation = DB::transaction(function () use ($dto, $user) {
                return $this->salesQuotationService->create([
                    ...$dto->toArray(),
                    'sales_user_id' => $user->id,
                    'is_created_by_agent' => true,
                ]);
            });
            event(new SalesQuotationCreated($quotation, $dto, $user->id, $user->name, $user->email));
            return response()->json([
                "message" => $request->is_active ? "Quotation saved successfully." : "Quotation saved as draft successfully.",
                "data" => SalesQuotationCollection::make($quotation),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
