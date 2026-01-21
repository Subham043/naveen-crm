<?php

namespace App\Features\Account\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileResendVerificationController extends Controller
{
    public function index(Request $request){
        try {
            //code...
            $request->user()->sendEmailVerificationNotification();
            return response()->json([
                'message' => 'Verification link sent!',
            ], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
