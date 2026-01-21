<?php

namespace App\Features\Authentication\Controllers;

use App\Features\Authentication\Requests\RegisterPostRequest;
use App\Features\Authentication\Resources\AuthCollection;
use App\Features\Authentication\Services\AuthService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function __construct(private AuthService $authService){}

    public function index(RegisterPostRequest $request){

        DB::beginTransaction();
        try {
            //code...
            $user = $this->authService->register([...$request->safe()->except(['captcha'])]);
            return response()->json([
                'message' => 'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.',
                'user' => AuthCollection::make($user),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
