<?php

namespace App\Features\ActivityLogs\Controllers;

use App\Http\Controllers\Controller;
use App\Features\ActivityLogs\Resources\ActivityLogCollection;
use App\Features\ActivityLogs\Services\ActivityLogService;
use Illuminate\Http\Request;

class ActivityLogPaginateController extends Controller
{
    public function __construct(private ActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $data = $this->logService->getList($request->total ?? 10);
        return ActivityLogCollection::collection($data);
    }

}
