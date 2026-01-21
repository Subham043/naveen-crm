<?php

namespace App\Features\Roles\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Roles\Resources\RoleCollection;
use App\Features\Roles\Services\RoleService;

class RoleAllController extends Controller
{
    public function __construct(private RoleService $roleService){}

    /**
     * Fetch all roles and return as a JSON response.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(){
        $data = $this->roleService->all();
        return response()->json(["message" => "Roles fetched successfully.", "data" => RoleCollection::collection($data)], 200);
    }

}
