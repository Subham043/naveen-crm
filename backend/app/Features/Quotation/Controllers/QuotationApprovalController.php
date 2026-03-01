<?php

namespace App\Features\Quotation\Controllers;

use App\Features\Quotation\DTO\QuotationApprovalDTO;
use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Quotation\Events\QuotationApproval;
use App\Features\Quotation\Requests\QuotationApprovalRequests;
use App\Http\Controllers\Controller;
use App\Features\Quotation\Resources\QuotationCollection;
use App\Features\Quotation\Services\QuotationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class QuotationApprovalController extends Controller
{
    public function __construct(private QuotationService $quotationService){}

    /**
     * Update an user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(QuotationApprovalRequests $request, $id){
        $quotation = $this->quotationService->getByIdAndActiveStatus($id, true);
        try {
            //code...
            $dto = QuotationApprovalDTO::fromRequest($request);
            $user = Auth::guard(Guards::API->value())->user();
            $quotation->disableLogging();
            DB::transaction(function () use ($quotation, $dto, $user) {
                $this->quotationService->update([...$dto->toArray(), 'approval_by_id' => $user->id, 'approval_at' => now()], $quotation);
                $quotation->order()->create([
                    'quotation_id' => $quotation->id,
                ]);
            });
            event(new QuotationApproval($quotation, $dto, $user->id, $user->name, $user->email));
            $user2 = request()->user();
            $doneBy = "{$user2->name} <{$user2->email}> ({$user2->currentRole()})";
            $approval_status = $dto->quotation_status == QuotationStatus::Approved->value() ? "approved" : "rejected";
            activity("quotation_{$quotation->id}")
			->causedBy($user2)
			->performedOn($quotation)
			->event("quotation_{$approval_status}")
			->withProperties([
                'old' => ['quotation_status' => 0, 'approval_by_id' => null, 'approval_at' => null],
				'attributes' => [...$dto->toArray(), 'approval_by_id' => $user->id, 'approval_at' => now()]
            ])
			->log("Quotation {$approval_status} by {$doneBy}");
            return response()->json(["message" => "Quotation {$approval_status} successfully.", "data" => QuotationCollection::make($quotation)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
