<?php

namespace App\Features\Quotation\Controllers;

use App\Features\Quotation\DTO\QuotationPublicCreateDTO;
use App\Features\Quotation\Enums\LeadSource;
use App\Features\Quotation\Events\PublicQuotationCreated;
use App\Http\Controllers\Controller;
use App\Features\Quotation\Requests\QuotationPublicCreateRequests;
use App\Features\Quotation\Services\QuotationService;
use Illuminate\Support\Facades\DB;

class QuotationPublicCreateController extends Controller
{

    public function __construct(private QuotationService $quotationService){}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function index(QuotationPublicCreateRequests $request){
        try {
            $dto = QuotationPublicCreateDTO::fromRequest($request);
            $quotation = DB::transaction(function () use ($dto) {
                return $this->quotationService->create([
                    ...$dto->toArray(),
                    'is_active' => false,
                    'is_created_by_agent' => false,
                    'lead_source' => LeadSource::Website->value(),
                ]);
            });
            event(new PublicQuotationCreated($quotation, $dto));
            return response()->json([
                "message" => "Quotation created successfully.",
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
