<?php

namespace App\Features\Order\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Order\Resources\OrderTimelineCollection;
use App\Features\Order\Services\TimelineService;
use Illuminate\Http\Request;

class OrderTimelinePaginateController extends Controller
{
    public function __construct(private TimelineService $timelineService){}

    /**
     * Returns a paginated collection of users.
     *
     * @param Request $request
     * @return OrderTimelineCollection
     */
    public function index(Request $request, $order_id){
        $data = $this->timelineService->paginate($order_id, $request->total ?? 10);
        return OrderTimelineCollection::collection($data);
    }

}
