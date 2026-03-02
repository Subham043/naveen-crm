<?php

namespace App\Features\Order\Controllers;

use App\Features\Timeline\Collections\YardTimelineDTOCollection;
use App\Features\Order\DTO\OrderSaveDTO;
use App\Features\Order\DTO\OrderQuotationSaveDTO;
use App\Features\Order\Events\OrderUpdated;
use App\Http\Controllers\Controller;
use App\Features\Order\Requests\OrderSaveRequests;
use App\Features\Order\Resources\OrderCollection;
use App\Features\Order\Services\OrderService;
use App\Features\Quotation\Enums\QuotationStatus;
use App\Features\Timeline\DTO\YardTimelineDTO;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Enums\Guards;

class OrderUpdateController extends Controller
{
    public function __construct(private OrderService $orderService){}


    /**
     * Update an user
     *
     * @param OrderSaveRequests $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(OrderSaveRequests $request, $id){
        $order = $this->orderService->getById($id);
        if($order->quotation->quotation_status != QuotationStatus::Approved->value()){
            return response()->json(["message" => "Order is not approved."], 400);
        }
        try {
            //code...
            $quotationDto = OrderQuotationSaveDTO::fromRequest($request);
            $orderDto = OrderSaveDTO::fromRequest($request);
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
                $updated_order = $this->orderService->update(
                    $orderDto->toArray(),
                    $order
                );
                $updated_order->quotation->update($quotationDto->toArray());
                if ($request->yard_located && $request->has('yards')) {
                    $this->orderService->syncYards(
                        YardTimelineDTOCollection::fromRequest($request->yards), 
                        $updated_order
                    );
                }
                return $updated_order->fresh();
            });

            event(new OrderUpdated($updated_order, $oldOrderValues, $orderDto, $quotationDto, $oldYardValues, $yards, $user->id, $user->name, $user->email));

            return response()->json(["message" => "Order updated successfully.", "data" => OrderCollection::make($updated_order)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
