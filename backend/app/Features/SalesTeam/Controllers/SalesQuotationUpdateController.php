<?php

namespace App\Features\SalesTeam\Controllers;

use App\Features\SalesTeam\DTO\SalesQuotationSaveDTO;
use App\Features\SalesTeam\Events\SalesQuotationUpdated;
use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Requests\SalesQuotationSaveRequests;
use App\Features\SalesTeam\Resources\SalesQuotationCollection;
use App\Features\SalesTeam\Services\SalesQuotationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class SalesQuotationUpdateController extends Controller
{
    public function __construct(private SalesQuotationService $salesQuotationService){}

    /**
     * Update an user
     *
     * @param SalesQuotationSaveRequests $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(SalesQuotationSaveRequests $request, $id){
        $quotation = $this->salesQuotationService->getByIdAndIsInactive($id);
        try {
            //code...
            $dto = SalesQuotationSaveDTO::fromRequest($request);
            /**
             * Capture old values BEFORE update
             */
            $oldValues = $quotation->only(array_keys($dto->toArray()));
            $user = Auth::guard(Guards::API->value())->user();

            $updated_quotation = DB::transaction(function () use ($dto, $quotation) {
                return $this->salesQuotationService->update(
                    $dto->toArray(),
                    $quotation
                );
            });
            
            event(new SalesQuotationUpdated($updated_quotation, $oldValues, $dto, $user->id, $user->name, $user->email));
            return response()->json(["message" => "Quotation updated successfully.", "data" => SalesQuotationCollection::make($updated_quotation)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
