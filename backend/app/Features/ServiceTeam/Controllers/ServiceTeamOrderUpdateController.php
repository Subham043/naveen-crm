<?php

namespace App\Features\ServiceTeam\Controllers;

use App\Features\Timeline\Collections\YardTimelineDTOCollection;
use App\Features\ServiceTeam\DTO\ServiceTeamOrderSaveDTO;
use App\Features\ServiceTeam\DTO\ServiceTeamQuotationSaveDTO;
use App\Features\ServiceTeam\Events\ServiceTeamOrderUpdated;
use App\Http\Controllers\Controller;
use App\Features\ServiceTeam\Requests\ServiceTeamOrderSaveRequests;
use App\Features\ServiceTeam\Resources\ServiceTeamOrderCollection;
use App\Features\ServiceTeam\Services\ServiceTeamOrderService;
use App\Features\Timeline\DTO\YardTimelineDTO;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class ServiceTeamOrderUpdateController extends Controller
{
    public function __construct(private ServiceTeamOrderService $serviceTeamOrderService){}


    /**
     * Update an user
     *
     * @param ServiceTeamOrderSaveRequests $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ServiceTeamOrderSaveRequests $request, $id){
        $order = $this->serviceTeamOrderService->getById($id);
        try {
            //code...
            $quotationDto = ServiceTeamQuotationSaveDTO::fromRequest($request);
            $orderDto = ServiceTeamOrderSaveDTO::fromRequest($request);
            /**
             * Capture old values BEFORE update
             */
            $oldOrderValues = array_merge($order->only(array_keys($orderDto->toArray())), $order->quotation->only(array_keys($quotationDto->toArray())));
            $oldYardArray = $order->yards->map(function ($yard) {
                return new YardTimelineDTO(
                    id: $yard->id,
                    yard: $yard->yard,
                );
            });
            $oldYardValues = new YardTimelineDTOCollection($oldYardArray);
            $user = Auth::guard(Guards::API->value())->user();

            if ($request->yard_located && $request->has('yards')) {
                $yards = YardTimelineDTOCollection::fromRequest($request->safe()->input('yards'));
            }else{
                $yards = null;
            }

            $updated_order = DB::transaction(function () use ($orderDto, $quotationDto, $order, $request) {
                $updated_order = $this->serviceTeamOrderService->update(
                    $orderDto->toArray(),
                    $order
                );
                $updated_order->quotation->update($quotationDto->toArray());
                if ($request->yard_located && $request->has('yards')) {
                    $this->serviceTeamOrderService->syncYards(
                        YardTimelineDTOCollection::fromRequest($request->yards), 
                        $updated_order
                    );
                }
                return $updated_order->fresh();
            });

            event(new ServiceTeamOrderUpdated($updated_order, $oldOrderValues, $orderDto, $quotationDto, $oldYardValues, $yards, $user->id, $user->name, $user->email, $request->safe()->input('comment'), $request->safe()->input('additional_comment')));

            return response()->json(["message" => "Order updated successfully.", "data" => ServiceTeamOrderCollection::make($updated_order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
