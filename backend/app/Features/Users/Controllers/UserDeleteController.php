<?php

namespace App\Features\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Users\Resources\UserCollection;
use App\Features\Users\Services\UserService;
use Illuminate\Support\Facades\DB;

class UserDeleteController extends Controller
{
    public function __construct(private UserService $userService){}

    /**
     * Delete a user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $user = $this->userService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->userService->delete(
                $user
            );
            $this->userService->syncRoles([], $user);
            return response()->json(["message" => "User deleted successfully.", "data" => UserCollection::make($user)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }

}
