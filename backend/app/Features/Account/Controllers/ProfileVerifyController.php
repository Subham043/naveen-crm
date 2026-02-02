<?php

namespace App\Features\Account\Controllers;

use App\Features\Account\Requests\EmailVerificationRequest;
use App\Http\Controllers\Controller;

class ProfileVerifyController extends Controller
{
    public function index(EmailVerificationRequest $request){
        $clientUrl = rtrim(config('app.client_url'), '/');
        $request->fulfill();
        if($request->userInfo()->hasVerifiedEmail()){
            $user = request()->user();
            $doneBy = "{$user->name} <{$user->email}> ({$user->currentRole()})";
            activity("email_verified_{$user->id}")
			->causedBy($user)
			->performedOn($user)
			->event('email_verified')
			->withProperties([
				'attributes' => [
					'ip' => request()->ip(),
					'user_agent' => request()->userAgent(),
                    'email_verified_at' => now(),
				]
            ])
			->log("Email verified by {$doneBy}");
            return redirect($clientUrl.'?verified=true');
        }
        return redirect($clientUrl);
    }
}
