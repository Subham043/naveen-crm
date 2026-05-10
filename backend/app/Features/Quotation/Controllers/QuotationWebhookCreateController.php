<?php

namespace App\Features\Quotation\Controllers;

use App\Features\Quotation\DTO\QuotationWebhookCreateDTO;
use App\Features\Quotation\Enums\LeadSource;
use App\Features\Quotation\Events\WebhookQuotationCreated;
use App\Http\Controllers\Controller;
use App\Features\Quotation\Requests\QuotationWebhookCreateRequests;
use App\Features\Quotation\Services\QuotationService;
use Illuminate\Support\Facades\DB;

class QuotationWebhookCreateController extends Controller
{

    public function __construct(private QuotationService $quotationService){}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function index(QuotationWebhookCreateRequests $request){
        try {
            $dto = QuotationWebhookCreateDTO::fromRequest($request);
            DB::transaction(function () use ($dto) {
                return $this->quotationService->create([
                    ...$dto->toArray(),
                    'is_active' => false,
                    'is_created_by_agent' => false,
                    'lead_source' => LeadSource::Website->value(),
                ]);
            });
            // event(new WebhookQuotationCreated($quotation, $dto));
            return response()->json([
                "message" => "Quotation created successfully.",
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
