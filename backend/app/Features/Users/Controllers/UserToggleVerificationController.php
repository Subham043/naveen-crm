<?php

namespace App\Features\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Users\Resources\UserCollection;
use App\Features\Users\Services\UserService;
use Illuminate\Support\Facades\DB;

class UserToggleVerificationController extends Controller
{
    public function __construct(private UserService $userService){}

/**
 * Toggle the verification status of an user.
 *
 * @param int $id The ID of the user to verify.
 * @return \Illuminate\Http\JsonResponse A JSON response indicating success or failure.
 * 
 * If the user is already verified, the response will indicate so.
 * If the verification is successful, the response will include the updated user data.
 * In case of failure, the response will return an error message.
 */

    public function index($id){
        $user = $this->userService->getById($id);
        if($user->verified_at){
            return response()->json(["message" => "User already verified."], 400);
        }
        DB::beginTransaction();
        try {
            //code...
            $this->userService->update(['verified_at'=>now()], $user);
            return response()->json(["message" => "User verified successfully.", "data" => UserCollection::make($user)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
