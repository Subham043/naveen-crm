<?php

namespace App\Features\ActivityLogs\Controllers;

use App\Http\Controllers\Controller;
use App\Features\ActivityLogs\Resources\ActivityLogCollection;
use App\Features\ActivityLogs\Services\ActivityLogService;

class ActivityLogViewController extends Controller
{
    public function __construct(private ActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(string $id){
        $data = $this->logService->getById($id);
        return response()->json(["message" => "Activity Log fetched successfully.", "data" => ActivityLogCollection::make($data)], 200);
    }

}