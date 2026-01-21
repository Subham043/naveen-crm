<?php

namespace App\Features\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Users\Resources\UserCollection;
use App\Features\Users\Services\UserService;

class UserViewController extends Controller
{
    public function __construct(private UserService $userService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $user = $this->userService->getById($id);
        return response()->json(["message" => "User fetched successfully.", "data" => UserCollection::make($user)], 200);
    }
}
