<?php

namespace App\Features\SalesTeam\Controllers;

use App\Features\SalesTeam\Events\SalesQuotationSubmittedForApproval;
use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Resources\SalesQuotationCollection;
use App\Features\SalesTeam\Services\SalesQuotationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class SalesQuotationSubmitForApprovalController extends Controller
{
    public function __construct(private SalesQuotationService $salesQuotationService){}

    /**
     * Update an user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $quotation = $this->salesQuotationService->getByIdAndIsInactive($id);
        if(empty($quotation->country_code) || empty($quotation->phone) || empty($quotation->billing_address) || empty($quotation->shipping_address) || empty($quotation->part_year) || empty($quotation->part_model) || empty($quotation->part_make) || empty($quotation->part_name) || empty($quotation->part_description) || empty($quotation->sale_price) || empty($quotation->cost_price) || empty($quotation->shipping_cost)){
            return response()->json(["message" => "Please fill all the required fields to submit for approval."], 400);
        }
        try {
            //code...
            $user = Auth::guard(Guards::API->value())->user();
            $quotation->disableLogging();
            $updated_quotation = DB::transaction(function () use ($quotation) {
                return $this->salesQuotationService->update(
                    ['is_active' => 1],
                    $quotation
                );
            });
            event(new SalesQuotationSubmittedForApproval($updated_quotation, $user->id, $user->name, $user->email));
            $user2 = request()->user();
            $doneBy = "{$user2->name} <{$user2->email}> ({$user2->currentRole()})";
            activity("quotation_{$quotation->id}")
			->causedBy($user2)
			->performedOn($quotation)
			->event("quotation_submitted_for_approval")
			->withProperties([
                'old' => ['is_active' => 0],
				'attributes' => ['is_active' => 1]
            ])
			->log("Quotation submitted for approval by {$doneBy}");
            return response()->json(["message" => "Quotation submitted for approval successfully.", "data" => SalesQuotationCollection::make($updated_quotation)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
