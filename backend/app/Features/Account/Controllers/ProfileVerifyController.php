<?php

namespace App\Features\Account\Controllers;

use App\Features\Account\Requests\EmailVerificationRequest;
use App\Http\Controllers\Controller;

class ProfileVerifyController extends Controller
{
    public function index(EmailVerificationRequest $request){
        $is_verified = $request->fulfill();
        $clientUrl = rtrim(config('app.client_url'), '/');

        // Default redirect
        $redirectUrl = $clientUrl;

        return redirect($redirectUrl . ($is_verified ? '?verified=true' : ''));
    }
}
