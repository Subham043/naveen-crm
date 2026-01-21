<?php

namespace App\Features\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Users\Resources\UserCollection;
use App\Features\Users\Services\UserService;
use Illuminate\Http\Request;

class UserPaginateController extends Controller
{
    public function __construct(private UserService $userService){}

    /**
     * Returns a paginated collection of users.
     *
     * @param Request $request
     * @return UserCollection
     */
    public function index(Request $request){
        $data = $this->userService->paginate($request->total ?? 10);
        return UserCollection::collection($data);
    }

}
