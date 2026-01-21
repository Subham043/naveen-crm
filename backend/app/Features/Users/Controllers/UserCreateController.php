<?php

namespace App\Features\Users\Controllers;

use App\Http\Controllers\Controller;
// use App\Features\Users\Events\UserCreated;
use App\Features\Users\Requests\UserCreatePostRequest;
use App\Features\Users\Resources\UserCollection;
use App\Features\Users\Services\UserService;
use Illuminate\Support\Facades\DB;

class UserCreateController extends Controller
{

    public function __construct(private UserService $userService){}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function index(UserCreatePostRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $user = $this->userService->create(
                [
                    ...$request->except('role')
                ]
            );
            $this->userService->syncRoles([$request->role], $user);
            // UserCreated::dispatch($user, $request->password);
            return response()->json([
                "message" => "User created successfully.",
                "data" => UserCollection::make($user),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
