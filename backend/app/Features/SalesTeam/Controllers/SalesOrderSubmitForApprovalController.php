<?php

namespace App\Features\SalesTeam\Controllers;

use App\Features\SalesTeam\Events\SalesOrderSubmittedForApproval;
use App\Http\Controllers\Controller;
use App\Features\SalesTeam\Resources\SalesOrderCollection;
use App\Features\SalesTeam\Services\SalesOrderService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class SalesOrderSubmitForApprovalController extends Controller
{
    public function __construct(private SalesOrderService $salesOrderService){}

    /**
     * Update an user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $order = $this->salesOrderService->getByIdAndIsInactive($id);
        if(empty($order->country_code) || empty($order->phone) || empty($order->billing_address) || empty($order->part_year) || empty($order->part_model) || empty($order->part_name) || empty($order->part_description)){
            return response()->json(["message" => "Please fill all the required fields to submit for approval."], 400);
        }
        try {
            //code...
            $user = Auth::guard(Guards::API->value())->user();
            $order->disableLogging();
            $updated_order = DB::transaction(function () use ($order) {
                return $this->salesOrderService->update(
                    ['is_active' => 1],
                    $order
                );
            });
            event(new SalesOrderSubmittedForApproval($updated_order, $user->id, $user->name, $user->email));
            $user2 = request()->user();
            $doneBy = "{$user2->name} <{$user2->email}> ({$user2->currentRole()})";
            activity("order_{$order->id}")
			->causedBy($user2)
			->performedOn($order)
			->event("order_submitted_for_approval")
			->withProperties([
                'old' => ['is_active' => 0],
				'attributes' => ['is_active' => 1]
            ])
			->log("Order submitted for approval by {$doneBy}");
            return response()->json(["message" => "Order submitted for approval successfully.", "data" => SalesOrderCollection::make($updated_order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
