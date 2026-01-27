<?php

namespace App\Features\Timeline\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Timeline\Resources\TimelineCollection;
use App\Features\Timeline\Services\TimelineService;
use Illuminate\Http\Request;

class TimelinePaginateController extends Controller
{
    public function __construct(private TimelineService $timelineService){}

    /**
     * Returns a paginated collection of users.
     *
     * @param Request $request
     * @return TimelineCollection
     */
    public function index(Request $request, $order_id){
        $data = $this->timelineService->paginate($order_id, $request->total ?? 10);
        return TimelineCollection::collection($data);
    }

}
