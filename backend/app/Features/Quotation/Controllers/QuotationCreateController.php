<?php

namespace App\Features\Quotation\Controllers;

use App\Features\Quotation\DTO\QuotationAdminCreateDTO;
use App\Features\Quotation\Events\QuotationCreated;
use App\Features\Quotation\Requests\QuotationAdminCreateRequests;
use App\Http\Controllers\Controller;
use App\Features\Quotation\Resources\QuotationCollection;
use App\Features\Quotation\Services\QuotationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class QuotationCreateController extends Controller
{
    public function __construct(private QuotationService $quotationService){}

    /**
     * Update an user
     *
     * @param QuotationAdminCreateRequests $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(QuotationAdminCreateRequests $request){
        try {
            //code...
            $dto = QuotationAdminCreateDTO::fromRequest($request);

            $created_quotation = DB::transaction(function () use ($dto) {
                return $this->quotationService->create($dto->toArray());
            });
            
            $user = Auth::guard(Guards::API->value())->user();

            event(new QuotationCreated($created_quotation, $dto, $user->id, $user->name, $user->email));
            return response()->json(["message" => "Quotation created successfully.", "data" => QuotationCollection::make($created_quotation)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
