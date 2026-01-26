<?php

namespace App\Features\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Users\Requests\UserUpdatePostRequest;
use App\Features\Users\Resources\UserCollection;
use App\Features\Users\Services\UserService;
use Illuminate\Support\Facades\DB;

class UserUpdateController extends Controller
{
    public function __construct(private UserService $userService){}

    /**
     * Update an user
     *
     * @param UserUpdatePostRequest $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(UserUpdatePostRequest $request, $id){
        $user = $this->userService->getById($id);
        try {
            //code...
            $updated_user = DB::transaction(function () use ($request, $user) {
                $updated_user = $this->userService->update(
                    [...$request->except(['role'])],
                    $user
                );
                $this->userService->syncRoles([$request->role], $updated_user);
                return $updated_user->fresh();
            });
            return response()->json(["message" => "User updated successfully.", "data" => UserCollection::make($updated_user)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }
}
