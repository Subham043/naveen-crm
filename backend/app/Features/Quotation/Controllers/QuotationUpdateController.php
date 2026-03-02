<?php

namespace App\Features\Quotation\Controllers;

use App\Features\Quotation\DTO\QuotationSaveDTO;
use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Quotation\Events\QuotationUpdated;
use App\Http\Controllers\Controller;
use App\Features\Quotation\Requests\QuotationSaveRequests;
use App\Features\Quotation\Resources\QuotationCollection;
use App\Features\Quotation\Services\QuotationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class QuotationUpdateController extends Controller
{
    public function __construct(private QuotationService $quotationService){}

    /**
     * Update an user
     *
     * @param QuotationSaveRequests $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(QuotationSaveRequests $request, $id){
        $quotation = $this->quotationService->getById($id);
        if($quotation->quotation_status != QuotationStatus::Approved->value()){
            return response()->json(["message" => "Quotation is not approved."], 400);
        }
        try {
            //code...
            $dto = QuotationSaveDTO::fromRequest($request);
            /**
             * Capture old values BEFORE update
             */
            $oldValues = $quotation->only(array_keys($dto->toArray()));
            $user = Auth::guard(Guards::API->value())->user();

            $updated_quotation = DB::transaction(function () use ($dto, $quotation) {
                return $this->quotationService->update(
                    $dto->toArray(),
                    $quotation
                );
            });
            
            event(new QuotationUpdated($updated_quotation, $oldValues, $dto, $user->id, $user->name, $user->email));
            return response()->json(["message" => "Quotation updated successfully.", "data" => QuotationCollection::make($updated_quotation)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
